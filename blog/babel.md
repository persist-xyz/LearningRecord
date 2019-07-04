#### babel-polyfill

babel默认只会转换最新的语法，但不会转换新的API，比如`Iterator`、`Generator`、`Set`、`Map`、`Proxy`、`Reflect`、`Symbol`、`Promise`等全局对象，以及一些定义在全局对象上的方法（比如`Object.assign`）都不会转码

如果想让这些方法运行，必须使用`babel-polyfill`，为当前环境提供一个垫片（模拟这些新特性）。



####nextTick的原理



用法：在下次 DOM 更新循环结束之后执行延迟回调。在修改数据之后立即使用这个方法，获取更新后的 DOM。



[Vue官网中]([https://cn.vuejs.org/v2/guide/reactivity.html#%E5%BC%82%E6%AD%A5%E6%9B%B4%E6%96%B0%E9%98%9F%E5%88%97](https://cn.vuejs.org/v2/guide/reactivity.html#异步更新队列))，提到DOM的更新是**异步**执行的，只要数据发生变化，将会开启一个队列，并缓冲在同一事件循环中发生的所有数据变更。如果同一个 watcher 被多次触发，只会被推入到队列中一次。



简单来说，就是当数据发生变化时，视图不会立即更新，而是等到同一事件循环中所有数据变化完成之后，再统一更新视图。



关于异步的解析，可以查看阮一峰老师的[这篇文章](http://www.ruanyifeng.com/blog/2014/10/event-loop.html)，具体来说，异步执行的运行机制如下。

> （1）所有同步任务都在主线程上执行，形成一个[执行栈](http://www.ruanyifeng.com/blog/2013/11/stack.html)（execution context stack）。
>
> （2）主线程之外，还存在一个"任务队列"（task queue）。只要异步任务有了运行结果，就在"任务队列"之中放置一个事件。
>
> （3）一旦"执行栈"中的所有同步任务执行完毕，系统就会读取"任务队列"，看看里面有哪些事件。那些对应的异步任务，于是结束等待状态，进入执行栈，开始执行。
>
> （4）主线程不断重复上面的第三步。



例子：

```javascript
//改变数据
vm.message = 'changed'

//想要立即使用更新后的DOM。这样不行，因为设置message后DOM还没有更新
console.log(vm.$el.textContent) // 并不会得到'changed'

//这样可以，nextTick里面的代码会在DOM更新后执行
Vue.nextTick(function(){
    console.log(vm.$el.textContent) //可以得到'changed'
})

```



那么，Vue内部是如何实现的呢？

可以了解一下哇 [NextTick - 源码版 之 独立自身 ](https://mp.weixin.qq.com/s?__biz=MzUxNjQ1NjMwNw==&mid=2247484373&idx=1&sn=4649539af29f75a060e5ab5bff2e8a97&chksm=f9a669c9ced1e0df91d06e9d06144c9576a300ec4e63f6052b60b67123d16a756f9123377ac3&scene=21#wechat_redirect)













































