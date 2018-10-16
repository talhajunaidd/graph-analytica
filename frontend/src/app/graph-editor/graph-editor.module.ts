import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RouterModule} from '@angular/router';
import {GraphEditorRoutes} from './graph-editor.routing';
import {FlexLayoutModule} from '@angular/flex-layout';
import {
    MatAutocompleteModule,
    MatButtonModule,
    MatButtonToggleModule,
    MatCardModule,
    MatDialogModule,
    MatDividerModule,
    MatFormFieldModule,
    MatIconModule,
    MatInputModule,
    MatMenuModule,
    MatSnackBarModule,
    MatTabsModule,
    MatTooltipModule
} from '@angular/material';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {GraphService} from '../../_services/graph.service';
import {NodeInputDialogComponent} from './node-input-dialog/node-input-dialog.component';
import {GraphEditorComponent} from './graph-editor.component';
import {EdgeInputDialogComponent} from './edge-input-dialog/edge-input-dialog.component';
import {NgxCytoscapeModule} from '../ngx-cytoscape/ngx-cytoscape.module';
import {CyLayoutModule} from '../cy-layout/cy-layout.module';
import {SharedModule} from '../shared/shared.module';
import {ResetDialogComponent} from './reset-dialog/reset-dialog.component';

@NgModule({
    imports: [
        CommonModule, RouterModule.forChild(GraphEditorRoutes), FlexLayoutModule, MatCardModule, MatTabsModule,
        MatMenuModule, FormsModule, MatFormFieldModule, MatInputModule, MatDialogModule, MatSnackBarModule, MatButtonModule,
        ReactiveFormsModule, MatAutocompleteModule, MatButtonToggleModule, MatDividerModule, NgxCytoscapeModule,
        MatSnackBarModule, CyLayoutModule, SharedModule, MatIconModule, MatTooltipModule
    ],
    providers: [GraphService],
    entryComponents: [NodeInputDialogComponent, EdgeInputDialogComponent, ResetDialogComponent],
    declarations: [GraphEditorComponent, NodeInputDialogComponent, EdgeInputDialogComponent, ResetDialogComponent]
})
export class GraphEditorModule {
}
