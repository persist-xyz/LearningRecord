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
     */
    myCall: () => {
        
    },
    /**
     * 函数柯里化
     */
    myCurry: () => {

    },
    /**
     * 实现一个 instanceof 
     */
    myInstanceof: () => {
        
    },
    /**
     * 实现一个 浅拷贝 
     */
    mycopy: () => {
        
    },
    /**
     * 实现一个 深拷贝 
     */
    myDeepCopy: () => {
        
    },
    /**
     * 实现一个 函数节流
     */
    myThrottle: () => {
        
    },
    /**
     * 实现一个 函数防抖
     */
    myDebounce: () => {
        
    }
}