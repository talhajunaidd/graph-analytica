import {Component, OnInit, ViewChild} from '@angular/core';
import {GraphService} from '../../_services/graph.service';
import {HttpClient} from '@angular/common/http';
import {NgxCytoscapeComponent} from '../ngx-cytoscape/ngx-cytoscape.component';
import {GraphUtils} from '../../utils/graph.utils';
import {AvailableCyLayouts, CyLayout} from '../graph-editor/utils/available-cy-layouts';

@Component({
    selector: 'app-state-graph',
    templateUrl: './state-graph.component.html',
    styleUrls: ['./state-graph.component.scss'],
})
export class StateGraphComponent implements OnInit {
    availableLayouts: CyLayout[] = AvailableCyLayouts;
    parameters: any;
    elements: any;
    @ViewChild(NgxCytoscapeComponent)
    cy: NgxCytoscapeComponent;
    layout = {
        name: 'grid',
        directed: true,
        animate: true,
        animationDuration: 500,
        avoidOverlap: true,
        padding: 30
    };

    constructor(private graphService: GraphService, private httpClient: HttpClient) {

    }

    ngOnInit() {
        this.httpClient.get('api/graph/parameters/').subscribe((res) => {
            this.parameters = res;
        });
    }

    generate_state_graph() {
        this.httpClient.post('api/graph/stategraph/', this.parameters).subscribe((res) => {
            this.elements = GraphUtils.importNodeLinkData(res);
        });
    }

    setLayout(layout) {
        this.cy.runLayout({name: layout.id});
    }
}
