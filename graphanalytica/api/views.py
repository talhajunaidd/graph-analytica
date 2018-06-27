# Create your views here.
import random

import networkx as nx
from rest_framework.parsers import MultiPartParser, FormParser
from rest_framework.response import Response
from rest_framework.views import APIView

from core.network import NetworkService
from graphanalytica.api.serializers import NodeSerializer, EdgeSerializer


class EmployeeListView(APIView):

    def __init__(self, *args, **kwargs):
        super().__init__(*args, **kwargs)
        self.network = NetworkService()

    def get(self, request):
        self.network.add_node(random.randint(1, 100))
        nodes = self.network.get_nodes()
        return Response(nodes)


class FileView(APIView):
    parser_classes = (MultiPartParser, FormParser)

    def post(self, request, *args, **kwargs):
        file = request.data['file'].file
        graph = nx.read_graphml(file)

        # graph_as_List = nx.to_dict_of_lists(graph)
        return Response()
        # graph = nx.drawing.nx_agraph.read_dot(file)


class NodeView(APIView):
    def __init__(self, *args, **kwargs):
        super().__init__(**kwargs)
        self.network = NetworkService()

    def get(self, request):
        nodes = self.network.get_nodes()
        serializer = NodeSerializer(nodes, many=True)
        return Response(serializer.data)

    def post(self, request):
        serializer = NodeSerializer()
        node = serializer.create(validated_data=request.data)
        self.network.add_node(node)
        return Response()


class EdgeView(APIView):
    def __init__(self, *args, **kwargs):
        super().__init__(**kwargs)
        self.network = NetworkService()

    def get(self, request):
        edges = self.network.get_edges()
        serializer = EdgeSerializer(edges, many=True)
        return Response(serializer.data)

    def post(self, request):
        serializer = EdgeSerializer()
        edge = serializer.create(validated_data=request.data)
        self.network.add_edge(edge)
        return Response()
