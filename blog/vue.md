#### 1、Vue 生命周期

- beforeCreate： 做了部分参数初始化，如果有相同的参数，会进行合并，此阶段 el data都是undefined
- created： 初始化了props data methods watch，此阶段有了data，还没有el
- beforeMount：检查是否存在el属性，若存在则进行渲染dom操作，此阶段$el和data都初始化了，但是dom还是虚拟节点，数据还未替换
- mounted：实例话watcher，渲染dom，实例挂载完成，数据成功渲染
- beforeUpdate：数据更新时执行
- updated：检查watcher列表，如果存在要更新的watcher，则执行updated
- beforeDestroy：检查是否已卸载，如果已卸载，则直接return
- destroyd：销毁所以的钩子函数


#### 2、Vue的双向数据绑定原理是什么？

答：vue.js 是采用数据劫持 + 发布者-订阅者模式的方式，通过Object.defineProperty()来劫持各个属性的setter，getter，在数据变动时发布消息给订阅者，触发相应的监听回调。

具体步骤：

第一步：需要observe的数据对象进行递归遍历，包括子属性对象的属性，都加上 setter和getter
这样的话，给这个对象的某个值赋值，就会触发setter，那么就能监听到了数据变化

第二步：compile解析模板指令，将模板中的变量替换成数据，然后初始化渲染页面视图，并将每个指令对应的节点绑定更新函数，添加监听数据的订阅者，一旦数据有变动，收到通知，更新视图

第三步：Watcher订阅者是Observer和Compile之间通信的桥梁，主要做的事情是:
1、在自身实例化时往属性订阅器(dep)里面添加自己
2、自身必须有一个update()方法
3、待属性变动dep.notice()通知时，能调用自身的update()方法，并触发Compile中绑定的回调，则功成身退。

第四步：MVVM作为数据绑定的入口，整合Observer、Compile和Watcher三者，通过Observer来监听自己的model数据变化，通过Compile来解析编译模板指令，最终利用Watcher搭起Observer和Compile之间的通信桥梁，达到数据变化-> 视图更新；视图交互变化(input) -> 数据model变更的双向绑定效果

#### 2、如何理解vue中MVVM模式？

MVVM全称是Model-View-ViewModel；vue是以数据为驱动的，一旦创建dom和数据就保持同步，每当数据发生变化时，dom也会变化。

DOMListeners和DataBindings是实现双向绑定的关键。

DOMListeners监听页面所有View层DOM元素的变化，当发生变化，Model层的数据随之变化；

DataBindings监听Model层的数据，当数据发生变化，View层的DOM元素随之变化。

#### 3、vue中<keep-alive>的作用？

把切换出去的组件保留在缓存中，可以保留组件的状态或者避免重新渲染

#### 4、vuex

>  vue框架中的状态管理

有五种属性，分别是 State、 Getter、Mutation 、Action、 Module

state => 基本数据(数据源存放地) 

getters => 从基本数据派生出来的数据 

mutations => 提交更改数据的方法，同步！
在页面中触发时使用this.$store.commit('mutationName') 触发Mutations方法改变state的值

actions => 像一个装饰器，包裹mutations，使之可以异步
直接触发方式是 this.$store.dispatch(actionName)

modules => 模块化Vuex

#### 5、v-for中key的作用？

> key是给每一个vNode的唯一ID，可以依靠key，更准确、更快的找到oldVnode中对应的vNode节点

带上key就不会就地复用，所有更准确；

利用key的唯一性生成map对象来获取对应节点比遍历节点更快。

#### 6、vue的虚拟dom？
可以理解成节点描述对象，通过 createElement 方法能将 VNode 渲染成 dom 节点

虚拟的DOM的核心思想是：对复杂的文档DOM结构，提供一种方便的工具，进行最小化地DOM操作

虚拟DOM的最终目标是将虚拟节点渲染到视图上
#### 7、Virtual DOM算法，简单总结下包括几个步骤：

只在同级vnode间做diff，递归地进行同级vnode的diff，最终实现整个DOM树的更新。

1、用JS对象描述出DOM树的结构，然后用这个描述树去构建真正的DOM，并插入到文档中

2、当有数据状态变更时，重新构建一个新的dom树，然后用新的树与旧的树进行比较，记录两棵树的差异

3、把这个差异应用到所构建的真正DOM树上，视图也就更新了


#### 8、为何需要Virtual DOM？
- 具备跨平台的优势
- 操作 DOM 慢，js运行效率高
- 提升渲染性能



#### 9、你对Vue.js的template编译的理解？

首先通过Compile编译器把template编译成AST语法树，
然后AST会经过转化得到render函数，执行render函数返回VNode，VNode是Vue的虚拟DOM节点，里面包括Tag attrs children 等，接着再将VNode转化成真实DOM渲染到视图

模板 → 渲染函数 → 虚拟DOM树 → 真实DOM


#### 10、scss是什么？在vue.cli中的安装使用步骤是？有哪几大特性？

答：css的预编译。

使用步骤：

第一步：用npm 下三个loader（sass-loader、css-loader、node-sass）
第二步：在build目录找到webpack.base.config.js，在那个extends属性中加一个拓展.scss
第三步：还是在同一个文件，配置一个module属性
第四步：然后在组件的style标签加上lang属性 ，例如：lang=”scss”

有哪几大特性:

1、可以用变量，例如（$变量名称=值）；
2、可以用混合器，例如（）
3、可以嵌套

#### 11、组件之间的传值通信？

