import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {NgxCytoscapeComponent} from './ngx-cytoscape.component';
import {GraphService} from '../../_services/graph.service';

@NgModule({
    imports: [
        CommonModule
    ],
    exports: [NgxCytoscapeComponent],
    declarations: [NgxCytoscapeComponent]
})
export class NgxCytoscapeModule {
}
