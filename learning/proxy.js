
const myGenerator = {
    p: function () {
        var p = new Proxy({}, {
            get: function (target, key, receiver) {
                console.log(`getting ${key}`)
                return Reflect.get(target, key, receiver)
            },
            set: function (target, key, value, receive) {
                console.log(`setting ${key} ${value}`)
                return Reflect.set(target, key, value, receive)
            }
        })
        p.name = 'xyz'
        console.log('------')
    },
    f: function() {
        /**
         * Generator
         * @param {*} x 
         */
        function *foo (x) {
            yield(x + 1)
            yield(x + 3)
            return 99
        }

        let it = foo(1)
        console.log(it)  // Object [Generator] {}
        console.log(it.next(2))
        console.log(it.next(3))
        console.log(it.next(4))
    },
    x: function () {
        function *X () {
            const a = yield(1)
            console.log('a', a) // a 111

            const b = yield(2)
            console.log('b', b) // b 222

            const c = yield(3)
            console.log('c', c) // c 333
        }

        const y = X()
        console.log(y)  // Object [Generator] {}
        
        y.next()    // { value: 1, done: false }
        y.next(111) // { value: 2, done: false }
        y.next(222) // { value: 3, done: false }
        y.next(333) // { value: undefined, done: true }
    }
}

myGenerator.x()




