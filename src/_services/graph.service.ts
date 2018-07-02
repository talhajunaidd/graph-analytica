import {Injectable} from '@angular/core';
import IEdgeInput from '../app/graph-editor/utils/IEdgeInput';
import ICyNode from '../app/ngx-cytoscape/models/cy-node';
import {HttpClient} from '@angular/common/http';

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

    static transformEdgeData(result: IEdgeInput) {
        let weight = result.threshold;
        if (!result.isActivator) {
            weight = -weight;
        }
        return {
            id: result.source + result.target,
            source: result.source,
            target: result.target,
            weight: weight
        };
    }

    static getRandomNumber(): number {
        return Math.floor((Math.random() * 300) + 1);
    }

    constructor(private _httpClient: HttpClient) {
    }

    registerCy(cy: any) {
        this.cy = cy;
        /*this.cy.add(this.elements);*/
    }

    addNode(node: ICyNode) {
        this._httpClient.post('api/node/', node).subscribe(z => {
            this.cy.add(this.buildNode(node));
        });
    }

    private buildNodes(nodes: ICyNode[]) {
        return nodes.map(node => this.buildNode(node));
    }

    private buildNode(node: ICyNode) {
        return {
            group: 'nodes',
            data: {
                id: node.id,
                min: node.min,
                max: node.max
            },
            position: { // the model position of the node (optional on init, mandatory after)
                x: GraphService.getRandomNumber(),
                y: GraphService.getRandomNumber()
            },
        };
    }

    getNodes() {
        const nodes = [];
        this.cy.nodes().forEach(z => {
            nodes.push(z.id());
        });
        return nodes;
    }

    addEdge(result: IEdgeInput) {
        const data = GraphService.transformEdgeData(result);
        this._httpClient.post('api/edge/', data).subscribe(z => {
            this.cy.add(
                {
                    group: 'edges',
                    data: data
                });
        });
    }

    importAdjacency(body: any) {
        this.cy.elements().remove();
        const nodes = this.buildNodes(body.nodes);
        this.cy.add(nodes);
        body.adjacency.forEach((targetNode, nodeIndex) => {
            const list = targetNode.map((targetedge, edgeIndex) => {
                const sourceNode = body.nodes[nodeIndex];
                const edge = {
                    id: sourceNode.id + targetedge.id,
                    source: sourceNode.id,
                    target: targetedge.id,
                    weight: targetedge.weight
                };
                return {
                    group: 'edges',
                    data: edge
                };
            });
            this.cy.add(list);
        });

    }
}
