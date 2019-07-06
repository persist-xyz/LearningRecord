#### Vue 生命周期

<img src="https://assets.mgzf.com/appimg/ef301bdfe5e3f7c84dfa2687bb48a437.png" width=1500 />



<img src="https://assets.mgzf.com/appimg/f28dce6e4b95b0522473527a30820502.png" width=1200 />



#### 1、Vue的双向数据绑定原理是什么？

1.实现一个监听器Observer，用来劫持并监听所有属性，如果有变动的，就通知订阅者。

2.实现一个订阅者Watcher，可以收到属性的变化通知并执行相应的函数，从而更新视图。

3.实现一个解析器Compile，可以扫描和解析每个节点的相关指令，并根据初始化模板数据以及初始化相应的订阅器

------

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





#### 3、vue中keepAlive的作用？遇到的问题？

把切换出去的组件保留在缓存中，可以保留组件的状态避免重新渲染

使用了keepAlive的页面，首次进入页面时，钩子触发是 created - mounted- activated，退出页面触发deactivated；再次进页面只触发activated。



后一个页面滚动会触发前一个keepAlive页面的滚动事件，并且无法销毁

解决：

在导航路由beforeRouteLeave

```javascript
let routerLeave = false

beforeRouteEnter (to, from, next) {
  routerLeave = true;
  next()
},

beforeRouteLeave (to, from, next) {
  routerLeave = true;
  if(to.name === 'detail') {
  	routerLeave = false;
  }
  next();
}
// 加载下一页的地方，加上判断条件
if (this.listReachBottom && routerLeave) {
  // loadingNextPage
}
```



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

key是给每一个VNode的唯一ID，可以依靠key，更准确、更快的找到oldVnode中对应的vNode节点

带上key就不会就地复用，所有更准确；

利用key的唯一性生成map对象来获取对应节点比遍历节点更快。







#### 6、vue的虚拟dom？

虚拟的DOM的核心思想是：对复杂的文档DOM结构，提供一种方便的工具，进行最小化地DOM操作





#### 7、Virtual DOM算法，简单总结下包括几个步骤：

1、用JS对象描述出DOM树的结构，然后在初始化构建中，用这个描述树去构建真正的DOM，并实际展现到页面中

2、当有数据状态变更时，重新构建一个新的JS的DOM树，通过新旧对比DOM数的变化diff，并记录两棵树差异

3、把步骤2中对应的差异通过步骤1重新构建真正的DOM，并重新渲染到页面中，这样整个虚拟DOM的操作就完成了，视图也就更新了





#### 8、Vue中Watcher与Virtual DOM的关系：

Watcher 是来决定你要不要更新这个dom

虚拟DOM是用来找出怎么以最小的代价来更新

#### 9、scss是什么？在vue.cli中的安装使用步骤是？有哪几大特性？

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

#### 10、组件之间的传值通信？

  父组件向子组件传值：
    1）子组件在props中创建一个属性，用来接收父组件传过来的值
    2）在父组件中注册子组件
    3）在子组件标签中添加子组件props中创建的属性
    4）把需要传给子组件的值赋给该属性。

  子组件向父组件传值：

    1）子组件中需要以某种方式（如点击事件）的方法来触发一个自定义的事件
    2）将需要传的值作为$emit的第二个参数，该值将作为实参传给响应事件的方法
    3）在父组件中注册子组件并在子组件标签上绑定自定义事件的监听。

#### 11、vue-router有哪几种导航钩子？    

三种
一种是全局导航钩子：router.beforeEach(to,from,next)，作用：跳转前进行判断拦截
第二种：组件内的钩子
第三种：单独路由独享组件

#### 12、你对Vue.js的template编译的理解？

就是先转化成AST树（抽象语法树），再得到render函数返回VNode（Vue的虚拟DOM节点）

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
