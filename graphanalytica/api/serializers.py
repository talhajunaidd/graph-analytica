from rest_framework import serializers

from pyrthomas.models import Node, Edge


class NodeSerializer(serializers.Serializer):
    def update(self, instance, validated_data):
        pass

    def create(self, validated_data):
        return Node(validated_data['id'], validated_data['min'], validated_data['max'])

    id = serializers.CharField()
    min = serializers.IntegerField()
    max = serializers.IntegerField()


class EdgeSerializer(serializers.Serializer):
    def update(self, instance, validated_data):
        pass

    def create(self, validated_data):
        return Edge(validated_data['source'],
                    validated_data['target'],
                    validated_data['weight'])

    source = serializers.CharField(allow_blank=False)
    target = serializers.CharField(allow_blank=False)
    weight = serializers.FloatField()
