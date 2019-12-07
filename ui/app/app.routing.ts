import {Routes} from '@angular/router';
import {FullComponent} from './layouts/full/full.component';

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
            loadChildren: () => import('./graph-editor/graph-editor.module').then(m => m.GraphEditorModule)
        },
        {
            path: 'stategraph',
            loadChildren: () => import('./state-graph/state-graph.module').then(m => m.StateGraphModule)
        }
    ]
}];

