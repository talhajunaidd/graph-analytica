import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RouterModule} from '@angular/router';

import {FlexLayoutModule} from '@angular/flex-layout';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatDialogModule } from '@angular/material/dialog';
import { MatDividerModule } from '@angular/material/divider';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatListModule } from '@angular/material/list';
import { MatMenuModule } from '@angular/material/menu';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSelectModule } from '@angular/material/select';
import { MatSliderModule } from '@angular/material/slider';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatTabsModule } from '@angular/material/tabs';
import { MatTooltipModule } from '@angular/material/tooltip';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {GraphService} from '../../_services/graph.service';
import {NgxCytoscapeModule} from '../ngx-cytoscape/ngx-cytoscape.module';
import {StateGraphRoutes} from './state-graph.routing';
import {StateGraphComponent} from './state-graph.component';
import {CyLayoutModule} from '../cy-layout/cy-layout.module';
import {SharedModule} from '../shared/shared.module';
import {StateGraphLoadingSnackComponent} from './state-graph-loading-snack.component';

@NgModule({
    imports: [
        CommonModule, RouterModule.forChild(StateGraphRoutes), FlexLayoutModule, MatCardModule, MatTabsModule,
        MatMenuModule, FormsModule, MatFormFieldModule, MatInputModule, MatDialogModule, MatSnackBarModule, MatButtonModule,
        ReactiveFormsModule, MatAutocompleteModule, MatDividerModule, NgxCytoscapeModule,
        MatSnackBarModule, MatExpansionModule, MatIconModule, CyLayoutModule, SharedModule, MatProgressSpinnerModule,
        MatTooltipModule, MatGridListModule, MatSelectModule, MatListModule, MatSliderModule
    ],
    entryComponents: [StateGraphLoadingSnackComponent],
    providers: [GraphService],
    declarations: [StateGraphComponent, StateGraphLoadingSnackComponent]
})
export class StateGraphModule {
}
