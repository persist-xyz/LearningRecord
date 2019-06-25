
/**
 * require: 代码执行时，立即输出 0，之后每隔 1 秒依次输出 1,2,3,4，循环结束后在大概第 5 秒的时候输出 5
 * 
 */

let setTimeoutFn = {
    // step1 
    // output: 5, (1s) 5,5,5,5,5
    fn1: () => {
        for (var i = 0; i < 5; i++) {
            setTimeout(function() {
                console.log(new Date, i)
            }, 1000)
        }
        console.log('fn1--' + new Date, i)
    },

    // step2
    // output:  5, (1s) 0,1,2,3,4
    fn2: () => {
        for (var i = 0; i < 5; i++) {
            setTimeout(function(i) {
                console.log(new Date, i)
            }, 1000, i)
        }
        console.log('fn2--' + new Date, i)
    },

    // step3
    // output:  5, (1s) 0,1,2,3,4
    fn3: () => {
        for (var i = 0; i < 5; i++) {
            output(i)
        }
        function output (i) {
            setTimeout(function() {
                console.log(new Date, i)
            }, 1000)
        }
        console.log('fn3--' + new Date, i)
    },

    // step4
    //  output: （1s） 0,1,2,3,4
    fn4: () => {
        for (let i = 0; i < 5; i++) {
            setTimeout(function() {
                console.log(new Date, i)
            }, 1000)
        }
        // 此处i报错 let 声明 i 是局部作用域
        // console.log('fn4--' + new Date, i)
    },

    // step5 使用Promise
    // output: 0,(1s) 1,(1s) 2,(1s) 3, (1s)4, (1s)5
    fn5: () => {
        let task = []
        for (var i = 0; i < 5; i++) {
            task.push(output(i))
        }
        function output (i) {
            return new Promise((resolve, reject) => {
                setTimeout(() => {
                    console.log(new Date, i)
                    resolve()
                }, i * 1000)
            })
        }
        Promise.all(task).then(() => {
            setTimeout(() => {
                console.log('fn5--' + new Date, i)
            }, 1000)
        })
    },

    // step6
    // async/await
    fn6: () => {
        const sleep = (timeountMS) => new Promise((resolve) => {
            setTimeout(resolve, timeountMS);
        })

        (async () => {
            for (var i = 0; i < 5; i++) {
                await sleep(1000)
                console.log('fn6--' + new Date, i)
            }
            await sleep(1000)
            console.log('--fn6--' + new Date, i)
        })()

       

        // function sleep (i) {
        //     return new Promise((resolve, reject) => {
        //         setTimeout(() => {
        //             console.log(new Date, i)
        //             resolve()
        //         }, i * 1000)
        //     })
        // }

        

    }
}

setTimeoutFn.fn6()




