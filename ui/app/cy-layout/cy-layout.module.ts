import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {CyLayoutComponent} from './cy-layout.component';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatTooltipModule } from '@angular/material/tooltip';

@NgModule({
    imports: [
        CommonModule, MatMenuModule, MatIconModule, MatTooltipModule
    ],
    declarations: [CyLayoutComponent],
    exports: [CyLayoutComponent]
})
export class CyLayoutModule {
}
