/**
 * 监听器
 * 作用：
 * 监听每个属性，变化时通知 watcher订阅者去更新视图
 * 这个过程会有很多订阅者watcher，所有需要一个容器Dep去存放
 */

function observer (data) {
    // 如果不是对象，则跳出递归
    if (!data || typeof data !== 'object') {
        return
    }
    Object.keys(data).map(key => {
        defineReactive(data, key, data[key])
    })
}

function defineReactive (data, key, value) {
    // 递归调用，监听所有属性
    observer(value)
    let dep = new Dep()
    Object.defineProperty(data, key, {
        get: function () {
            // 为了不重复添加
            if (Dep.target) {
                dep.addSub(Dep.target)
            }
            return value
        },
        set: function (newValue) {
            if (value !== newValue) {
                value = newValue
                dep.notify()
            }
        }
    })
}

function Dep () {
    this.subs = []
}
Dep.prototype = {
    addSub: function (sub) {
        this.subs.push(sub)
    } ,
    notify: function () {
        console.log('监听到了属性变化，需要通知watcher更新视图啦')
        this.subs.map(sub => {
            sub.update()
        })
    }
}

Dep.target = null