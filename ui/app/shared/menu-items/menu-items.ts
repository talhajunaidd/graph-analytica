import {Injectable} from '@angular/core';
import {Menu} from './menu';

const MENUITEMS = [
    {state: 'editor', name: 'Editor', type: 'link', icon: 'bubble_chart'},
];

@Injectable()

export class MenuItems {
    badge: string;

    getMenuitem(): Menu[] {
        return MENUITEMS;
    }

}
