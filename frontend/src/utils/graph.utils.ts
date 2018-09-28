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
}
