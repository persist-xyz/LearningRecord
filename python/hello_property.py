#! /usr/bin/env python3
# -*- coding: utf-8 -*-

class Screen(object):
    @property
    def width(self):
        return self._width
    
    @width.setter
    def width(self, width):
        if not isinstance(width, int):
            raise ValueError('width must be an integer')

        if width<0:
            raise ValueError('must over zero')

        self._width = width

    @property
    def height(self):
        return self._height
    
    @height.setter
    def height(self, height):
        if not isinstance(height, int):
            raise ValueError('height must be an integer')

        if height<0:
            raise ValueError('must over zero')
            
        self._height = height

    @property
    def resolution(self):
        return self._width * self._height

# 测试:
s = Screen()
s.width = 1024
s.height = 768
print('resolution =', s.resolution)
if s.resolution == 786432:
    print('测试通过!')
else:
    print('测试失败!')