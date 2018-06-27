class Node(object):
    id: ''

    def __init__(self, node_id):
        self.id = node_id


class Edge(object):
    source: ''
    target: ''
    attributes: dict()

    def __init__(self, source, target):
        self.target = target
        self.source = source
