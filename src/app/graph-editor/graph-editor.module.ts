import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {DialogOverviewExampleDialogComponent, GraphEditorComponent} from './graph-editor.component';
import {RouterModule} from '@angular/router';
import {GraphEditorRoutes} from './graph-editor.routing';
import {FlexLayoutModule} from '@angular/flex-layout';
import {
    MatButtonModule,
    MatCardModule,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    MatMenuModule,
    MatSnackBarModule,
    MatTabsModule
} from '@angular/material';
import {NgxNetworkXModule} from '../ngx-networkx/ngx-network-x.module';
import {RightClickTriggerDirective} from '../../_directives/right-click-trigger';
import {FormsModule} from '@angular/forms';
import {GraphService} from '../../_services/graph.service';

@NgModule({
    imports: [
        CommonModule, FlexLayoutModule, MatCardModule, MatTabsModule, NgxNetworkXModule,
        MatMenuModule, FormsModule,
        RouterModule.forChild(GraphEditorRoutes),
        MatFormFieldModule,
        MatInputModule,
        MatDialogModule, MatSnackBarModule, MatButtonModule
    ],
    providers: [GraphService],
    entryComponents: [DialogOverviewExampleDialogComponent],
    declarations: [GraphEditorComponent, RightClickTriggerDirective, DialogOverviewExampleDialogComponent]
})
export class GraphEditorModule {
}
