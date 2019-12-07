import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ToolbarComponent} from './toolbar.component';
import { MatToolbarModule } from '@angular/material/toolbar';

@NgModule({
    imports: [
        CommonModule, MatToolbarModule
    ],
    exports: [ToolbarComponent],
    declarations: [ToolbarComponent]
})
export class ToolbarModule {
}
