import {NgModule} from '@angular/core';
import {
    MatButtonModule,
    MatIconModule,
    MatListModule,
    MatSidenavModule,
    MatToolbarModule,
} from '@angular/material';

@NgModule({
    exports: [
        MatIconModule, MatSidenavModule, MatListModule, MatToolbarModule, MatButtonModule
    ]
})
export class AppMaterialModule {
}
