import {Component, ElementRef, OnInit} from '@angular/core';
import {MatDialog} from '@angular/material';
import {GraphService} from '../../_services/graph.service';
import {NodeInputDialogComponent} from './node-input-dialog/node-input-dialog.component';
import {HttpClient, HttpEventType, HttpRequest} from '@angular/common/http';


@Component({
    selector: 'app-graph-editor',
    templateUrl: './graph-editor.component.html',
    styleUrls: ['./graph-editor.component.css'],
})
export class GraphEditorComponent implements OnInit {
    private newNodeName: string;
    private graph: any;
    private progress: number;
    private message: string;

    constructor(private element: ElementRef,
                private dialog: MatDialog,
                private _graphService: GraphService,
                private _httpClient: HttpClient
    ) {

    }

    ngOnInit() {
        this._graphService.graph.subscribe(res => this.graph = res);
    }

    openAddNodeDialog(): void {
        const dialogRef = this.dialog.open(NodeInputDialogComponent, {
            width: '250px',
        });

        dialogRef.afterClosed().subscribe(result => {
            this.graph.addNode(result);
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
                this._graphService.fromDictOfLists(httpEvent.body);
            }
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


