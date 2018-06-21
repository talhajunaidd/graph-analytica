import {Component, ElementRef, Inject, OnInit} from '@angular/core';
import {ErrorStateMatcher, MAT_DIALOG_DATA, MatDialog, MatDialogRef} from '@angular/material';
import {FormControl, FormGroupDirective, NgForm, Validators} from '@angular/forms';
import {GraphService} from '../../_services/graph.service';

@Component({
    selector: 'dialog-overview-example-dialog',
    templateUrl: 'dialog-overview-example-dialog.html',
})
export class DialogOverviewExampleDialogComponent {
    name: string;

    nodeNameFormControl = new FormControl('', [
        Validators.required,
    ]);

    constructor(
        public dialogRef: MatDialogRef<DialogOverviewExampleDialogComponent>,
        @Inject(MAT_DIALOG_DATA) public data: any) {
    }

    onNoClick(): void {
        this.dialogRef.close();
    }
}


@Component({
    selector: 'app-graph-editor',
    templateUrl: './graph-editor.component.html',
    styleUrls: ['./graph-editor.component.css'],
})
export class GraphEditorComponent implements OnInit {
    private newNodeName: string;
    private graph: any;

    constructor(private element: ElementRef, private dialog: MatDialog, private _graphService: GraphService) {
        this.graph = this._graphService.getGraph();
    }

    ngOnInit() {


    }

    openAddNodeDialog(): void {
        const dialogRef = this.dialog.open(DialogOverviewExampleDialogComponent, {
            width: '250px',
        });

        dialogRef.afterClosed().subscribe(result => {
            this.graph.addNode(result);
        });
    }


    /*get width(): number {
        const parent = this.element.nativeElement.parentNode;
        const percents = parseInt(parent.style.width, 10);
        const parentWidth = parseInt(parent.style.width, 10);
        const pixels = parentWidth * (percents / 100);
        return pixels;
    }*/

}


