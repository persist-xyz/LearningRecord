#### minification(压缩) 

生产环境下默认使用 [`TerserPlugin`] ，并且也是代码压缩方面比较好的选择，但是还有一些其他可选择项。以下有几个同样很受欢迎的插件：

- [`BabelMinifyWebpackPlugin`]
- [`ClosureCompilerPlugin`]

如果决定尝试一些其他压缩插件，只要确保新插件也会按照 [tree shake] 指南中所陈述的具有删除未引用代码(dead code)的能力，以及提供 [`optimization.minimizer`]



#### Tree Shaking ?

项目中没有使用的代码会在打包的时候丢掉。

**JS 的 Tree Shaking 依赖的是 ES6 的模块系统（比如：import 和 export）**，请注意库的写法是否符合 ES 模板系统规范



#### CSS Tree Shaking

[PurifyCSS ]将帮助我们进行 **CSS Tree Shaking** 操作。为了能准确指明要进行 Tree Shaking 的 CSS 文件，还有 **glob-all** （另一个第三方库）。

**glob-all** 的作用就是帮助 PurifyCSS 进行**路径处理**，定位要做 Tree Shaking 的路径文件



mini-css-extract-plugin 	// 将 css 单独打包成文件



 #### babel7

@babel/core babel-loader @babel/preset-env @babel/plugin-transform-runtime







