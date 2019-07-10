
/**
 * 给定一个 key 和一个 set 作为参数，给定上下文时调用它们。主要用于函数组合。
 * 使用闭包以存储的参数调用存储的 key 
 * @param {*} key 
 * @param  {...any} args 
 */

const call = (key, ...args) => context => context[key](...args);


let myCode = {
    /**
     * 编写一个程序将数组扁平化去并除其中重复部分数据，最终得到一个升序且不重复的数组
     */
    flats: () => {
        var arr = [ [1, 2, 2], [3, 4, 5, 5], [6, 7, 8, 9, [11, 12, [12, 13, [14] ] ] ], 10]

        // 1
        let arr2 = arr.toString().split(',').map(i => Number(i)).sort((pre, next) => pre - next)
        
        // 2
        arr2 = arr.flat(4).sort((pre, next) => pre - next)
        
        // 3
        arr2 = arr
        
        let result = [...new Set(arr2)]
        return result
    },
    /**
     * 生成一个长度为5的数组且元素的随机数在2-32间不重复的值
     */
    buildArray: () => {
        // 用递归算法实现1

        let arr = new Array(5)
        let i = 0

        function createRandom () {
            return Math.floor(Math.random() * 30 + 2)
        }

        function arrayRandom () {
            let num = createRandom()

            // 法1
            if (!arr[arr.length-1]) {
                if (!arr.includes(num)) {
                    arr[i++] = num
                }
                arrayRandom()
            } else {
                console.log('---' + arr)
            }

            // 法2
            // if (arr.length < 5) {
            //     if (!arr.includes(num)) {
            //         arr.push(num)
            //         arrayRandom()
            //     }
            // } else {
            //     console.log('---' + arr)
            // }
        }
        arrayRandom()
    },

    buildArray2: () => {
        // Set实现
        function createRandom () {
            return Math.floor(Math.random() * 30 + 2)
        }
        let arr = new Set()
        function arrayRandom () {
            if (arr.size < 5) {
                arr.add(createRandom())
                arrayRandom()
            } else {
                arr = [...arr]
                console.log('---' + arr)
            }
        }
        arrayRandom()
    },

    /**
     * 写一个方法去掉字符串中的空格
     */
    myTrim: (str) => {
        // 1 去除所有空格
        str = str.replace(/\s*/g, '')
        // 2去除所有空格
        str = str.split(' ').join('')


        // 1 去除开头空格
        str = str.replace(' ', '')
        // 2 去除开头空格
        str = str.replace(/^\s*/, '')


        // 1 去除结尾空格
        str = str.replace(/\s*$/, '')


        // 1 去除中间空格
        while(str.match(/\w\s+\w/)) {
            str = str.replace(/^\s*|\s*$/, '')
        }

        return str
    },

    /**
     * 去除字符串中最后一个指定的字符
     */
    delString: (str, delstr) => {
        // 1、利用substring
        // const index = str.indexOf(delstr)
        // return str.substring(0, index) + str.substring(index + 1)

        // 2、利用replace(str, '')只会替换首次出现的字符
        const result = str.split('').reverse().join('').replace(delstr, '').split('').reverse().join('')
        console.log(result)
        return result
    },

    /**
     * 统计某一字符或字符串在另一个字符串中出现的次数
     * str: 字符串
     * target: 目标字符
     */
    // 1
     countStr1: (str, target) => {
         // one 只能统计单个字符 LOW
        let obj = {}
        for (let i of str) {
            if (!obj[i]) {
                obj[i] = 1
            } else {
                obj[i]++
            }
        }
        let max = 0
        for (let j in obj) {
            if (j === target) {
                console.log(obj[j])
                if (obj[j] > max) {
                    max = obj[j] 
                }
            }
        }
        console.log(max)
     },

     // 2
     countStr2: (str, target) => {
        let count = 0
        const fn = (s) => {
            console.log(s)
            // if (s.match(target)) {
            // or
            if (s.includes(target)) {
                s = s.substr(s.indexOf(target) + target.length)
                count++
                fn(s)
            }
        }
        fn(str)
        console.log(count)
    },

    // 3
    countStr3: (str, target) => {
        const count = str.split(target).length - 1
        console.log(count)
        return count
    },

    /**
     * 写一个判断数据类型的方法
     * typeOf 返回 string number boolean function 
     * 
     * Object.prototype.toString.call() 
     * 返回 '[object Array]' '[object Object]' '[object Date]' '[object Regexp]' '[object Function]'
     */
    getType: (target) => {
        let type = Object.prototype.toString.call(target).replace(/\[object\s|\]/g, '')
        console.log(type)
    },

    // 常见的异步方法
    asyncFn: () => {
        // 1
        $('body').onclick = e => {
            console.log(e)
        }

        // 2
        document.querySelector('body').addEventListener('click', e => {
            console.log(e)
        })

        // 3
        setTimeout((e) => {
            console.log(e)
        }, 100)

        // 4
        $ajax('/url', res => {})
    },

    /**
     * 获取当前url查询字符串中的参数的方法
     */
    queryUrl: (url) => {
        const param = {};
        url.replace(/[?&](.*?)=([^&]*)/g, (m, $1, $2) => param[$1] = $2);
        return param;
    },

    /**
     * 返回到顶部的方法有哪些
     */
    toPageTop: () => {
        // 1
        window.location.href += '#'

        // 2
        document.documentElement.scrollTop = 0
    },

    /**
     * 判断字符串是否为回文字符串
     */
    isPalindrome: (str) => {
        // 忽略非字母数字字符，转成小写；反转字符串进行对比
        let strLower = str.replace(/[^a-zA-Z0-9]/g, '').toLowerCase()
        const isEq = strLower === strLower.split('').reverse().join('')
        return isEq
    },

    /**
     * (a == 1 && a == 2 && a == 3 )
     * (a === 1 && a == 2 && a === 3 )
     */
    equal: () => {
        // 宽松相等
        let a = {
            value: 0
        }
        a.valueOf = () => {
            return a.value += 1
        }
        console.log((a == 1 && a == 2 && a == 3)) 


        // 严格相等
        let value = 0
        Object.defineProperty(global || window, 'b', {
            get: function () {
                return value += 1
            }
        })
        console.log((b === 1 && b === 2 && b === 3)) 
    }
}

myCode.equal()

