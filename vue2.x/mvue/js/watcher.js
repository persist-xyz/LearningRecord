/**
 * watcher 订阅者 接收属性变化的通知，并触发自身update方法去更新视图
 * 作用：
 * 1、把watcher添加到Dep容器中，这里用到了监听器的get方法
 * 2、接收通知，执行update更新
 */
function Watcher (vm, prop, callback) {
    this.vm = vm
    this.prop = prop
    this.callback = callback
    this.value = this.get()
}

Watcher.prototype = {
    update: function () {
        const value = this.vm.$data[this.prop]  // 新值
        const oldVal = this.value   // 旧值
        if (value !== oldVal) {
            this.value = value
            this.callback(value)
        }
    },
    get: function () {
        // 存储订阅器
        Dep.target = this
        // 这里会触发监听器里的get方法
        const value = this.vm.$data[this.prop]
        Dep.target = null
        return value
    }
}

