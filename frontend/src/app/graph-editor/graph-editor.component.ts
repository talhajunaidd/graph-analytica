import {AfterViewChecked, Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {MatDialog, MatSliderChange, MatSnackBar} from '@angular/material';
import {GraphService} from '../../_services/graph.service';
import {NodeInputDialogComponent} from './node-input-dialog/node-input-dialog.component';
import {HttpClient, HttpEventType, HttpParams, HttpRequest, HttpResponse} from '@angular/common/http';
import {EdgeInputDialogComponent} from './edge-input-dialog/edge-input-dialog.component';
import {NodeLinkView} from '../../_models/NodeLinkView';
import {Router} from '@angular/router';
import {NgxCytoscapeComponent} from '../ngx-cytoscape/ngx-cytoscape.component';
import {GraphUtils} from '../../utils/graph.utils';
import {AvailableCyLayouts, CyLayout} from './utils/available-cy-layouts';
import {ResetDialogComponent} from './reset-dialog/reset-dialog.component';
import {MagnifierModel} from '../state-graph/magnifier.model';

@Component({
    selector: 'app-graph-editor',
    templateUrl: './graph-editor.component.html',
    styleUrls: ['./graph-editor.component.scss']
})
export class GraphEditorComponent implements OnInit, AfterViewChecked {
    @ViewChild(NgxCytoscapeComponent)
    cy: NgxCytoscapeComponent;

    progress: number;
    elements: any;

    layout = {
        name: 'grid',
        directed: true,
        animate: true,
        animationDuration: 500,
        avoidOverlap: true,
        padding: 30,

    };

    magnifierConfig: MagnifierModel = {
        min: 0,
        max: 0,
        step: 0.05,
        value: 1
    };

    availableLayouts: CyLayout[];

    constructor(private element: ElementRef,
                private dialog: MatDialog,
                private _graphService: GraphService,
                private _httpClient: HttpClient, private _snackBar: MatSnackBar,
                private router: Router
    ) {

    }


    ngOnInit() {
        this.availableLayouts = AvailableCyLayouts;
        this._httpClient.get<NodeLinkView>('api/graph/').subscribe((res) => {
            this.elements = GraphUtils.importNodeLinkData(res);
        });
    }

    openAddNodeDialog(): void {
        const dialogRef = this.dialog.open(NodeInputDialogComponent, {});

        dialogRef.afterClosed().subscribe(result => {
            if (result) {
                this._httpClient.post('api/node/', result).subscribe(z => {
                    this.cy.addElement(GraphUtils.buildNode(result));
                });
            }
        });
    }

    openResetDialog(): void {
        const dialogRef = this.dialog.open(ResetDialogComponent, {});

        dialogRef.afterClosed().subscribe(result => {
            if (result && result === true) {
                this._httpClient.delete('api/graph/').subscribe(z => {
                    this.elements = [];
                });
            }
        });
    }

    export(type: string): void {
        this._httpClient.get('api/file/', {
            responseType: 'blob',
            params: new HttpParams().set('type', type),
            observe: 'response'
        }).subscribe((res: HttpResponse<Blob>) => {
            const contentDisposition = res.headers.get('Content-Disposition');
            let fileName = contentDisposition.split('filename=')[1];
            if (fileName[0] === '"' || fileName[0] === '\'') {
                fileName = fileName.substring(1, fileName.length - 1);
            }

            const url = window.URL.createObjectURL(res.body);
            const linkElement = document.createElement('a');
            document.body.appendChild(linkElement);
            linkElement.setAttribute('style', 'display: none');
            linkElement.href = url;
            linkElement.download = fileName;
            linkElement.click();
            window.URL.revokeObjectURL(url);
            linkElement.remove();
        });
    }

    openAddEdgeDialog(): void {
        const dialogRef = this.dialog.open(EdgeInputDialogComponent, {
            data: {nodes: this.cy.nodes}
        });

        dialogRef.afterClosed().subscribe(result => {
            if (result) {
                const data = GraphUtils.transformEdgeData(result);
                this._httpClient.post('api/edge/', data).subscribe(z => {
                    this.cy.addElement({group: 'edges', data: data});
                });
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
        event.target.value = '';

        this._httpClient.request(uploadReq).subscribe(httpEvent => {
            if (httpEvent.type === HttpEventType.UploadProgress) {
                this.progress = Math.round(100 * httpEvent.loaded / httpEvent.total);
            } else if (httpEvent.type === HttpEventType.Response) {
                this.elements = GraphUtils.importNodeLinkData(httpEvent.body);

            }
        });
    }

    generate_state_graph() {
        this.router.navigate(['stategraph']);
    }

    setLayout(event) {
        this.cy.runLayout({name: event.id});
    }

    onZoomLevelChange(event: MatSliderChange): void {
        this.cy.cy.zoom(event.value);
    }

    ngAfterViewChecked(): void {
        this.magnifierConfig = {
            min: this.cy.cy.minZoom(),
            max: this.cy.cy.maxZoom(),
            step: 0.05,
            value: this.cy.cy.zoom()
        };

    }
}
