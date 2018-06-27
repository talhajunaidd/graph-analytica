import {ChangeDetectionStrategy, Component, ElementRef, Input, OnChanges, OnInit, ViewEncapsulation} from '@angular/core';
import * as cytoscape from 'cytoscape';
import {GraphService} from '../../_services/graph.service';

@Component({
    selector: 'app-ngx-cytoscape',
    templateUrl: './ngx-cytoscape.component.html',
    styleUrls: ['./ngx-cytoscape.component.css'],
    encapsulation: ViewEncapsulation.None,
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class NgxCytoscapeComponent implements OnInit {

    private _elements: any;
    private _style: any;
    private _layout: any;
    private _zoom: any;
    private _cy: any;

    public constructor(private _el: ElementRef, private _graphService: GraphService) {

        this._layout = this._layout || {
            name: 'breadthfirst',
            directed: false,
            avoidOverlap: true,
            padding: 0
        };

        this._zoom = this._zoom || {
            min: 0.0,
            max: 1.0
        };

        this._style = this._style || cytoscape.stylesheet()
            .selector('node')
            .css({
                'background-color': '#666',
                'label': 'data(id)'
            })
            .selector(':selected')
            .css({
                'border-width': 1,
                'border-color': '#14f43F'
            })
            .selector('edge')
            .css({
                'width': 3,
                'curve-style': 'bezier',
                'text-margin-y': -10,
                'label': 'data(weight)',
                'line-color': '#ccc',
                'target-arrow-color': '#ccc',
                'target-arrow-shape': 'triangle'
            });
    }

    /*public ngOnChanges(): any {
        this.render();
    }*/

    public ngOnInit(): void {
        this.render();
    }

    public render() {
        if (!this.cy) {

            this.cy = cytoscape({
                container: this.el.nativeElement,
                layout: this.layout,
                minZoom: this.zoom.min,
                maxZoom: this.zoom.max,
                style: this.style,
                elements: this.elements,
            });
            this._graphService.registerCy(this._cy);
            this.cy.delayAnimation(1000);

        } else {
            this.cy.layout = this.layout;
            this.cy.nodes().remove();
            this.cy.add(this.elements);
            this.cy.minZoom(this.zoom.min);
            this.cy.maxZoom(this.zoom.max);
            this.cy.delayAnimation(1000);
        }
    }


    get elements(): any {
        return this._elements;
    }

    @Input()
    set elements(value: any) {
        this._elements = value;
    }

    get style(): any {
        return this._style;
    }

    @Input()
    set style(value: any) {
        this._style = value;
    }

    get layout(): any {
        return this._layout;
    }

    @Input()
    set layout(value: any) {
        this._layout = value;
    }

    get zoom(): any {
        return this._zoom;
    }

    @Input()
    set zoom(value: any) {
        this._zoom = value;
    }

    get cy(): any {
        return this._cy;
    }

    @Input()
    set cy(value: any) {
        this._cy = value;
    }

    get el(): ElementRef {
        return this._el;
    }

    @Input()
    set el(value: ElementRef) {
        this._el = value;
    }

}
