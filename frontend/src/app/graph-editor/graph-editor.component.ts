import {Component, ElementRef, OnInit} from '@angular/core';
import {MatDialog, MatSnackBar} from '@angular/material';
import {GraphService} from '../../_services/graph.service';
import {NodeInputDialogComponent} from './node-input-dialog/node-input-dialog.component';
import {HttpClient, HttpEventType, HttpRequest} from '@angular/common/http';
import {EdgeInputDialogComponent} from './edge-input-dialog/edge-input-dialog.component';


@Component({
    selector: 'app-graph-editor',
    templateUrl: './graph-editor.component.html',
    styleUrls: ['./graph-editor.component.css'],
})
export class GraphEditorComponent implements OnInit {
    private newNodeName: string;
    private progress: number;
    private message: string;


    constructor(private element: ElementRef,
                private dialog: MatDialog,
                private _graphService: GraphService,
                private _httpClient: HttpClient, private _snackBar: MatSnackBar
    ) {

    }


    ngOnInit() {
    }

    openAddNodeDialog(): void {
        const dialogRef = this.dialog.open(NodeInputDialogComponent, {});

        dialogRef.afterClosed().subscribe(result => {
            if (result) {
                this._graphService.addNode(result);
            }
        });
    }

    export(): void {
        this._httpClient.get('api/file/', {responseType: 'blob'}).subscribe((res) => {
            console.log('start download:', res);
            const url = window.URL.createObjectURL(res);
            const a = document.createElement('a');
            document.body.appendChild(a);
            a.setAttribute('style', 'display: none');
            a.href = url;
            a.download = 'network.graphml';
            a.click();
            window.URL.revokeObjectURL(url);
            a.remove();
        });
    }

    openAddEdgeDialog(): void {
        const dialogRef = this.dialog.open(EdgeInputDialogComponent, {
            data: {nodes: this._graphService.getNodes()}
        });

        dialogRef.afterClosed().subscribe(result => {
            if (result) {
                this._graphService.addEdge(result);
            }
        });
    }

    upload(event): void {
        const files = event.target.files;
        if (files.length === 0) {
            return;
        }

        const formData = new FormData();
        formData.append('file', files[0], files[0].name);
        const uploadReq = new HttpRequest('POST', `api/file/`, formData, {
            reportProgress: true,
        });

        this._httpClient.request(uploadReq).subscribe(httpEvent => {
            if (httpEvent.type === HttpEventType.UploadProgress) {
                this.progress = Math.round(100 * httpEvent.loaded / httpEvent.total);
            } else if (httpEvent.type === HttpEventType.Response) {
                this._graphService.importAdjacency(httpEvent.body);
            }
        });
    }
}
