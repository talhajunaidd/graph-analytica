import {Injectable} from '@angular/core';
import IEdgeInput from '../app/graph-editor/utils/IEdgeInput';

@Injectable({
    providedIn: 'root'
})
export class GraphService {
    private cy: any;
    elements = [ // list of graph elements to start with
        { // node a
            data: {id: 'a'},
            position: { // the model position of the node (optional on init, mandatory after)
                x: 100,
                y: 200
            },
        },
        { // node b
            data: {id: 'b'},
            position: { // the model position of the node (optional on init, mandatory after)
                x: 200,
                y: 100
            },
        }
    ];

    constructor() {
    }

    registerCy(cy: any) {
        this.cy = cy;
        this.cy.add(this.elements);
    }

    addNode(nodeId: string) {
        this.cy.add({
            group: 'nodes',
            data: {
                id: nodeId
            },
            position: { // the model position of the node (optional on init, mandatory after)
                x: this.getRandomNumber(),
                y: this.getRandomNumber()
            },
        });
    }

    getRandomNumber(): number {
        return Math.floor((Math.random() * 300) + 1);
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
