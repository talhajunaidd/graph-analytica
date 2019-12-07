import {NgModule} from '@angular/core';

import {MenuItems} from './menu-items/menu-items';
import {AccordionAnchorDirective, AccordionDirective, AccordionLinkDirective} from './accordion';
import {RightClickTriggerDirective} from '../../_directives/right-click-trigger';
import {NgScrollbarModule} from 'ngx-scrollbar';
import {PrettyColorPipe} from './pretty-color/pretty-color.pipe';
import { MatIconRegistry } from '@angular/material/icon';
import {DomSanitizer} from '@angular/platform-browser';

@NgModule({
    declarations: [
        AccordionAnchorDirective,
        AccordionLinkDirective,
        AccordionDirective,
        RightClickTriggerDirective,
        PrettyColorPipe,
    ],
    exports: [
        AccordionAnchorDirective,
        AccordionLinkDirective,
        AccordionDirective,
        RightClickTriggerDirective,
        NgScrollbarModule,
        PrettyColorPipe,
    ],
    providers: [MenuItems, PrettyColorPipe]
})
export class SharedModule {
    constructor(iconRegistry: MatIconRegistry, sanitizer: DomSanitizer) {
        iconRegistry.addSvgIcon(
            'magnifier',
            sanitizer.bypassSecurityTrustResourceUrl('../../assets/icons/magnifier.svg'));
    }
}
