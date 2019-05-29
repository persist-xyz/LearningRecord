#! /usr/bin/env python3
# -*- coding: utf-8 -*-

import hashlib, random

# 根据用户输入的登录名和口令模拟用户注册，计算更安全的MD5
db1 = {}

def get_md5(s):
    return hashlib.md5(s.encode('utf-8')).hexdigest()

def register(username, password):
    db1[username] = get_md5(password + username + 'the-Salt')

register('xyz', '123')

print(db1)
print('--------------')


class User(object):
    def __init__(self, username, password):
        self.username = username
        self.salt = ''.join([chr(random.randint(48, 122)) for i in range(20)])
        self.password = get_md5(password + self.salt)

db = {
    'michael': User('michael', '123456'),
    'bob': User('bob', 'abc999'),
    'alice': User('alice', 'alice2008')
}

def login(username, password):
    user = db[username]
    return user.password == get_md5(password + user.salt)


# 测试:
assert login('michael', '123456')
assert login('bob', 'abc999')
assert login('alice', 'alice2008')
assert not login('michael', '1234567')
assert not login('bob', '123456')
assert not login('alice', 'Alice2008')
print('ok')

