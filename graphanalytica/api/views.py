import os
from wsgiref.util import FileWrapper

from django.http import HttpResponse
from networkx.readwrite import json_graph
from rest_framework import status
from rest_framework.parsers import MultiPartParser, FormParser
from rest_framework.response import Response
from rest_framework.views import APIView

from core.network import NetworkService
from core.network_analyser import NetworkAnalyser
from graphanalytica.api.serializers import NodeSerializer, EdgeSerializer


class FileView(APIView):
    parser_classes = (MultiPartParser, FormParser)

    def __init__(self, *args, **kwargs):
        super().__init__(**kwargs)
        self.network = NetworkService()

    def post(self, request, *args, **kwargs):
        file = request.data['file']
        filename, file_extension = os.path.splitext(file.name)
        data = None
        if file_extension == '.dot':
            data = self.network.import_dot(file.file)

        if file_extension == '.graphml':
            data = self.network.import_graphml(file.file)

        if file_extension == '.sif':
            data = self.network.import_sif(file.file)

        return Response(data)

    def get(self, request):
        type = request.GET.get('type', None)
        file_name = None
        if type == 'dot':
            file_name = self.network.export_dot()
        if type == 'graphml':
            file_name = self.network.export_graphml()
        if type == 'sif':
            file_name = self.network.export_sif()
        f = open(file_name)
        response = HttpResponse(FileWrapper(f), content_type="application/{0}".format(type))
        response['Content-Disposition'] = 'attachment; filename="{0}"'.format(file_name)
        return response


class NodeView(APIView):
    def __init__(self, *args, **kwargs):
        super().__init__(**kwargs)
        self.network = NetworkService()

    def get(self, request):
        nodes = self.network.get_nodes()
        return Response(nodes)

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


class StateGraphView(APIView):
    def __init__(self, *args, **kwargs):
        super().__init__(**kwargs)
        self.network_analyser = NetworkAnalyser()
        self.network_service = NetworkService()

    def post(self, request):
        parameters = request.data
        state_graph = self.network_analyser.get_state_graph(self.network_service.network, parameters)
        data = json_graph.node_link_data(state_graph)
        return Response(data)


class GraphView(APIView):
    def __init__(self, *args, **kwargs):
        super().__init__(**kwargs)
        self.network_service = NetworkService()

    def get(self, request):
        data = json_graph.node_link_data(self.network_service.network)
        return Response(data)

    def delete(self, request):
        self.network_service.clear()
        return Response(status=status.HTTP_200_OK)


class StateGraphParametersView(APIView):
    def __init__(self, *args, **kwargs):
        super().__init__(**kwargs)
        self.network_service = NetworkService()
        self.network_analyser = NetworkAnalyser()

    def get(self, request):
        parameters = self.network_analyser.get_required_parameters(self.network_service.network)
        return Response(parameters)


class CyclesView(APIView):
    def __init__(self, *args, **kwargs):
        super().__init__(**kwargs)
        self.network_service = NetworkService()
        self.network_analyser = NetworkAnalyser()

    def get(self, request):
        cycles = self.network_analyser.get_cycles()
        return Response(cycles)


class DeadlocksView(APIView):
    def __init__(self, *args, **kwargs):
        super().__init__(**kwargs)
        self.network_service = NetworkService()
        self.network_analyser = NetworkAnalyser()

    def get(self, request):
        deadlocks = self.network_analyser.get_deadlock_states()
        return Response(deadlocks)
