import ICyEdge from './cy-edge';

import ICyNode from './cy-node';

export default interface ICyElement {
    group: string;
    data?: ICyNode | ICyEdge;
    scratch?: any;
    position: any;

    selected?: boolean;

    selectable: boolean; // whether the selection state is mutable (default true)

    locked: boolean; // when locked a node's position is immutable (default false)

    grabbable: boolean; // whether the node can be grabbed and moved by the user

    classes: string; // a space separated list of class names that the element has
}
