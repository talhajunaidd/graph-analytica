import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RouterModule} from '@angular/router';

import {FlexLayoutModule} from '@angular/flex-layout';
import {
    MatAccordionDisplayMode,
    MatAutocompleteModule,
    MatButtonModule,
    MatButtonToggleModule,
    MatCardModule,
    MatDialogModule,
    MatDividerModule, MatExpansionModule,
    MatFormFieldModule, MatIconModule,
    MatInputModule,
    MatMenuModule,
    MatSnackBarModule,
    MatTabsModule,
    MatTreeModule
} from '@angular/material';

import {RightClickTriggerDirective} from '../../_directives/right-click-trigger';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {GraphService} from '../../_services/graph.service';
import {NgxCytoscapeModule} from '../ngx-cytoscape/ngx-cytoscape.module';
import {FileDatabase, StateGraphComponent} from './state-graph.component';
import {StateGraphRoutes} from './state-graph.routing';

@NgModule({
    imports: [
        CommonModule, RouterModule.forChild(StateGraphRoutes), FlexLayoutModule, MatCardModule, MatTabsModule, NgxNetworkXModule,
        MatMenuModule, FormsModule, MatFormFieldModule, MatInputModule, MatDialogModule, MatSnackBarModule, MatButtonModule,
        ReactiveFormsModule, MatAutocompleteModule, MatButtonToggleModule, MatDividerModule, NgxCytoscapeModule,
        MatSnackBarModule, MatExpansionModule, MatTreeModule, MatIconModule
    ],
    providers: [GraphService, FileDatabase],
    declarations: [StateGraphComponent]
})
export class StateGraphModule {
}
