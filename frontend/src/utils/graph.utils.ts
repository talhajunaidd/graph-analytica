import IEdgeInput from '../app/graph-editor/utils/IEdgeInput';

export class GraphUtils {
    static buildNode(node) {
        return {
            group: 'nodes',
            data: {
                id: node.id,
                min: node.min,
                max: node.max
            }
        };
    }

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

    static buildNodes(nodes) {
        return nodes.map(node => GraphUtils.buildNode(node));
    }

    static importNodeLinkData(body) {
        const nodes = GraphUtils.buildNodes(body.nodes);
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
        nodes.push(...edges);
        return nodes;
    }
}
