import networkx as nx

from core.constants import pickle_key


class NetworkService:
    def __init__(self) -> None:
        try:
            self.network = nx.read_gpickle(pickle_key)
        except FileNotFoundError:
            self.network = nx.DiGraph()
            nx.write_gpickle(self.network, pickle_key)

    def add_node(self, node):
        self.network.add_node(node)
        nx.write_gpickle(self.network, pickle_key)

    def add_edge(self, edge):
        self.network.add_edge(edge.source, edge.target)

    def get_nodes(self):
        return list(self.network.nodes)

    def get_edges(self):
        return list(self.network.edges)
