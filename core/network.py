import networkx as nx
from networkx.readwrite import json_graph

from core.constants import pickle_key, graphml_file_name


class NetworkService:
    def __init__(self) -> None:
        try:
            self.network = nx.read_gpickle(pickle_key)
        except FileNotFoundError:
            self.network = nx.DiGraph()
            nx.write_gpickle(self.network, pickle_key)

    def add_node(self, node):
        self.network.add_node(node.id, min=node.min, max=node.max)
        self.persist_network()

    def add_edge(self, edge):
        self.network.add_edge(edge.source, edge.target, weight=edge.weight)
        self.persist_network()

    def get_nodes(self):
        return list(self.network.nodes)

    def clear(self):
        self.network.clear()
        self.persist_network()

    def get_edges(self):
        return list(self.network.edges)

    def import_graphml(self, file):
        self.network = nx.read_graphml(file)
        self.persist_network()
        return json_graph.adjacency_data(self.network)

    def export_graphml(self):
        file = open(graphml_file_name, "wb")
        nx.write_graphml(self.network, file, prettyprint=True)
        file.close()
        return file.name

    def persist_network(self):
        nx.write_gpickle(self.network, pickle_key)
