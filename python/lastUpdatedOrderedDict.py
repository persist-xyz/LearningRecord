#! /usr/bin/env python3
# -*- coding: utf-8 -*-

from collections import OrderedDict

class LastUpdatedOrderedDict(OrderedDict):
    def __init__(self, capacity):
        super(LastUpdatedOrderedDict, self).__init__()
        #或者OrderedDict.__init__(self)
        #由于重写了构造方法，所以父类的构造方法不能直接继承过来
        #手动加一行：继承超(父)类构造方法
        self._capacity = capacity
        print('--__init__--')
        print(self._capacity)


def __setitem__(self, key, value):
    #instance[index]来调用这个方法
    # 如果key在dict中存在containsKey为1，不存在containsKey为0
    containsKey = 1 if key in self else 0
    #如果key多于容量capacity，就pop一个
    if len(self) - containsKey >= self._capacity:
        #正是因为last=False，才先进先出
        #默认为True
        #你可以last = self.popitem()
        #remove: (3,'cool')
        last = self.popitem(last=False)
        print('remove:', last)
    if containsKey:
        del self[key]
        print('set:', (key, value))
    else:
        print('add:', (key, value))

    OrderedDict.__setitem__(self, key, value)   


luod = LastUpdatedOrderedDict(3)
luod[1]='short'
luod[2]='rich'
luod[3]='cool'
luod[4]='tall'

print(luod)

print(list(luod.keys()))


