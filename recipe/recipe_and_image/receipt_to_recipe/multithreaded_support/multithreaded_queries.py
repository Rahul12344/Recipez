import requests
from multiprocessing.pool import Pool
from multiprocessing import *

class MultithreadedQuery:

    def __init__(self):
        num_threads = multiprocessing.cpu_count()

    def threads(self,num_threads,ingredients):
        RESTcall = partial(requests.get, endpoint)
        with Pool(num_threads) as p:
            p.map(requests,ingredients)

    def focus_output():
