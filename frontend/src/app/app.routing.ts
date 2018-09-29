import {Routes} from '@angular/router';

import {FullComponent} from './layouts/full/full.component';
import {GraphEditorModule} from './graph-editor/graph-editor.module';

export const AppRoutes: Routes = [{
    path: '',
    component: FullComponent,
    children: [
        {
            path: '',
            redirectTo: '/editor',
            pathMatch: 'full'
        }, {
            path: 'editor',
            loadChildren: './graph-editor/graph-editor.module#GraphEditorModule'
        },
        {
            path: 'stategraph',
            loadChildren: './state-graph/state-graph.module#StateGraphModule'
        }
    ]
}];

