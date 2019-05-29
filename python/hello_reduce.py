#! /usr/bin/env python3
# -*- coding: utf-8 -*-

from functools import reduce

def add(x, y):
    return x*10+y

sum = reduce(add, [1, 3, 5, 7, 9])

print(sum)
print('------------')


def prod(L):
   def fn(x, y):
      return x * y
   return reduce(fn, L)

print('3 * 5 * 7 * 9 =', prod([3, 5, 7, 9]))
if prod([3, 5, 7, 9]) == 945:
    print('测试成功!')
else:
    print('测试失败!')

print('---------')

def str2float(s):
    def fn(x,y):
        return x*10+y
    n=s.index('.')
    s1=list(map(int,[x for x in s[:n]]))
    s2=list(map(int,[x for x in s[n+1:]]))
    print(s1)
    print(s2)
    return reduce(fn,s1) + reduce(fn,s2)/10**len(s2)

print('str2float(\'123.456\') =', str2float('123.456'))
if abs(str2float('123.456') - 123.456) < 0.00001:
    print('测试成功!')
else:
    print('测试失败!')

    