import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {SidebarComponent} from './sidebar.component';
import { MatSidenavContainer, MatSidenavModule } from '@angular/material/sidenav';

@NgModule({
    imports: [
        CommonModule, MatSidenavModule
    ],
    exports: [SidebarComponent],
    declarations: [SidebarComponent]
})
export class SidebarModule {
}
