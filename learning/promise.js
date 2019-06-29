
/**
 * 依次调用ajax1，ajax2，ajax3，且往下传递参数
 */

const promise = {
    // step1
    one: () => {
        const ajax1 = () => {
            return new Promise((resolve, injected) => {
                setTimeout(() => {
                    resolve('this is ajax1---')
                }, 500)
                // or 
                // setTimeout(resolve, 500, 11)
            })
        }

        const ajax2 = (res1) => {
            return new Promise((resolve, injected) => {
                setTimeout(() => {
                    console.timeEnd('time')
                    resolve('this is ajax2---' + res1)
                }, 1000)
                // or
                // setTimeout(resolve, 1000, 22 + res1)
            })
        }

        const ajax3 = (res2) => {
            return new Promise((resolve, injected) => {
                setTimeout(() => {
                    resolve('this is ajax3---' + res2)
                }, 1500)

                // or
                // setTimeout(resolve, 1500, 33 + res2)
            })
        }

        // 按顺序调用 但使用不了前一个执行结果的值
        /* ajax1().then(ajax2).then(ajax3).then(res3 => {
            console.log(new Date(), 'end--', res3)
        }) */


        /**
         * 按顺序调用 可以使用前一个执行结果的值
         * 
         * promise中的错误是不会影响外层的运行，
         * promise内部异常只能通过rejected回调或者catch来捕获
         * 
         * try{}catch(){} 只能捕获同步的异常，捕获不到异步中产生的错误
         * 
         * promise规定，如果一个错误被rejected函数处理了，那么promise将从这个异常状态中恢复出来，
         * 也就是会继续执行后面的then回调
         * 但是我们通常都是希望遇到错误之后停止向下执行，这种情况不符合我们预期
         * 
         * 所以我们的做法是：不用rejected函数处理，统一在catch中处理错误
         * 
         */
        console.time('time')
        /* ajax1()
        .then(res1 => {
            return ajax2(res1)
        })
        .then(res2 => {
            return ajax3(res2)
        }, (err => {
            console.log('ajax2--err-' + err)
        }))
        .then(res3 => {
            console.log(new Date(), '33--', res3)
        }, (err => {
            console.log('ajax3--err-' + err)
        }))
        .catch(err => {
            console.log('catch--' + err)
        }) */
        
        // 值穿透，输出 'this is ajax1---'
        ajax1().then('aaa').then(res => {
            console.log(res)
        })


        // 只有这个promise对象数组全部都变成FulFilled状态才会继续后面的操作
        // Promise.all([ajax1(), ajax2(), ajax3()]).then(res => console.log(res))

        // 只要这个promise对象数组中有一个的状态变成FulFilled或者Rejected状态，
        // 都会继续后面的操作，其他promise也会继续执行，但是执行结果将会被丢弃
        // Promise.race([ajax1(), ajax2(), ajax3()]).then(res => console.log(res))
    },

    // step2
    two: () => {
        const myAjax = (method, url, data) => {
            return new Promise((resolve, injected) => {
                const XHT = new XMLHttpRequest()
                XHT.open(method, url)
                XHT.onreadystatechange = (request => {
                    if (XHT.readyState === 4) {
                        if (XHT.status === 200) {
                            resolve(XHT.response)
                        } else {
                            injected(XHT.status)
                        }
                    }
                })
                XHT.send(data)
            })
        }
        
        myAjax('get', 'https://www.baidu.com').then(res => {
            console.log(res)
        })        
    }
}

promise.one()




