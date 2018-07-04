import itertools


def all_subsets(items):
    return itertools.chain(*map(lambda x: itertools.combinations(items, x), range(0, len(items) + 1)))
