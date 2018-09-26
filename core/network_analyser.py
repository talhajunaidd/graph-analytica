import itertools

from networkx import DiGraph, nx
from networkx.classes.reportviews import NodeView

from core import utils


class NetworkAnalyser:

    @staticmethod
    def get_predecessors(network: DiGraph):

        result = dict()
        for node in network.nodes:
            predecessors = tuple(nx.DiGraph.predecessors(network, node))
            combinations = utils.all_subsets(predecessors)
            result[node] = tuple(combinations)
        return result

    @staticmethod
    def generate_state_space(nodes: NodeView):
        parameters = list()
        for node in nodes:
            min_threshold = nodes[node]['min']
            max_threshold = nodes[node]['max']
            values = tuple(range(min_threshold, max_threshold + 1))
            parameters.append(values)
        state_space = tuple(itertools.product(*parameters))
        for element in state_space:
            yield dict(zip(nodes, element))

    @staticmethod
    def get_state_graph(network: DiGraph, parameters):
        state_space = list(NetworkAnalyser.generate_state_space(network.nodes))
        state_graph = nx.DiGraph()
        state_space_nodes = [utils.create_node_from_dict(entry) for entry in state_space]
        state_graph.add_nodes_from(state_space_nodes)

        resources = NetworkAnalyser.calculate_resources(network, state_space)

        k_states = NetworkAnalyser.calculate_k(resources, parameters)

        next_states = NetworkAnalyser.calculate_next_states(k_states)

        edges = NetworkAnalyser.generate_edges(next_states)
        state_graph.add_edges_from(edges)
        return state_graph

    @staticmethod
    def generate_edges(next_states):
        edges = list()
        for key, states in next_states.items():
            previous_value = dict(key)
            source = utils.create_node_from_dict(previous_value)
            for state in states:
                target = utils.create_node_from_dict(state)
                edges.append((source, target))
        return edges

    @staticmethod
    def calculate_next_states(k_states):
        for state_key, state in k_states.items():
            previous_entities = dict(state_key)
            new_val = list()
            temp_previous = previous_entities.copy()
            for entity_key, previous_entity in previous_entities.items():
                next_value = k_states[state_key][entity_key]

                if next_value > previous_entity:
                    previous_entities[entity_key] = previous_entity + 1
                elif next_value < previous_entity:
                    previous_entities[entity_key] = previous_entity - 1

                if not (previous_entities in new_val) and not previous_entities == temp_previous:
                    new_val.append(previous_entities.copy())
                    previous_entities[entity_key] = temp_previous[entity_key]
            k_states[state_key] = new_val
        return k_states

    @staticmethod
    def calculate_k(resources, parameters):
        for resource_key, entities in resources.items():
            for entity_key, entity in entities.items():
                matched_interaction = filter(lambda x: sorted(x['interaction']) == sorted(entity), parameters[entity_key])
                first_interaction = next(matched_interaction)
                entities[entity_key] = first_interaction['value']
        return resources

    @staticmethod
    def calculate_resources(network, state_space):
        resources = dict()
        for state in state_space:
            node = dict()
            for key in state:
                entity_resources = list()
                in_edges = network.in_edges(key, data=True)
                for edge in in_edges:
                    weight = edge[2]['weight']
                    is_positive = weight >= 0
                    value = state[edge[0]]
                    is_resource = (is_positive and value >= abs(weight)) or (
                        not is_positive and value < abs(weight))
                    if is_resource:
                        entity_resources.append(edge[0])
                node[key] = entity_resources
            state_key = tuple(state.items())
            resources[state_key] = node
        return resources
