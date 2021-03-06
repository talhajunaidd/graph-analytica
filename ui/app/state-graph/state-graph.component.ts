import {AfterViewChecked, Component, OnInit, ViewChild} from '@angular/core';
import {GraphService} from '../../_services/graph.service';
import {HttpClient} from '@angular/common/http';
import {NgxCytoscapeComponent} from '../ngx-cytoscape/ngx-cytoscape.component';
import {GraphUtils} from '../../utils/graph.utils';
import {AvailableCyLayouts, CyLayout} from '../graph-editor/utils/available-cy-layouts';
import { MatListOption, MatSelectionList, MatSelectionListChange } from '@angular/material/list';
import { MatSliderChange } from '@angular/material/slider';
import { MatSnackBar } from '@angular/material/snack-bar';
import {StateGraphLoadingSnackComponent} from './state-graph-loading-snack.component';
import {finalize} from 'rxjs/operators';
import {SelectionModel} from '@angular/cdk/collections';
import {MagnifierModel} from './magnifier.model';


@Component({
    selector: 'app-state-graph',
    templateUrl: './state-graph.component.html',
    styleUrls: ['./state-graph.component.scss'],
})
export class StateGraphComponent implements OnInit, AfterViewChecked {
    @ViewChild(MatSelectionList, { static: true }) selectionList: MatSelectionList;
    panelOpenState = true;
    availableLayouts: CyLayout[] = AvailableCyLayouts;
    parameters: any;
    elements: any;
    cycles: string[][];
    magnifierConfig: MagnifierModel = {
        min: 0,
        max: 0,
        step: 0.05,
        value: 1
    };
    @ViewChild(NgxCytoscapeComponent, { static: true })
    cy: NgxCytoscapeComponent;
    layout = {
        name: 'grid',
        directed: true,
        animate: true,
        animationDuration: 500,
        avoidOverlap: true,
        padding: 30
    };
    selectedParameter = {
        'key': undefined,
        'value': undefined
    };


    constructor(private graphService: GraphService,
                private httpClient: HttpClient,
                public snackBar: MatSnackBar) {
    }

    ngOnInit() {
        this.httpClient.get('api/graph/parameters/').subscribe((res) => {
            this.parameters = res;
        });

        this.selectionList.selectedOptions = new SelectionModel<MatListOption>(false);
    }

    generate_state_graph() {
        const snackBarRef = this.snackBar.openFromComponent(StateGraphLoadingSnackComponent);
        this.httpClient.post('api/graph/stategraph/', this.parameters).pipe(
            finalize(() => {
                    snackBarRef.dismiss();
                }
            )).subscribe((res) => {
            this.panelOpenState = false;
            this.elements = GraphUtils.importNodeLinkData(res);
        });
    }

    setLayout(layout) {
        this.cy.runLayout({name: layout.id});
    }


    onSelection(e: MatSelectionListChange) {
        const selectedParameterKey = e.option.value;
        this.selectedParameter = {'key': selectedParameterKey, 'value': this.parameters[selectedParameterKey]};
    }

    load_cycles() {
        this.httpClient.get<string[][]>('api/graph/stategraph/cycles/').subscribe((res) => {
            this.cycles = res;
        });
    }

    selectCycle(cycle: string[]): void {
        const color = '#1976D2';
        const cyclicNodes = this.cy.cy.nodes().filter(ele => {
            return cycle.indexOf(ele.data('id')) !== -1;
        });
        cyclicNodes.style('background-color', color);
        const cyclicEdges = this.cy.cy.edges().filter(ele =>{
            const source = ele.data('source');
            const target = ele.data('target');
            return cycle.indexOf(source) !== -1 && cycle.indexOf(target) !== -1;
        });
        cyclicEdges.style({'line-color': color, 'target-arrow-color': color});
    }

    resetCycles(): void {
        this.cy.cy.nodes().removeStyle();
    }

    setDeadlocks(): void {
        this.httpClient.get<string[]>('api/graph/stategraph/deadlocks/').subscribe((res) => {
            const deadlockStates = this.cy.cy.nodes().filter(ele => {
                return res.indexOf(ele.data('id')) !== -1;
            });
            deadlockStates.style('background-color', '#FF5252');
        });

    }

    onZoomLevelChange(event: MatSliderChange): void {
        this.cy.cy.zoom(event.value);
    }

    ngAfterViewChecked(): void {
        this.magnifierConfig = {
            min: this.cy.cy.minZoom(),
            max: this.cy.cy.maxZoom(),
            step: 0.05,
            value: this.cy.cy.zoom()
        };
    }
}

