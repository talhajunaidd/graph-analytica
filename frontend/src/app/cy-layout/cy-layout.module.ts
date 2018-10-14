import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {CyLayoutComponent} from './cy-layout.component';
import {MatIconModule, MatMenuModule, MatTooltipModule} from '@angular/material';

@NgModule({
    imports: [
        CommonModule, MatMenuModule, MatIconModule, MatTooltipModule
    ],
    declarations: [CyLayoutComponent],
    exports: [CyLayoutComponent]
})
export class CyLayoutModule {
}
