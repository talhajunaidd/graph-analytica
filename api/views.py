# Create your views here.
import random

from rest_framework.response import Response
from rest_framework.views import APIView

from core.network import NetworkService


class EmployeeListView(APIView):

    def __init__(self, *args, **kwargs):
        super().__init__(*args, **kwargs)
        self.network = NetworkService()

    def get(self, request):
        self.network.add_node(random.randint(1,100))
        nodes = self.network.get_nodes()
        return Response(nodes)
