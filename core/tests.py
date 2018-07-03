from django.test import TestCase

from core.models import Node, Edge
from core.network import NetworkService


class NetworkTestCase(TestCase):
    def setUp(self):
        self.network = NetworkService()
        x = Node('x', 1, 2)
        y = Node('y', 1, 3)
        edge1 = Edge(x.id, y.id, 1)
        edge2 = Edge(y.id, x.id, -1)
        edge3 = Edge(x.id, x.id, 2)
        self.network.add_node(x)
        self.network.add_node(y)
        self.network.add_edge(edge1)
        self.network.add_edge(edge2)
        self.network.add_edge(edge3)

    def test_predecessor_combinations(self):
        predecessor_combinations = self.network.generate_predecessor_combinations()
        expected_x = ((), ('y',), ('x',), ('y', 'x'))
        print(predecessor_combinations)
        self.assertTupleEqual(predecessor_combinations['x'], expected_x)

    def tearDown(self):
        self.network.clear()
