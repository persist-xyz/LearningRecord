#! /usr/bin/env python3
# -*- coding: utf-8 -*-

def product(x, y=1, *args):
    s=1
    for n in args:
        s=s*n
    return x * y * s

print('product(5) =', product(5))
print('product(5, 6) =', product(5, 6))
print('product(5, 6, 7) =', product(5, 6, 7))
print('product(5, 6, 7, 9) =', product(5, 6, 7, 9))
