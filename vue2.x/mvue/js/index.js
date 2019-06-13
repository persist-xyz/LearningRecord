
function Mvue (options, prop) {
    this.$data = options.data
    this.$option = options
    this.$prop = prop
    this.$el = document.querySelector(options.el)

    // 数据代理
    Object.keys(this.$data).forEach(key => {
        this.proxyData(key)
    })

    this.init()
}

Mvue.prototype = {
    init: function () {
        observer(this.$data)
        new Compile(this)
    },
    proxyData: function (key) {
        Object.defineProperty(this, key, {
            get: function () {
                return this.$data[key]
            },
            set: function (value) {
                this.$data[key] = value
            }
        })
    }
} 


