const a = {
    proto: () => {
        function Foo (name) {
            this.name = name
        }
        let foo = new Foo('xyz')
        console.log(foo)
        
        // 每个函数在定义的时候都有一个prototype属性，该属性是一个指针，称之为原型对象
        // 原型对象上默认有一个constructor属性，指向该原型对象对应的构造函数
        console.log(Foo.prototype.constructor === Foo)
    
        // 实例对象内部有一个__proto__属性，指向该实例对象对应的构造函数的原型对象
        console.log(foo.__proto__ === Foo.prototype)
        
        console.log(Foo.prototype === foo)
        console.log(Foo.prototype.__proto__ === Object.prototype)
    },
    /**
     * 实现一个new
     * 1、创建一个空对象
     * 2、空对象的内部指针__proto__指向目标构造函数的原型对象
     * 3、改变this指向
     * 4、返回这个新对象
     */
    myNew: (fn, ...args) => {
        let obj
    
        obj = Object.create({})
        obj.__proto__ = fn.prototype
    
        // or 
        // obj = Object.create(fn.prototype)
    
        // or
        /* obj = {'__proto__': fn.prototype}
        fn.apply(obj, args) */

        // 继承父类的属性
        let result = fn.apply(obj, args)
    
        return Object.prototype.toString.call(result) === '[Object object]' ? result : obj;
    },
    /**
     * 测试 myNew 
     */
    testMyNew: () => {
        function Foo() {}
        let a = myCode.myNew(Foo)
        console.log(a instanceof Foo)
        console.log(a.__proto__ === Foo.prototype)
        console.log(Foo === Foo.prototype.constructor)
    },
    /**
     * 实现一个JSON.stringify()
     */
    myStringify: (obj) => {
        let str

        return str
    },
    /**
     * 实现一个JSON.parse()
     */
    myParse: (str) => {
        let obj
        
        return obj
    },
    /**
     * 实现一个call / apply
     * fn.call(that, ...argus)
     * fn.apply(that, argus)
     */
    myCall: (that = window) => {
        
        let [that, argus] = [...arguments];

        !that ? (typeof window === 'undefined' ? global : window) : that

        that.fuc = this

        // call
        let result = that.fuc(...argus)

        // apply
        if (argus) {
            result = that.fuc(...argus)
        } else {
            result = that.fuc()
        }

        delete that.fuc
        return result
    },
    /**
     * 函数柯里化
     */
    myCurry: () => {

    },
    /**
     * 实现一个 instanceof 
     * 验证某个值 left 的构造函数是否是目标类型 right
     */
    myInstanceof: (left, right) => {
        if (left.__proto__ === right.prototype) {
            return true
        } 
        return false
    },
    /**
     * 实现一个 浅拷贝 
     * 只进行一层对象的复制，当属性对应的值是应用类型时，复制的是其引用地址，修改一个值另一个也会变更
     */
    mySimpleCopy: () => {
        let obj = {
            a: 1,
            b: [2,3,4],
            c: {
                d: 5
            }
        }
        let copyObj = {}
        for (const i in obj) {
            copyObj[i] = obj[i]
        }
        console.log(copyObj)    // { a: 1, b: [ 2, 3, 4 ], c: { d: 5 } }
        obj.a = 11
        obj.b = [22]
        obj.c.d = 55
        console.log(copyObj)    // { a: 1, b: [ 2, 3, 4 ], c: { d: 55 } }
        console.log(obj)    // { a: 11, b: [ 22 ], c: { d: 55 } }
        return copyObj
    },
    /**
     * 实现一个 深拷贝 
     * 递归遍历每一个属性并复制，开辟新的栈存储，完全隔离互不影响
     */
    myDeepCopy: () => {
        let obj = {
            a: 1,
            b: [2,3,4],
            c: {
                x: 5
            },
            d: function(){},
            e: /^$/g,
            f: new Date()
        }

        // 方法一
        // 缺陷：会忽略Symbol undefined值；属性值为函数时或者正则表达式，都无法拷贝；不能正确处理Date类型数据
        // obj = JSON.parse(JSON.stringify(obj))

        // 方法二
        function copy (obj) {
            let cloneObj = Array.isArray(obj) ? [] : {}

            if (obj && typeof obj === 'object') {
                for (const i in obj) {
                    cloneObj[i] = obj[i]
                    if (obj[i] && typeof obj[i] === 'object') {
                        cloneObj[i] = copy(obj[i])
                    } else {
                        cloneObj[i] = obj[i]
                    }
                }
            }
            return cloneObj
        }
        let copyObj3 = copy(obj)

        console.log(copyObj3)
        obj.c.x = 55
        console.log(copyObj3)
    },
    /**
     * 实现一个 函数节流
     * 先设定一个执行周期，这个周期内只执行一次事件
     */
    myThrottle: (fn, ms) => {
        let start = 0, timer = null
        
        return function () {
            let that = this, argu = arguments
            let now = new Date()
            let remaining = ms - (now - start)
            // 若下一次触发事件的时间间隔大于设定的时间，则立即触发一次
            if (remaining < 0) {
                timer && clearTimeout(timer)
                timer = null
                fn.call(that, ...argu)
                start = now
            } else {
                // 否则等待触发
                timer = setTimeout(() => {
                    fn.call(this, ...argu)
                }, ms)
            }
        }
    },
    /**
     * 实现一个 函数防抖
     * 在指定时间内只触发一次回调，若下一次调用的时间间隔小于这个指定时间，则以此刻开始重新计算回调函数的执行时间
     */
    myDebounce: (fn, ms) => {
        let timer = null
        return function () {
            let that = this, argu = arguments
            timer && clearTimeout(timer)
            timer = setTimeout(() => {
                fn.call(that, ...argu)
            }, ms)
        }
    }
}

// console.log(a.myInstanceof('', Number))
a.myDeepCopy()