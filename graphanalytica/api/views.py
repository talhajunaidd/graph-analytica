# Create your views here.
from wsgiref.util import FileWrapper

from django.http import HttpResponse
from rest_framework.parsers import MultiPartParser, FormParser
from rest_framework.response import Response
from rest_framework.views import APIView

from core.network import NetworkService
from graphanalytica.api.serializers import NodeSerializer, EdgeSerializer


class FileView(APIView):
    parser_classes = (MultiPartParser, FormParser)

    def __init__(self, *args, **kwargs):
        super().__init__(**kwargs)
        self.network = NetworkService()

    def post(self, request, *args, **kwargs):
        file = request.data['file'].file
        data = self.network.import_graphml(file)
        return Response(data)

    def get(self, request):
        file_name = self.network.export_graphml()
        f = open(file_name)
        response = HttpResponse(FileWrapper(f), content_type='application/graphml')
        response['Content-Disposition'] = 'attachment; filename="%s"' % 'network.graphml'
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
