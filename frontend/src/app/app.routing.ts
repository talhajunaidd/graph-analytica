import {Routes} from '@angular/router';

import {FullComponent} from './layouts/full/full.component';
import {GraphEditorModule} from './graph-editor/graph-editor.module';

export const AppRoutes: Routes = [{
    path: '',
    component: FullComponent,
    children: [{
        path: '',
        redirectTo: '/editor',
        pathMatch: 'full'
    }, {
        path: '',
        loadChildren: './material-component/material.module#MaterialComponentsModule'
    }, {
        path: 'editor',
        loadChildren: './graph-editor/graph-editor.module#GraphEditorModule'
    }]
}];