- props和$emit
- 特性绑定$attrs和$listeners
```
// app.vue
<child-com1 :name="name" :age="18" :gender="女" title="程序员成长指北"></child-com1>


// childCom1.vue
<child-com2 v-bind="$attrs"></child-com2>

props: {
  name: String // name作为props属性绑定
},
created() {
 	console.log(this.$attrs); // { "age": "18", "gender": "女", "title": "程序员成长指北" }
}


// childCom2.vue
props: {
    age: String
},
created() {
  console.log(this.$attrs);  // { "name": "zhang", "gender": "女", "title": "程序员成长指北" }
}

```

- 中央事件总线 Events Bus


```javascript
// 1 声明一个空的vue对象并导出供其他模块使用
// event-bus.js
export const EventBus = new Vue()

// A 触发事件
import {EventBus} from './event-bus.js'
 EventBus.$emit('addition', {
   num: this.num++
 })

// B 监听事件
import {EventBus} from './event-bus.js'
EventBus.$on('addition', params => {
  console.log(params.num)
})
```
- 依赖注入：provide和inject，父组件中通过provider来提供变量，然后在子组件中通过inject来注入变量

```
// 父组件
name: "Parent",
provide: {
    for: "demo"
},
components:{
    childOne
}

// 子组件
name: "childOne",
inject: ['for'],
data() {
    return {
        demo: this.for
    }
},
components: {
    childtwo
}
```

- 子组件引用：ref和$refs
- 父链和子索引：$parent和$children
- Vuex




#### 12、vue-router有哪几种导航钩子？    

三种
- 全局导航钩子：router.beforeEach(to,from,next)，
作用：跳转前进行判断拦截
- 组件内的钩子 beforeRouterEnter beforeRouterLeave
- 单独路由独享组件 beforeEach


#### 13.babel是如何将es6代码编译成es5的

1. 配置.balbelrc文件

```
 {
    "presets": [
      "es2015",
      "react",
      "stage-2"
    ],
    "plugins": []
  }
```

2. Babel提供babel-cli工具，用于命令行转码。 

```
$ npm install --global babel-cli

{
  // ...
  "devDependencies": {
    "babel-cli": "^6.0.0"
  },
  "scripts": {
    "build": "babel src -d lib"
  },
}

```

#### 14、Object.defineProperty和proxy的区别

Object.defineProperty缺陷：

第一个无法监听数组的变化；

>  vue支持的八种监听数组变化的方法其实也是作者自己hack解决的
>
>  `const aryMethods = ['push', 'pop', 'shift', 'unshift', 'splice', 'sort', 'reverse'];`

第二个只能劫持对象的属性，必须深度遍历每个对象；



Proxy优势：

可以直接监听整个对象而非属性，所以不需遍历，并返回一个新对象；

可以直接监听数组的变化；

劣势就是兼容性问题。



#### 15、观察者模式和发布订阅模式的区别

- 观察者模式：
  - 被观察者和订阅者是互相依赖的关系，被观察者发生变化时，所有的订阅者都会收到通知



- 发布订阅模式：
  - 被观察者和订阅者是不直接关联的，而是通过一个消息代理进行通信，发布者发布一个通知，只有特定类型的订阅者才会收到通知



#### 16、为什么data、props、method中属性名不能重复？

都是要挂载到vm对象上的，会被覆盖



#### 17、为什么在method、mounted中可以直接使用this.data获取data中的数据？

在初始化方法proxy(vm,  '_data', key) 中 对vm上对应的data做了一层数据代理， 

```javascript
Object.defineProperty(target, key, {
  get = function () {
  	return this[_data].key	// 直接在_data对象中找到对应的key，返回对应的值
	},
  set = function () {}
})
```



#### 18、computed 与 watcher的区别

都是VUE对监听器的实现，即可以用来监听数据，进而进行操作

computed
- 是计算属性，并将值挂载到vm上
- 只有依赖的数据发生变化或第一次访问computed属性，才会重新计算
- 主要是对同步任务的处理，适用于一个数据被多个数据影响

watch
- 是监听已经存在且已挂载到vm上的数据
- 只要watch的值发生变化就会执行函数
- 适用于一个数据影响多个数据，做一些开销比较大的复杂逻辑



#### 19、为什么data必须要用方法返回一个对象
若直接返回一个对象，则当这个组件被复用时，所有的组件实例将会共享这个data，也就是一个地方改变，另外所有组件内的data都将同时变化
而如果使用函数返回一个对象，每次重用组件都将会返回一个新的对象，引用地址不同，就不会出现这个问题




#### 20、项目中遇到的难点有哪些？

1、对于v-html动态生成的内容，父节点需要使用深度选择器 /deep/ 

2、props可以直接引入父组件中的数据，若想操作该数据，需要存储一下data或computed再进行使用，否则会报错

3、接入银联支付，不支持在vue文件中唤起

4、本地调用接口的跨域问题：proxyTable设置代理，使用nginx反向代理

5、设置nav样式排版时，需求是每个tab等距，超出一行，显示滚动条。使用align-content:space-between;时，超出一行的情况下，会滚动不回去，看不到前几个；使用align-content:space-around时，最后一个tab会贴到边上。

6、设置标题，

```vue
// 单页面的title设置
import VueWechatTitle from 'vue-wechat-title'

<router-view v-if="isRouterAlive" v-wechat-title='$route.meta.title' />

```

7、列表页滑动加载下一页，详情页滑动也会触发列表页的滚动事件

解决：在列表页的beforeRouteEnter 中初始化routerLeave = true，
beforeRouteLeave中判断下一页地址，若是详情页，则置变量routerLeave = false;，
再在触发加载下一页的地方加上这个条件