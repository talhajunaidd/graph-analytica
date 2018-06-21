import * as d3 from 'd3';
import IPanZoom from './IPanZoom';

export default interface IDrawOptions {
    element?: string;
    d3?: any;
    width?: number;
    height?: number;
    layoutAttr?: object;
    nodelist?: Iterable<string>;
    nodeShape?: string;
    nodeAttr?: object;
    nodeStyle?: object;
    edgeAttr?: object;
    edgeStyle?: object;
    withLabels?: boolean;
    labels?: string | object | void;
    labelAttr?: object;
    labelStyle?: object;
    withEdgeLabels?: boolean;
    edgeLabels?: string | object | void;
    edgeLabelAttr?: object;
    edgeLabelStyle?: object;
    weighted?: boolean;
    weights?: string | void;
    edgeOffset?: number | void;
    edgeLabelOffset?: number | void;
    panZoom?: IPanZoom;
    stickyDrag?: boolean;
}

