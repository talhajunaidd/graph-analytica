import {Component, Inject} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';

@Component({
    selector: 'app-reset-dialog',
    templateUrl: './reset-dialog.component.html',
})
export class ResetDialogComponent {

    constructor(
        public dialogRef: MatDialogRef<ResetDialogComponent>,
        @Inject(MAT_DIALOG_DATA) public data: any) {
    }

    onNoClick(): void {
        this.dialogRef.close();
    }
}
