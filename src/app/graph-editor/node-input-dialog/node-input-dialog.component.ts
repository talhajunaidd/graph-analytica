import {FormControl, Validators} from '@angular/forms';
import {Component, Inject} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';

@Component({
    selector: 'app-node-label-dialog',
    templateUrl: './node-input-dialog.component.html',
})
export class NodeInputDialogComponent {
    name: string;

    nodeNameFormControl = new FormControl('', [
        Validators.required,
    ]);

    constructor(
        public dialogRef: MatDialogRef<NodeInputDialogComponent>,
        @Inject(MAT_DIALOG_DATA) public data: any) {
    }

    onNoClick(): void {
        this.dialogRef.close();
    }
}
