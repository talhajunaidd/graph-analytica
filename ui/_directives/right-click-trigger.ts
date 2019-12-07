import {Directive, Input} from '@angular/core';
import {MatMenuPanel, MatMenuTrigger} from '@angular/material/menu';

@Directive({
    selector: '[rightClickTrigger]',
    host: {
        'aria-haspopup': 'true',
        '(click)': '_handleClick($event)',
        '(contextmenu)': 'handleContext($event)',
    }
})
export class RightClickTriggerDirective extends MatMenuTrigger {
    @Input('rightClickTrigger')
    get _menuFor(): MatMenuPanel {
        return this.menu;
    }

    set _menuFor(v: MatMenuPanel) {
        this.menu = v;
    }

    _handleClick(e) {
        // left click
    }

    handleContext(e) {
        e.preventDefault(); // prevents the browsers context menu
        // document.getElementsByClassName('cdk-overlay-connected-position-bounding-box').setAttribute('style', `top:${e.screenY}px; left: ${e.screenX}px`);
        this.openMenu();
    }
}
