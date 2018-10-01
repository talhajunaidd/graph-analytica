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
    MatMenuModule, MatProgressSpinnerModule,
    MatSnackBarModule,
    MatTabsModule,
    MatTreeModule
} from '@angular/material';

import {RightClickTriggerDirective} from '../../_directives/right-click-trigger';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {GraphService} from '../../_services/graph.service';
import {NgxCytoscapeModule} from '../ngx-cytoscape/ngx-cytoscape.module';
import {StateGraphRoutes} from './state-graph.routing';
import {StateGraphComponent} from './state-graph.component';
import {CyLayoutModule} from '../cy-layout/cy-layout.module';
import {SharedModule} from '../shared/shared.module';
import {StateGraphLoadingSnackComponent} from './state-graph-loading-snack.component';

@NgModule({
    imports: [
        CommonModule, RouterModule.forChild(StateGraphRoutes), FlexLayoutModule, MatCardModule, MatTabsModule,
        MatMenuModule, FormsModule, MatFormFieldModule, MatInputModule, MatDialogModule, MatSnackBarModule, MatButtonModule,
        ReactiveFormsModule, MatAutocompleteModule, MatButtonToggleModule, MatDividerModule, NgxCytoscapeModule,
        MatSnackBarModule, MatExpansionModule, MatTreeModule, MatIconModule, CyLayoutModule, SharedModule, MatProgressSpinnerModule
    ],
    entryComponents: [StateGraphLoadingSnackComponent],
    providers: [GraphService],
    declarations: [StateGraphComponent, StateGraphLoadingSnackComponent]
})
export class StateGraphModule {
}
