import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RouterModule} from '@angular/router';
import {GraphEditorRoutes} from './graph-editor.routing';
import {FlexLayoutModule} from '@angular/flex-layout';
import {
    MatAutocompleteModule,
    MatButtonModule, MatButtonToggleModule,
    MatCardModule,
    MatDialogModule, MatDividerModule,
    MatFormFieldModule,
    MatInputModule,
    MatMenuModule,
    MatSnackBarModule,
    MatTabsModule
} from '@angular/material';
import {RightClickTriggerDirective} from '../../_directives/right-click-trigger';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {GraphService} from '../../_services/graph.service';
import {NodeInputDialogComponent} from './node-input-dialog/node-input-dialog.component';
import {GraphEditorComponent} from './graph-editor.component';
import {EdgeInputDialogComponent} from './edge-input-dialog/edge-input-dialog.component';
import {NgxCytoscapeModule} from '../ngx-cytoscape/ngx-cytoscape.module';

@NgModule({
    imports: [
        CommonModule, RouterModule.forChild(GraphEditorRoutes), FlexLayoutModule, MatCardModule, MatTabsModule,
        MatMenuModule, FormsModule, MatFormFieldModule, MatInputModule, MatDialogModule, MatSnackBarModule, MatButtonModule,
        ReactiveFormsModule, MatAutocompleteModule, MatButtonToggleModule, MatDividerModule, NgxCytoscapeModule,
        MatSnackBarModule
    ],
    providers: [GraphService],
    entryComponents: [NodeInputDialogComponent, EdgeInputDialogComponent],
    declarations: [GraphEditorComponent, RightClickTriggerDirective, NodeInputDialogComponent, EdgeInputDialogComponent]
})
export class GraphEditorModule {
}
