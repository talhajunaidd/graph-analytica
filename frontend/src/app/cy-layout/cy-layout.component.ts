import {Component, EventEmitter, Input, OnInit, Output, ViewEncapsulation} from '@angular/core';
import {AvailableCyLayouts, CyLayout} from '../graph-editor/utils/available-cy-layouts';

@Component({
    selector: 'app-cy-layout',
    templateUrl: './cy-layout.component.html',
    styleUrls: ['./cy-layout.component.scss'],
    encapsulation: ViewEncapsulation.None
})
export class CyLayoutComponent implements OnInit {


    @Input()
    layouts: CyLayout[];
    @Input()
    menuName: string;
    @Output()
    layoutChange = new EventEmitter();

    availableLayouts = AvailableCyLayouts;

    constructor() {
    }

    ngOnInit() {
    }
}
