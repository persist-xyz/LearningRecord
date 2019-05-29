#! /usr/bin/env python3
# -*- coding: utf-8 -*-

import time, functools

def metric(fn):
    @functools.wraps(fn)

    def wrapper(*args, **kw):
        start = time.time()

        res = fn(*args, **kw)
        
        end = time.time()
        
        print('%s executed in %s ms' % (fn.__name__,  (end-start)*1000 ))
        return res
    return wrapper

# 测试
@metric
def f1(x,y):
    time.sleep(1)
    return x+y

def main():
    result=f1(1,2)
    print(result)

main()