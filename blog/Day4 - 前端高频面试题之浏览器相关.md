#### 1、options预请求

options预请求是浏览器自主发起的，用于判断该请求是否是服务器允许的提交方式或者允许的请求头字段



在 [CORS](https://developer.mozilla.org/zh-CN/docs/Web/HTTP/Access_control_CORS) 中，可以使用 OPTIONS 方法发起一个预检请求，以检测实际请求是否可以被服务器所接受。

预检请求报文中的 `Access-Control-Request-Method`首部字段告知服务器实际请求所使用的 HTTP 方法；

`Access-Control-Request-Headers`首部字段告知服务器实际请求所携带的自定义首部字段。

服务器基于从预检请求获得的信息来判断，是否接受接下来的实际请求。



你理解的 Generator 是什么？

