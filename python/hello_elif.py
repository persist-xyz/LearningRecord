#! /usr/bin/env python3
# -*- coding: utf-8 -*-

height = input('input your height:')
weight = input('input your weight:')

h = float(height)
w = float(weight)

bim = w / (h * h)
print(bim)

if bim < 18.5:
    print('过轻')
elif bim < 25:
    print('正常')
elif bim < 28:
    print('过重')
elif bim < 32:
    print('肥胖')
else:
    print('严重肥胖')

