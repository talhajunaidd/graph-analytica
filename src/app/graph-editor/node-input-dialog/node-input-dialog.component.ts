import {FormControl, FormGroup, Validators} from '@angular/forms';
import {Component, Inject} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';

@Component({
    selector: 'app-node-label-dialog',
    templateUrl: './node-input-dialog.component.html',
})
export class NodeInputDialogComponent {
    nodeInputFrom = new FormGroup({
        name: new FormControl('', [Validators.required,])
    });

    constructor(
        public dialogRef: MatDialogRef<NodeInputDialogComponent>,
        @Inject(MAT_DIALOG_DATA) public data: any) {
    }

    onNoClick(): void {
        this.dialogRef.close();
    }
}
