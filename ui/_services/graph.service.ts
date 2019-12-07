import {Injectable} from '@angular/core';
import IEdgeInput from '../app/graph-editor/utils/IEdgeInput';
import CyNode from '../app/ngx-cytoscape/models/cy-node';
import {HttpClient} from '@angular/common/http';

@Injectable({
    providedIn: 'root'
})
export class GraphService {
    private cy: any;

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
    }

    addNode(node: CyNode) {
        this._httpClient.post('api/node/', node).subscribe(z => {
            this.cy.add(this.buildNode(node));
        });
    }

    private buildNodes(nodes) {
        return nodes.map(node => this.buildNode(node));
    }

    private buildNode(node) {
        return {
            group: 'nodes',
            data: {
                id: node.id,
                min: node.min,
                max: node.max
            }
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

    importNodeLinkData(body) {
        const nodes = this.buildNodes(body.nodes);
        const edges = body.links.map(link => {
            const edge = {
                id: `${link.source}-${link.target}`,
                source: link.source,
                target: link.target,
                weight: link.weight
            };
            return {
                group: 'edges',
                data: edge
            };
        });
        // this.cy.add(list);
        // const gridLayout = this.cy.layout({
        //     name: 'grid'
        // });
        // gridLayout.run();
        nodes.push(...edges);
        return nodes;
    }
}
