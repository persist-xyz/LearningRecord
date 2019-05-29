#! /usr/bin/env python3
# -*- coding: utf-8 -*-


# 能处理去掉=的base64解码函数
import base64

def safe_base64_decode(s):
    _len = len(s) % 4
    print((4-_len)*b'=')

    if _len != 0:
        return base64.b64decode(s + (4-_len)*b'=')
    else:
        return base64.b64decode(s)



# 测试:
assert b'abcd' == safe_base64_decode(b'YWJjZA=='), safe_base64_decode('YWJjZA==')
assert b'abcd' == safe_base64_decode(b'YWJjZA'), safe_base64_decode('YWJjZA')
print('ok')

