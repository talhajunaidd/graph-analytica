import io
import os
from wsgiref.util import FileWrapper

from django.http import HttpResponse
from networkx import write_gpickle, read_gpickle, DiGraph
from networkx.readwrite import json_graph
from rest_framework import status
from rest_framework.parsers import MultiPartParser, FormParser
from rest_framework.response import Response
from rest_framework.views import APIView

from graphanalytica.api.serializers import NodeSerializer, EdgeSerializer
from pyrthomas import NetworkService
from pyrthomas import NetworkAnalyser


class FileView(APIView):
    parser_classes = (MultiPartParser, FormParser)

    def __init__(self, *args, **kwargs):
        super().__init__(**kwargs)
        self.network_service = NetworkService()
        self.network_service.network = read_network()

    def post(self, request, *args, **kwargs):
        file = request.data['file']
        filename, file_extension = os.path.splitext(file.name)
        str_file = io.StringIO(file.file.read().decode('UTF-8'))
        if file_extension == '.dot':
            self.network_service.import_dot(str_file)

        if file_extension == '.graphml':
            self.network_service.import_graphml(str_file)

        if file_extension == '.sif':
            self.network_service.import_sif(str_file)
        write_network(self.network_service.network)
        graph_json = json_graph.node_link_data(self.network_service.network)
        return Response(graph_json)

    def get(self, request):
        file_type = request.GET.get('type', None)
        content_disposition = f'attachment; filename="graph.{file_type}"'
        if file_type == 'graphml':
            f = io.BytesIO(b"")
            self.network_service.export_graphml(f)
            f.seek(0)
            response = HttpResponse(FileWrapper(f), content_type="application/{0}".format(type))
            response['Content-Disposition'] = content_disposition
            return response
        parser = {
            'dot': self.network_service.export_dot,
            'sif': self.network_service.export_sif
        }
        f = io.StringIO("")
        parser.get(file_type)(f)
        f.seek(0)
        response = HttpResponse(FileWrapper(f), content_type="application/{0}".format(type))
        response['Content-Disposition'] = content_disposition
        return response


pickle_key = "g.gpickle"

state_graph_key = "sg.gpickle"


def read_network():
    try:
        return read_gpickle(pickle_key)
    except FileNotFoundError:
        return DiGraph()


def write_network(network: DiGraph):
    write_gpickle(network, pickle_key)


def read_state_graph():
    try:
        return read_gpickle(state_graph_key)
    except FileNotFoundError:
        return DiGraph()


def write_state_graph(network: DiGraph):
    write_gpickle(network, state_graph_key)


class NodeView(APIView):
    def __init__(self, *args, **kwargs):
        super().__init__(**kwargs)
        self.network_service = NetworkService()
        self.network_service.network = read_network()

    def get(self, request):
        nodes = self.network_service.get_nodes()
        return Response(nodes)

    def post(self, request):
        serializer = NodeSerializer()
        node = serializer.create(validated_data=request.data)
        self.network_service.add_node(node)
        write_network(self.network_service.network)
        return Response()


class EdgeView(APIView):
    def __init__(self, *args, **kwargs):
        super().__init__(**kwargs)
        self.network_service = NetworkService()
        self.network_service.network = read_network()

    def get(self, request):
        edges = self.network_service.get_edges()
        serializer = EdgeSerializer(edges, many=True)
        return Response(serializer.data)

    def post(self, request):
        serializer = EdgeSerializer()
        edge = serializer.create(validated_data=request.data)
        self.network_service.add_edge(edge)
        write_network(self.network_service.network)
        return Response()


class StateGraphView(APIView):
    def __init__(self, *args, **kwargs):
        super().__init__(**kwargs)
        self.network_analyser = NetworkAnalyser()
        self.network_service = NetworkService()
        self.network_service.network = read_network()

    def post(self, request):
        parameters = request.data
        state_graph = self.network_analyser.get_state_graph(self.network_service.network, parameters)
        write_state_graph(state_graph)
        data = json_graph.node_link_data(state_graph)
        return Response(data)


class GraphView(APIView):
    def __init__(self, *args, **kwargs):
        super().__init__(**kwargs)
        self.network_service = NetworkService()
        self.network_service.network = read_network()

    def get(self, request):
        data = json_graph.node_link_data(self.network_service.network)
        return Response(data)

    def delete(self, request):
        self.network_service.clear()
        write_network(self.network_service.network)
        return Response(status=status.HTTP_200_OK)


class StateGraphParametersView(APIView):
    def __init__(self, *args, **kwargs):
        super().__init__(**kwargs)
        self.network_service = NetworkService()
        self.network_analyser = NetworkAnalyser()
        self.network_service.network = read_network()

    def get(self, request):
        parameters = self.network_analyser.get_required_parameters(self.network_service.network)
        return Response(parameters)


class CyclesView(APIView):
    def __init__(self, *args, **kwargs):
        super().__init__(**kwargs)
        self.network_service = NetworkService()
        self.network_analyser = NetworkAnalyser()
        self.network_service.network = read_state_graph()

    def get(self, request):
        cycles = self.network_analyser.get_cycles(self.network_service.network)
        return Response(cycles)


class DeadlocksView(APIView):
    def __init__(self, *args, **kwargs):
        super().__init__(**kwargs)
        self.network_service = NetworkService()
        self.network_analyser = NetworkAnalyser()
        self.network_service.network = read_state_graph()

    def get(self, request):
        deadlocks = self.network_analyser.get_deadlock_states(self.network_service.network)
        return Response(deadlocks)
