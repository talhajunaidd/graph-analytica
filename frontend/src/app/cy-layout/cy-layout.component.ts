import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {CyLayout} from '../graph-editor/utils/available-cy-layouts';

@Component({
    selector: 'app-cy-layout',
    templateUrl: './cy-layout.component.html',
    styleUrls: ['./cy-layout.component.scss']
})
export class CyLayoutComponent implements OnInit {


    @Input()
    layouts: CyLayout[];
    @Input()
    menuName: string;
    @Output()
    layoutChange = new EventEmitter();

    constructor() {
    }

    ngOnInit() {
    }
}
