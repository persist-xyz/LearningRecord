#! /usr/bin/env python3
# -*- coding: utf-8 -*-

import re

def is_valid_email(addr):
    re_addr = re.compile(r'^[a-zA-Z]+[.]?[a-zA-Z]+@[a-zA-Z]+\.com*$')
    
    print(re_addr.match(addr))
    if re_addr.match(addr):
        return True

# 测试:
assert is_valid_email('someone@gmail.com')
assert is_valid_email('bill.gates@microsoft.com')
assert not is_valid_email('bob#example.com')
assert not is_valid_email('mr-bob@example.com')
print('ok')
print('-------------')

def name_of_email(email):

    re_name = re.match(r'^<?([\w]+[\s]?[\w]+)>?[\w\s]*@(\w+.\w+)$', email)
    
    print(re_name.group(1))
    if re_name.group(1):
        return re_name.group(1)
    else:
        return False

# 测试:
assert name_of_email('<Tom Paris> tom@voyager.org') == 'Tom Paris'
assert name_of_email('tom@voyager.org') == 'tom'
print('ok')





