/**
 * 模板解析器 
 * 作用：
 * 1、解析模板指令，初始化视图
 * 2、添加订阅者，绑定更新函数
 */

function Compile (vm) {
    this.vm = vm
    this.el = vm.$el
    this.fragment = null
    this.init()
}

Compile.prototype = {
    init: function () {
        this.fragment = this.nodeFragment(this.el)
        this.compileNode(this.fragment)
        this.el.appendChild(this.fragment)  // 解析完成添加到元素中
    },
    nodeFragment: function (el) {
        const fragment = document.createDocumentFragment()  // 新建一个空的documentFragment
        let child = el.firstChild
        // 将子节点全部移动到文档片段中
        // TODO why 
        while (child) {
            fragment.appendChild(child)
            child = el.firstChild
        }
        return fragment
    },
    compileNode: function (fragment) {
        let childNodes = fragment.childNodes;
        [...childNodes].forEach(node => {

            if (this.isElementNode(node)) {
                this.compile(node)
            }
            
            let text = node.textContent
            let reg = /\{\{(.*)\}\}/

            if (reg.test(text)) {
                let prop = reg.exec(text)[1]
                this.compileText(node, prop)    // 替换模板
            }

            if (node.childNodes && node.childNodes.length) {
                this.compileNode(node)
            }
        })
    },
    compile: function (node) {
        let nodeAttrs = node.attributes;
        [...nodeAttrs].forEach(attr => {
            let name = attr.name
            if (this.isDirective(name)) {
                let value = attr.value
                if (name === 'v-model') {
                    this.compileModel(node, value)
                }
            }
        })
    },
    compileModel: function (node, prop) {
        let val = this.vm.$data[prop]
        this.updateModel(node, val)

        new Watcher(this.vm, prop, (value) => {
            this.updateModel(node, value)
        })

        node.addEventListener('input', e => {
            let newVal = e.target.value
            if (val === newVal) {
                return
            }
            this.vm.$data[prop] = newVal
        })
    },
    compileText: function (node, prop) {
        let text = this.vm.$data[prop]
        this.updateView(node, text)
        new Watcher(this.vm, prop, value => {
            this.updateView(node, value)
        })
    },
    updateModel: function (node, value) {
        node.value = typeof value == 'undefined' ? '' : value
    },
    updateView: function (node, value) {
        node.textContent = typeof value === 'undefined' ? '' : value
    },
    isDirective: function (attr) {
        return attr.indexOf('v-') !== -1;
    },
    isElementNode: function (node) {
        return node.nodeType === 1
    },
    isTextNode: function (node) {
        return node.nodeType === 3
    }
}
