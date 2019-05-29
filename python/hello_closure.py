#! /usr/bin/env python3
# -*- coding: utf-8 -*-

def createCounter():
    f = [0]
    def counter():
        f[0]=f[0]+1
        return f[0]
    return counter

# 测试:
counterA = createCounter()
print(counterA(), counterA(), counterA(), counterA(), counterA()) # 1 2 3 4 5
counterB = createCounter()
if [counterB(), counterB(), counterB(), counterB()] == [1, 2, 3, 4]:
    print('测试通过!')
else:
    print('测试失败!')