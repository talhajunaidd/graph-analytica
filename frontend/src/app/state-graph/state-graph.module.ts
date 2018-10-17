import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RouterModule} from '@angular/router';

import {FlexLayoutModule} from '@angular/flex-layout';
import {
    MatAutocompleteModule,
    MatButtonModule,
    MatCardModule,
    MatDialogModule,
    MatDividerModule,
    MatExpansionModule,
    MatFormFieldModule,
    MatGridListModule,
    MatIconModule,
    MatInputModule,
    MatListModule,
    MatMenuModule,
    MatProgressSpinnerModule,
    MatSelectModule, MatSliderModule,
    MatSnackBarModule,
    MatTabsModule,
    MatTooltipModule
} from '@angular/material';
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
        ReactiveFormsModule, MatAutocompleteModule, MatDividerModule, NgxCytoscapeModule,
        MatSnackBarModule, MatExpansionModule, MatIconModule, CyLayoutModule, SharedModule, MatProgressSpinnerModule,
        MatTooltipModule, MatGridListModule, MatSelectModule, MatListModule, MatSliderModule
    ],
    entryComponents: [StateGraphLoadingSnackComponent],
    providers: [GraphService],
    declarations: [StateGraphComponent, StateGraphLoadingSnackComponent]
})
export class StateGraphModule {
}
