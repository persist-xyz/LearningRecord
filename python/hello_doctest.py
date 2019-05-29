#! /usr/bin/env python3
# -*- coding: utf-8 -*-

def fact(n):
    '''
    Function to get n!
    Example:
    >>> fact(1)
    1
    >>> fact(2)
    2
    >>> fact(3)
    6
    >>> fact('a')
    Traceback(most recent call last)
        ...
    KeyError: 'a'
    '''
    if n < 1 :
        raise ValueError()
    if n == 1 :
        return 1
    return n * fact(n - 1)

if __name__ == 'main' :
    import doctest
    doctest.testmod()

print(fact(5))