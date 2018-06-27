from rest_framework import serializers

from core.models import Node, Edge


class NodeSerializer(serializers.Serializer):
    def update(self, instance, validated_data):
        pass

    def create(self, validated_data):
        return Node(validated_data['id'])

    id = serializers.CharField()


class EdgeSerializer(serializers.Serializer):
    def update(self, instance, validated_data):
        pass

    def create(self, validated_data):
        return Edge(validated_data['source'], validated_data['target'])

    source = serializers.CharField(allow_blank=False)
    target = serializers.CharField(allow_blank=False)
