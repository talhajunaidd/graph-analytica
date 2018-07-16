import itertools

from networkx import DiGraph, nx

from core import utils


class NetworkAnalyser:
    def __init__(self, network: DiGraph):
        self.network = network

    def generate_predecessor_combinations(self):
        result = dict()
        for node in self.network.nodes:
            predecessors = tuple(nx.DiGraph.predecessors(self.network, node))
            combinations = utils.all_subsets(predecessors)
            result[node] = tuple(combinations)
        return result

    def generate_range_combinations(self):
        nodes = self.network.nodes
        parameters = list()
        for node in nodes:
            min = self.network.nodes[node]['min']
            max = self.network.nodes[node]['max']
            parameters.append(tuple(range(min, max + 1)))
        return tuple(itertools.product(*parameters))

    def generate_state_graph(self):
        combinations = self.generate_range_combinations()
        state_graph = nx.DiGraph()
        for combination in combinations:
            node = ''.join(map(str, combination))
            state_graph.add_node(node)
        return state_graph
