```javascript
// 1
[].indexOf.call(lis, e.target)




```



call、apply、bind 实现

```javascript
// call
Function.prototype.newCall = function (context, ...parameter) {
  if (typeof context === 'object') {
    context = context || window
  } else {
    context = Object.create(null)
  }
  let fn = Symbol()
  context.fn = this
  context.fn(...parameter)
  delete context.fn
}

// apply
Function.prototype.newApply = function (context, parameter) {
  if (typeof context === 'object') {
    context = context || window
  } else {
    context = Object.create(null)
  }
  let fn = Symbol()
  context.fn = this
  context.fn(...parameter)
  delete context.fn
}

// bind
Function.prototype.newBind = function (context, ...parameter) {
  let me = this
  return function(...argus) {
    return me.call(context, ...parameter, ...argus)
  }
}

// test
let person = {
  name: 'xyz'
}
function say (age, height) {
  console.log(this.name, age, height)
}
// test newCall
say.newCall(person, 25, 170)	// xyz 25 170

// test newApply
say.newApply(person, [25, 170])	// xyz 25 170

// test newBind
let bindSay = say.newBind(person, 25)
bindSay(170)	// xyz 25 170
```



