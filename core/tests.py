from django.test import TestCase

from core.models import Node, Edge
from core.network import NetworkService
from core.network_analyser import NetworkAnalyser


class NetworkTestCase(TestCase):
    def setUp(self):
        self.network_service = NetworkService()
        x = Node('x', 0, 2)
        y = Node('y', 0, 1)
        edge1 = Edge(x.id, y.id, 1)
        edge2 = Edge(y.id, x.id, -1)
        edge3 = Edge(x.id, x.id, 2)
        self.network_service.add_node(x)
        self.network_service.add_node(y)
        self.network_service.add_edge(edge1)
        self.network_service.add_edge(edge2)
        self.network_service.add_edge(edge3)
        self.network_analyser = NetworkAnalyser(self.network_service.network)

    def test_predecessor_combinations(self):
        predecessor_combinations = self.network_analyser.generate_predecessor_combinations()
        expected_x = ((), ('y',), ('x',), ('y', 'x'))
        print(predecessor_combinations)
        self.assertTupleEqual(predecessor_combinations['x'], expected_x)

    def test_range_combinations(self):
        result = self.network_analyser.generate_range_combinations()
        expected = ((0, 0), (0, 1), (1, 0), (1, 1), (2, 0), (2, 1))
        self.assertTupleEqual(result, expected)

    def test_state_graph(self):
        graph = self.network_analyser.generate_state_graph()
        result = list(graph.nodes)
        expected = ['00', '01', '10', '11', '20', '21']
        self.assertListEqual(result, expected)

    def tearDown(self):
        self.network_service.clear()
