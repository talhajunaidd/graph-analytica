# Create your views here.
import random

import networkx as nx
from rest_framework.parsers import MultiPartParser, FormParser
from rest_framework.response import Response
from rest_framework.views import APIView

from core.network import NetworkService


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
        graph_as_List = nx.to_dict_of_lists(graph)
        return Response(graph_as_List)
        # graph = nx.drawing.nx_agraph.read_dot(file)
