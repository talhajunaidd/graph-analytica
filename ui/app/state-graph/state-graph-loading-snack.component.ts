import {Component} from '@angular/core';

@Component({
    selector: 'state-graph-loading-snack',
    template: `
        <div fxFlex="row" fxLayoutAlign="space-between center">
            <span class="please-wait" fxFlexOrder="1">Please Wait</span>
            <mat-spinner fxFlexOrder="2" [strokeWidth]="3" [diameter]="30"></mat-spinner>
        </div>

    `,
    styles: [`
        
    `],
})
export class StateGraphLoadingSnackComponent {
}
