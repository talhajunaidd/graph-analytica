import {Component, ElementRef, OnInit} from '@angular/core';
import {MatDialog} from '@angular/material';
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
                private _httpClient: HttpClient
    ) {

    }


    ngOnInit() {
        // this._graphService.graph.subscribe(res => this.graph = res);
    }

    openAddNodeDialog(): void {
        const dialogRef = this.dialog.open(NodeInputDialogComponent, {
            width: '250px',
        });

        dialogRef.afterClosed().subscribe(result => {
            if (result) {
                this._graphService.addNode(result.name);
            }
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
                // this._graphService.fromDictOfLists(httpEvent.body);
            }
        });
    }
}


