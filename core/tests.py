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

    def test_predecessor_combinations(self):
        predecessor_combinations = NetworkAnalyser.get_predecessors(self.network_service.network)
        expected_x = ((), ('y',), ('x',), ('y', 'x'))
        print(predecessor_combinations)
        self.assertTupleEqual(predecessor_combinations['x'], expected_x)

    def test_state_space(self):
        result = NetworkAnalyser.generate_state_space(self.network_service.network.nodes)
        expected = ((0, 0), (0, 1), (1, 0), (1, 1), (2, 0), (2, 1))
        self.assertTupleEqual(result, expected)

    def test_state_graph(self):
        parameters = {
            'x': [
                {
                    'interaction': [],
                    'value': 0
                },
                {
                    'interaction': ['x'],
                    'value': 2
                },
                {
                    'interaction': ['y'],
                    'value': 2
                },
                {
                    'interaction': ['x', 'y'],
                    'value': 2
                }
            ],
            'y': [
                {
                    'interaction': [],
                    'value': 0
                },
                {
                    'interaction': ['x'],
                    'value': 1
                }
            ]
        }
        graph = NetworkAnalyser.get_state_graph(self.network_service.network, parameters)
        result = list(graph.nodes)
        expected = ((0, 0), (0, 1), (1, 0), (1, 1), (2, 0), (2, 1))
        self.assertListEqual(result, expected)

    def test_cycles(self):
        network = self.network_service.network
        NetworkAnalyser.get_cycles()

    def test_out_degree(self):
        NetworkAnalyser.get_deadlock_states()

    def tearDown(self):
        self.network_service.clear()
