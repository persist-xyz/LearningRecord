#! /usr/bin/env python3
# -*- coding: utf-8 -*-

def normalize(name):
    print(name)
    return name[0].upper() + name[1:].lower()

L1 = ['adam', 'LISA', 'barT']
L2 = list(map(normalize, L1))
print(L2)