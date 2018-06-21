import {Component, Input, OnInit, ViewEncapsulation} from '@angular/core';
import * as jsnx from 'jsnetworkx';
import * as d3Js from 'd3';
import IDrawOptions from './models/IDrawOptions';
import {GraphService} from '../../_services/graph.service';

@Component({
    selector: 'app-ngx-network-x',
    templateUrl: './ngx-network-x.component.html',
    encapsulation: ViewEncapsulation.None
})
export class NgxNetworkXComponent implements OnInit {
    graph: jsnx.classes.Graph;
    @Input() drawOptions: IDrawOptions = {};
    @Input() optBind = true;

    constructor(private _graphService: GraphService) {
        this.graph = this._graphService.getGraph();
    }

    addNode() {
        this.graph.addNode(this.getRandomInt(100));
    }

    private getRandomInt(max) {
        return Math.floor(Math.random() * Math.floor(max));
    }

    ngOnInit() {
        this.graph.addWeightedEdgesFrom([[2, 3, 10]]);
        this.graph.addStar([3, 4, 5, 6], {weight: 5});
        this.graph.addStar([2, 1, 0, -1], {weight: 3});
        this.draw();

    }

    draw(): void {
        const options = Object.assign(this.drawOptions, NgxNetworkXComponent.defaultOptions);
        jsnx.draw(this.graph, options, this.optBind);
    }

    static get defaultOptions() {
        return {
            element: 'app-ngx-network-x',
            weighted: true,
            edgeStyle: {
                'stroke-width': 10
            },
            nodeStyle: {
                fill: d => '#0064c7'
            },
            nodeAttr: {
                r: 15
            },
            withLabels: true,
            stickyDrag: true,
            labelStyle: {fill: 'white'},
            d3: d3Js,

        };
    }

}
