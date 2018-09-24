import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';
import {GraphValidators} from '../utils/validators';

@Component({
    selector: 'app-node-label-dialog',
    templateUrl: './edge-input-dialog.component.html',
    styleUrls: ['./edge-input-dialog.component.css']
})
export class EdgeInputDialogComponent implements OnInit {
    edgeInputForm: FormGroup;

    /*filteredOptions: Observable<string[]>;*/

    constructor(
        public dialogRef: MatDialogRef<EdgeInputDialogComponent>,
        @Inject(MAT_DIALOG_DATA) public data: any, private formBuilder: FormBuilder) {
    }

    ngOnInit(): void {
        const nodeValidators = [Validators.required, GraphValidators.nodeNameValidator(this.data.nodes)];
        this.edgeInputForm = new FormGroup({
            source: new FormControl('', nodeValidators),
            target: new FormControl('', nodeValidators),
            threshold: new FormControl(1, [Validators.required]),
            isActivator: new FormControl(true, [])
        });

        /*this.filteredOptions = this.edgeInputForm.controls['source'].valueChanges
            .pipe(
                startWith(''),
                map(search => this.filter(search))
            );
        this.filteredOptions.subscribe(x => {
            this.isDisplayed = false;
            this.options = x;
            this.isDisplayed = true;
        });*/
    }

    /*filter(search: string): string[] {
        return this.data.nodes.filter(option =>
            option.toLowerCase().includes(search.toLowerCase()));
    }*/

    onNoClick(): void {
        this.dialogRef.close();
    }

    submit(): void {
        if (this.edgeInputForm.valid) {
            this.dialogRef.close(this.edgeInputForm.value);
        }
    }
}


