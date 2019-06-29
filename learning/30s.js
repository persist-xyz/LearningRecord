
/**
 * 给定一个 key 和一个 set 作为参数，给定上下文时调用它们。主要用于函数组合。
 * 使用闭包以存储的参数调用存储的 key 
 * @param {*} key 
 * @param  {...any} args 
 */

const call = (key, ...args) => context => context[key](...args);


let myCode = {

    /**
     * 数组长度为5且元素的随机数在2-32间不重复的值
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
     */
     countStr: (str, otherstr) => {
         let obj = {}
        for (let i of otherstr) {
            if (!obj[i]) {
                obj[i] = 1
            } else {
                obj[i]++
            }
        }
        // console.log(obj)
        let max = 0
        for (let j in obj) {
            if (j === str) {
                console.log(obj[j])
                if (obj[j] > max) {
                    max = obj[j] 
                }
            }
        }
        console.log(max)
     }
}

myCode.countStr('wg', ' rrefer wwgegewwvfty ')
