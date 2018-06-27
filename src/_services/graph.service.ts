import {Injectable} from '@angular/core';
import IEdgeInput from '../app/graph-editor/utils/IEdgeInput';

@Injectable({
    providedIn: 'root'
})
export class GraphService {
    private cy: any;
    elements = [ // list of graph elements to start with
        { // node a
            data: {id: 'a'}
        },
        { // node b
            data: {id: 'b'}
        }/*,
            { // edge ab
                data: {id: 'ab', source: 'a', target: 'b'}
            }*/
    ];

    constructor() {
    }

    registerCy(cy: any) {
        this.cy = cy;
        this.cy.add(this.elements);
    }

    addNode(nodeId: string) {
        this.cy.add({group: 'nodes', data: {id: nodeId}});
    }


    getNodes() {
        const nodes = [];
        this.cy.nodes().forEach(z => {
            nodes.push(z.id());
        });
        return nodes;
    }

    addEdge(result: IEdgeInput) {
        let weight = result.threshold;
        if (!result.isActivator) {
            weight = -weight;
        }
        this.cy.add(
            {
                group: 'edges',
                data: {
                    id: result.source + result.target,
                    source: result.source,
                    target: result.target,
                    weight: weight
                }
            });
    }
}
