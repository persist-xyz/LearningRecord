#! /usr/bin/env python3
# -*- coding: utf-8 -*-

dict = {
    'name': 'xyz',
    'age': 25,
    'height': 170
}
print('d.name:', dict['name'])
dict.pop('age')
print(dict)

s1 = set([1, 2, 3, 4])
s2 = set([3, 5 ,8])

print(s1)
print(s1 & s2)
print(s1 | s2)

# error
# s2.add([9, 10]) 
print(s2)

print(hex(255))

