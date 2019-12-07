import {FormControl, FormGroup, Validators} from '@angular/forms';
import {Component, Inject} from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
    selector: 'app-node-label-dialog',
    templateUrl: './node-input-dialog.component.html',
})
export class NodeInputDialogComponent {

    nodeInputFrom = new FormGroup({
        id: new FormControl('', [Validators.required]),
        min: new FormControl(0, Validators.required),
        max: new FormControl(null, Validators.required)
    });

    constructor(
        public dialogRef: MatDialogRef<NodeInputDialogComponent>,
        @Inject(MAT_DIALOG_DATA) public data: any) {
    }

    onNoClick(): void {
        this.dialogRef.close();
    }
}
