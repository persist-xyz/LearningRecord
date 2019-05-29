#! /usr/bin/env python3
# -*- coding: utf-8 -*-

import re
from datetime import datetime, timezone, timedelta

now = datetime.now()
print(now)   # datetime类型 2019-01-25 09:59:57.963936

thatTime = datetime(2015, 3, 3, 3, 3)
print(thatTime) # 2015-03-03 03:03:00

# datetime转换为timestamp
_timestamp = thatTime.timestamp()
print(_timestamp)   #1425322980.0

# timestamp转换为datetime
_datetime = datetime.fromtimestamp(_timestamp) # 本地时间
print(_datetime)

_utctime = datetime.utcfromtimestamp(_timestamp)  # utc时间
print(_utctime) 

# str转换为datetime
cday = datetime.strptime('2019-1-25 10:09:10', '%Y-%m-%d %H:%M:%S')
print(cday)

# datetime转换为str
_now = now.strftime('%Y-%m-%d %H:%M:%S')
_now2 = now.strftime('%a, %b %d %H:%M')
print(_now)
print(_now2)

# datetime加减
now3 = now + timedelta(hours = 10)
print(now3)
now4 = now - timedelta(days=1)
print(now4)
now5 = now + timedelta(days=1, hours=2)
print(now5)

print(timezone.utc)
# 拿到UTC时间，并强制设置时区为UTC+0:00
utc_dt = datetime.utcnow().replace(tzinfo=timezone.utc)
print(utc_dt)

# astimezone()将转换时区为北京时间
bj_dt = utc_dt.astimezone(timezone(timedelta(hours=8)))
print(bj_dt)
# astimezone()将bj_dt转换时区为东京时间
tokyo_dt = bj_dt.astimezone(timezone(timedelta(hours=9)))
print(tokyo_dt)

print('---------------')

# 假设你获取了用户输入的日期和时间如2015-1-21 9:01:30，
# 以及一个时区信息如UTC+5:00，均是str，请编写一个函数将其转换为timestamp

def to_timestamp(dt_str, tz_str):

    sign, hours, minutes = re.match(r'^UTC(.)(\d+):(\d+)$', tz_str).groups()
    if sign == '-':
        sign = -1
    else:
        sign = 1
    _minutes = sign * (int(hours) * 60 + int(minutes))
    _timezone = timezone(timedelta(minutes = _minutes))

    # str转换为datetime
    cday = datetime.strptime(dt_str, '%Y-%m-%d %H:%M:%S')
    # datetime转换为timestamp
    print(cday)

    dt = cday.replace(tzinfo=_timezone)

    result = dt.timestamp()

    print(result)
    return result


# 测试:
t1 = to_timestamp('2015-6-1 08:10:30', 'UTC+7:00')
assert t1 == 1433121030.0, t1

print('======')

t2 = to_timestamp('2015-5-31 16:10:30', 'UTC-09:00')
assert t2 == 1433121030.0, t2

print('ok')