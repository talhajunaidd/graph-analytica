import itertools


def all_subsets(items):
    return itertools.chain(*map(lambda x: itertools.combinations(items, x), range(0, len(items) + 1)))

# def all_subsets(items: list, r: int) -> iter:
#     return itertools.chain((itertools.combinations(items, r)))
