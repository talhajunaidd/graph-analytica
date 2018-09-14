import itertools

from networkx import DiGraph, nx
from networkx.classes.reportviews import NodeView

from core import utils


class NetworkAnalyser:

    @staticmethod
    def get_predecessors(network: DiGraph):

        result = dict()
        for node in network.nodes:
            predecessors = tuple(nx.DiGraph.predecessors(network, node))
            combinations = utils.all_subsets(predecessors)
            result[node] = tuple(combinations)
        return result

    @staticmethod
    def generate_state_space(nodes: NodeView):
        parameters = list()
        for node in nodes:
            min_threshold = nodes[node]['min']
            max_threshold = nodes[node]['max']
            values = tuple(range(min_threshold, max_threshold + 1))
            parameters.append(values)
        state_space = tuple(itertools.product(*parameters))
        for element in state_space:
            yield dict(zip(nodes, element))

    @staticmethod
    def get_state_graph(network: DiGraph):
        state_space = list(NetworkAnalyser.generate_state_space(network.nodes))

        state_graph = nx.DiGraph()
        state_space_nodes = [''.join(map(str, entry.values())) for entry in state_space]
        state_graph.add_nodes_from(state_space_nodes)

        next_state = dict()
        for state in state_space:
            node = dict()
            for key in state:
                resources = list()
                in_edges = network.in_edges(key, data=True)
                for edge in in_edges:
                    weight = edge[2]['weight']
                    is_positive = weight >= 0
                    value = state[edge[0]]
                    is_resource = (is_positive and value >= abs(weight)) or (
                        not is_positive and value < abs(weight))
                    if is_resource:
                        resources.append(edge[0])
                node[key] = resources
            state_key = tuple(frozenset(state.items()))
            next_state[state_key] = node
        print(next_state)
