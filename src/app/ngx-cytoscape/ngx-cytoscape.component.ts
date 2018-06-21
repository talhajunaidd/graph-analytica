import {Component, ElementRef, Input, OnChanges} from '@angular/core';
import * as cytoscape from 'cytoscape';

@Component({
    selector: 'app-ngx-cytoscape',
    templateUrl: './ngx-cytoscape.component.html',
    styleUrls: ['./ngx-cytoscape.component.css']
})
export class NgxCytoscapeComponent implements OnChanges {

    private _elements: any;
    private _style: any;
    private _layout: any;
    private _zoom: any;
    private _cy: any;

    public constructor(private _el: ElementRef) {

        this._layout = this._layout || {
            name: 'grid',
            directed: true,
            padding: 0
        };

        this._zoom = this._zoom || {
            min: 0.0,
            max: 1.0
        };

        this._style = this._style || cytoscape.stylesheet()
            .selector('node')
            .css({
                'content': 'data(name)',
                'shape': 'circle',
                'text-valign': 'center',
                'background-color': 'data(faveColor)',
                'width': '100px',
                'height': '100px'
            })
            .selector(':selected')
            .css({
                'border-width': 1,
                'border-color': '#14f43F'
            })
            .selector('edge')
            .css({
                'label': 'data(label)',
                'color': 'black',
                'curve-style': 'bezier',
                'opacity': 0.666,
                'width': 'mapData(strength, 70, 100, 2, 6)',
                'target-arrow-shape': 'triangle',
                'line-color': 'data(faveColor)',
                'source-arrow-color': 'data(faveColor)',
                'target-arrow-color': 'data(faveColor)'
            });
    }

    public ngOnChanges(): any {
        this.render();
    }

    addNode() {
        this.cy.remove('node[name="Jerry"]');
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
