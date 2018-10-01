import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {CyLayoutComponent} from './cy-layout.component';
import {MatMenuModule} from '@angular/material';

@NgModule({
    imports: [
        CommonModule, MatMenuModule
    ],
    declarations: [CyLayoutComponent],
    exports: [CyLayoutComponent]
})
export class CyLayoutModule {
}
