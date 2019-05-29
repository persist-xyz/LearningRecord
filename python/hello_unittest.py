#! /usr/bin/env python3
# -*- coding: utf-8 -*-
import unittest

class Student(object):
    def __init__(self, name, score):
        self.name = name
        self.score = score

    def get_grade(self):
        if self.score >= 80 & self.score <= 100:
            return 'A'
        elif self.score >= 60 & self.score <= 79:
            return 'B'
        elif self.score >= 0 & self.score <= 59:
            return 'C'
        else:
            raise ValueError('value is not between 0 and 100')

#运行单元测试	
if __name__ == '__main__':
	unittest.main()