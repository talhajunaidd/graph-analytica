import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {NgxCytoscapeComponent} from './ngx-cytoscape.component';

@NgModule({
    imports: [
        CommonModule
    ],
    exports: [NgxCytoscapeComponent],
    declarations: [NgxCytoscapeComponent]
})
export class NgxCytoscapeModule {
}
