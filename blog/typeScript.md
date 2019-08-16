typeScript？

`TypeScript` 是 `JavaScript` 的超集，也是 `JavaScript` 的强类型版本，支持所有的 `JavaScript` 语法。并在此之上对 `JavaScript` 添加了一些扩展，如 `class` / `interface` / `module` 等，这样会大大提升了代码的可阅读性。最终在浏览器中运行的仍然是 `JavaScript`，所以 `TypeScript` 并不依赖于浏览器的支持，也并不会带来兼容性问题。



好处？

1、支持ES6特性，静态类型检查，可以避免很多不必要的错误, 不用在调试的时候才发现问题

2、智能的IDE提示

3、代码重构，比如更改某一个变量的名字，那么其他有用到这个变量的地方都会自动变更成更改之后的名字

4、可读性



三方库

[vue-class-component](https://github.com/vuejs/vue-class-component)：强化 Vue 组件，使用 TypeScript/装饰器 增强 Vue 组件;

[vue-property-decorator](https://github.com/kaorun343/vue-property-decorator)：在 `vue-class-component` 上增强了更多的结合 Vue 特性的装饰器;

@Emit	Inject  Model	Prop	Provide	Watch	Component  (从 `vue-class-component` 继承) 	

更多信息，详见[官方文档](https://github.com/kaorun343/vue-property-decorator)	

[ts-loader](https://github.com/TypeStrong/ts-loader)：TypeScript 为 Webpack 提供了 `ts-loader`，其实就是为了让webpack识别 .ts .tsx文件

[vuex-class](https://github.com/ktsn/vuex-class) ：在 `vue-class-component` 写法中 绑定 `vuex`



tsconfig.json 完成的配置请点击 [tsconfig.json](http://json.schemastore.org/tsconfig)

```json
{
  // 编译选项
  "compilerOptions": {
    // 输出目录
    "outDir": "./output",
    // 是否包含可以用于 debug 的 sourceMap
    "sourceMap": true,
    // 以严格模式解析
    "strict": true,
    // 采用的模块系统
    "module": "esnext",
    // 如何处理模块
    "moduleResolution": "node",
    // 编译输出目标 ES 版本
    "target": "es5",
    // 允许从没有设置默认导出的模块中默认导入
    "allowSyntheticDefaultImports": true,
    // 将每个文件作为单独的模块
    "isolatedModules": false,
    // 启用装饰器
    "experimentalDecorators": true,
    // 启用设计类型元数据（用于反射）
    "emitDecoratorMetadata": true,
    // 在表达式和声明上有隐含的any类型时报错
    "noImplicitAny": false,
    // 不是函数的所有返回路径都有返回值时报错。
    "noImplicitReturns": true,
    // 从 tslib 导入外部帮助库: 比如__extends，__rest等
    "importHelpers": true,
    // 编译过程中打印文件名
    "listFiles": true,
    // 移除注释
    "removeComments": true,
    "suppressImplicitAnyIndexErrors": true,
    // 允许编译javascript文件
    "allowJs": true,
    // 解析非相对模块名的基准目录
    "baseUrl": "./",
    // 指定特殊模块的路径
    "paths": {
      "jquery": [
        "node_modules/jquery/dist/jquery"
      ]
    },
    // 编译过程中需要引入的库文件的列表
    "lib": [
      "dom",
      "es2015",
      "es2015.promise"
    ]
  }
}
```



有默认参数的形参一定要放在最后，可选参数不能放在最前面



for…in 循环的是对象的键

for…of 循环的是对象的值，可以被打断，break











































