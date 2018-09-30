import {NgModule} from '@angular/core';

import {MenuItems} from './menu-items/menu-items';
import {AccordionAnchorDirective, AccordionLinkDirective, AccordionDirective} from './accordion';
import {RightClickTriggerDirective} from '../../_directives/right-click-trigger';


@NgModule({
    declarations: [
        AccordionAnchorDirective,
        AccordionLinkDirective,
        AccordionDirective,
        RightClickTriggerDirective
    ],
    exports: [
        AccordionAnchorDirective,
        AccordionLinkDirective,
        AccordionDirective,
        RightClickTriggerDirective
    ],
    providers: [MenuItems]
})
export class SharedModule {
}
