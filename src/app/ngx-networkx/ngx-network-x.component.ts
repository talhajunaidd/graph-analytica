import {Component, EventEmitter, Input, OnInit, Output, ViewEncapsulation} from '@angular/core';
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

    @Output() addNodes = new EventEmitter();
    @Output() removeNodes = new EventEmitter();
    @Output() addEdges = new EventEmitter();
    @Output() removeEdges = new EventEmitter();
    @Output() clear = new EventEmitter();

    constructor(private _graphService: GraphService) {

    }

    ngOnInit() {
        this._graphService.graph.subscribe(res => {
            this.graph = res;
            this.draw();
            jsnx.observe(this.graph);
            this.graph.on('addNodes', (event: Event) => {
                    this.draw();
                }
            );
        });
    }

    draw(): void {
        const options = Object.assign(this.drawOptions, NgxNetworkXComponent.defaultOptions);
        const dra = jsnx.draw(this.graph, options, this.optBind);
        const svg = d3Js.select('app-ngx-network-x');
        const node = svg.selectAll('.node');
        const drag = dra.drag().on('dragstart', (event) => {
            console.log(event.node, ' is selected');
        });
        node.call(drag);
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
