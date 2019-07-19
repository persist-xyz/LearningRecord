> 对这两个的定义一直是理解之后又忘记，所以就记下来方便下次查看



### 防抖（debounce）

概念：在指定的时间内只执行一次回调函数，若在指定时间内又触发了该事件，则会基于此刻重新计算回调函数的执行时间。



> 以我们生活中乘车刷卡的情景举例，只要乘客不断地在刷卡，司机师傅就不能开车，乘客刷卡完毕之后，司机会等待几分钟，确定乘客坐稳再开车。如果司机在最后等待的时间内又有新的乘客上车，那么司机等乘客刷卡完毕之后，还要再等待一会，等待所有乘客坐稳再开车。



```javascript
// fn是我们需要包装的事件回调, delay是每次推迟执行的等待时间
function debounce(fn, delay) {
  let timer = null
  return function () {
    let context = this, args = arguments
    timer && clearTimeout(timer)
    timer = setTimeout(function () {
      fn.apply(context, args)
    }, delay)
  }
}

// 用debounce来包装scroll的回调
const better_scroll = debounce(() => console.log('触发了滚动事件'), 1000)
document.addEventListener('scroll', better_scroll)

```





### 节流（throttle）

概念：预先设定一个执行周期，只有触发事件间隔大于等于这个执行周期，才会执行回调函数



> 类比到生活中的水龙头，拧紧水龙头到某种程度会发现，每隔一段时间，就会有水滴流出。



```javascript
// 1、 使用setTimeout实现
function throttle (fn, delay) {
  let flag = false
  if (!flag) {
    return function() {
      let context = this, args = arguments
      flag = setTimeout(() => {
        fn.apply(context, args)
        flag = true
      }, delay)
    }
  }
}


// 2、 通过比较两次时间戳的间隔是否大于等于我们事先指定的时间来决定是否执行事件回调
function throttle (fn, delay) {
  let start = 0
  return function() {
  	if (now - start >= delay) {
      let context = this, args = arguments, now = new Date()
      fn.apply(context, args)
			start = now
    }
  }
}

```



对比两种实现方式，可以发现：

1、定时器的方式，只有在第一次触发回调的时候才会执行，如果最后一次触发与前一次触发时间间隔小于`delay`，则在`delay`之后`fn`也会执行。

2、时间戳的方式，在页面加载的时候就会开始计时，如果页面加载时间大于`delay`，第一次触发事件回调就会立即执行，不会延迟`delay`，如果最后一次触发与前一次触发时间间隔小于`delay`，`fn`并不会执行。



所以我们将两者结合起来就可以实现，首次触发事件可以执行，最后的时间间隔小于`delay`也可以执行。



```javascript
function throttle (fn, delay) {
  let start = 0, timer = null
  
  return function() {
    let context = this, args = arguments, now = new Date()
    
    // 计算剩余时间
    let remaining = delay - (now - start)
    
    // 如果时间间隔超出了我们设定的时间间隔阈值，那就不等了，无论如何要反馈给用户一次响应
    if (remaining <= 0) {
      timer && clearTimeout(timer)
      timer = null
			fn.apply(context, args)
      start = now
      
    } else {
      // 如果时间间隔小于我们设定的时间间隔阈值，则为本次触发操作设立一个新的定时器
			timer = setTimeout(() => {
        fn.apply(context, args)
      }, delay)
    }
    
  }
}

```



### 应用场景

函数防抖是某一段时间内只执行一次，而函数节流是间隔时间执行

- 函数防抖
  - 实时搜索，拖拽
- 函数节流
  - 窗口调整（调整大小），页面滚动（滚动），抢购时疯狂点击（鼠标按下）





### underscore实现

**1、_.throttle函数**

```javascript
_.throttle = function(func, wait, options) {
    /* options的默认值
     *  表示首次调用返回值方法时，会马上调用func；否则仅会记录当前时刻，当第二次调用的时间间隔超过wait时，才调用func。
     *  options.leading = true;
     * 表示当调用方法时，未到达wait指定的时间间隔，则启动计时器延迟调用func函数，若后续在既未达到wait指定的时间间隔和func函数又未被调用的情况下调用返回值方法，则被调用请求将被丢弃。
     *  options.trailing = true; 
     * 注意：当options.trailing = false时，效果与上面的简单实现效果相同
     */
    var context, args, result;
    var timeout = null;
    var previous = 0;
    if (!options) options = {};
    var later = function() {
      previous = options.leading === false ? 0 : _.now();
      timeout = null;
      result = func.apply(context, args);
      if (!timeout) context = args = null;
    };
    return function() {
      var now = _.now();
      if (!previous && options.leading === false) previous = now;
      // 计算剩余时间
      var remaining = wait - (now - previous);
      context = this;
      args = arguments;
      // 当到达wait指定的时间间隔，则调用func函数
      // 精彩之处：按理来说remaining <= 0已经足够证明已经到达wait的时间间隔，但这里还考虑到假如客户端修改了系统时间则马上执行func函数。
      if (remaining <= 0 || remaining > wait) {
        // 由于setTimeout存在最小时间精度问题，因此会存在到达wait的时间间隔，但之前设置的setTimeout操作还没被执行，因此为保险起见，这里先清理setTimeout操作
        if (timeout) {
          clearTimeout(timeout);
          timeout = null;
        }
        previous = now;
        result = func.apply(context, args);
        if (!timeout) context = args = null;
      } else if (!timeout && options.trailing !== false) {
        // options.trailing=true时，延时执行func函数
        timeout = setTimeout(later, remaining);
      }
      return result;
    };
  };
```



**2.、_.debounce函数**

```javascript
_.debounce = function(func, wait, immediate) {
    // immediate默认为false
    var timeout, args, context, timestamp, result;

    var later = function() {
      // 当wait指定的时间间隔期间多次调用_.debounce返回的函数，则会不断更新timestamp的值，导致last < wait && last >= 0一直为true，从而不断启动新的计时器延时执行func
      var last = _.now() - timestamp;

      if (last < wait && last >= 0) {
        timeout = setTimeout(later, wait - last);
      } else {
        timeout = null;
        if (!immediate) {
          result = func.apply(context, args);
          if (!timeout) context = args = null;
        }
      }
    };

    return function() {
      context = this;
      args = arguments;
      timestamp = _.now();
      // 第一次调用该方法时，且immediate为true，则调用func函数
      var callNow = immediate && !timeout;
      // 在wait指定的时间间隔内首次调用该方法，则启动计时器定时调用func函数
      if (!timeout) timeout = setTimeout(later, wait);
      if (callNow) {
        result = func.apply(context, args);
        context = args = null;
      }

      return result;
    };
  };
```





参考：

[函数节流（throttle）与函数去抖（debounce）](https://www.cnblogs.com/fzygun/p/8717477.html)

[十分钟学会防抖和节流](https://www.cnblogs.com/zhuanzhuanfe/p/10633019.html)











