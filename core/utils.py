import itertools


def all_subsets(items):
    return itertools.chain(*map(lambda x: itertools.combinations(items, x), range(0, len(items) + 1)))


def create_node_from_dict(item: dict):
    return ''.join(map(str, item.values()))
