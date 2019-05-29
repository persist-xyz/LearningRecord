#! /usr/bin/env python3
# -*- coding: utf-8 -*-

# x=(-b+math.sqrt(b**2-4*a*c))/2*a

# ax2 + bx = -c

import math
def quadratic (a, b, c) :
    v = math.sqrt(b*b- 4*a*c)
    if v>0:
        x1 = (v-b) / 2*a
        x2 = (-b-v) / 2*a
    elif v == 0:
        x1 = -c-b
        x2 = x1
    elif v<0:
        print('error 无解')
        return(None, None)
    return (x1, x2)

print(quadratic(1,3,-4))