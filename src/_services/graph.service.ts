import {Injectable} from '@angular/core';
import * as jsnx from 'jsnetworkx';

@Injectable({
    providedIn: 'root'
})
export class GraphService {
    private graph;

    constructor() {
        this.graph = new jsnx.Graph();
    }

    getGraph(): jsnx.classes.Graph {
        return this.graph;
    }
}
