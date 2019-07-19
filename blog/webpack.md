#### 1、webpack打包原理

把所有依赖打包成一个 bundle.js 文件，通过代码分割成单元片段并按需加载

#### 2、webpack的优势

（1） webpack 是以 commonJS 的形式来书写脚本，但对 AMD/CMD 的支持也很全面，方便旧项目进行代码迁移。
（2）能被模块化的不仅仅是 JS 了
（3） 开发便捷，能替代部分 grunt/gulp的工作，比如打包、压缩混淆、图片转base64等
（4）扩展性强，插件机制完善

#### 3、webpack 和 gulp 的区别

webpack是一个模块打包器，基于入口的，强调的是一个前端模块化方案，更侧重模块打包，我们可以把开发中的所有资源都看成是模块，通过loader和plugin对资源进行处理。

grunt和gulp是基于任务和流
gulp是一个前端自动化构建工具，强调的是前端开发的工作流程，可以通过配置一系列的task，第一task处理的事情（如代码压缩，合并，编译以及浏览器实时更新等）。然后定义这些执行顺序，来让glup执行这些task，从而构建项目的整个开发流程。自动化构建工具并不能把所有的模块打包到一起，也不能构建不同模块之间的依赖关系。

#### 4、什么是bundle，什么是chunk，什么是module

bundle：是由webpack打包出来的文件
chunk：是指webpack在进行模块依赖分析的时候，代码分割出来的代码块
module：是开发中的单个模块

#### 5、什么是loader，什么是plugin

loader用于加载某些资源文件。因为webpack本身只能打包common.js规范的js文件，对于其他资源如css，img等，是没有办法加载的，这时就需要对应的loader将资源转化，从而进行加载。

plugin用于扩展webpack的功能。不同于loader，plugin的功能更加丰富，比如压缩打包，优化，不只局限于资源的加载。

- UglifyJsPlugin: 压缩代码
- HotModuleReplacementPlugin 自动刷新
- HtmlWebpackPlugin 依据一个简单的index.html模版，生成一个自动引用你打包后的js文件的新index.html
- ExtractTextWebpackPlugin 它会将入口中引用css文件，都打包都独立的css文件中，而不是内嵌在js打包文件中
- Tree-shaking 指在打包中去除那些引入了，但是在代码中没有被用到的那些死代码
- 在webpack中Tree-shaking是通过uglifySPlugin来Tree-shaking，Css需要使用Purify-CSS

#### 6、有哪些常见的Loader？他们是解决什么问题的？

- file-loader：把文件输出到一个文件夹中，在代码中通过相对 URL 去引用输出的文件
- url-loader：和 file-loader 类似，但是能在文件很小的情况下以 base64 的方式把文件内容注入到代码中去
- source-map-loader：加载额外的 Source Map 文件，以方便断点调试
- image-loader：加载并且压缩图片文件
- babel-loader：把 ES6 转换成 ES5
- css-loader：加载 CSS，支持模块化、压缩、文件导入等特性
- style-loader：把 CSS 代码注入到 JavaScript 中，通过 DOM 操作去加载 CSS。
- eslint-loader：通过 ESLint 检查 JavaScript 代码

#### 7、有哪些常见的Plugin？他们是解决什么问题的？

- define-plugin：定义环境变量
- commons-chunk-plugin：提取公共代码
- uglifyjs-webpack-plugin：通过UglifyES压缩ES6代码
- mini-css-extract-plugin：抽离css文件
- optimize-css-assets-webpack-plugin：压缩css文件
- postcss-loader和autoprefixer：处理css私有前缀和兼容
- clean-webpack-plugin：在每次打包时自动清理之前的产物



#### 8、webpack-dev-server和http服务器如nginx有什么区别?

webpack-dev-server使用内存来存储webpack开发环境下的打包文件，并且可以使用模块热更新，比传统的http服务对开发更加简单高效

#### 9、什么 是模块热更新？

模块热更新是webpack的一个功能，他可以使得代码修改过后不用刷新浏览器就可以更新，是高级版的自动刷新浏览器。

#### 10、如何自动生成webpack配置?

webpack-cli、vue-cli

#### 11、什么是tree-shaking? css可以tree－shaking吗？

指打包中去除那些引入了但在代码中没用到的死代码。在wepack中js treeshaking通过UglifyJsPlugin来进行，css中通过purify-CSS来进行.

#### 12、webpack的入口文件怎么配置，多个入口怎么分割？

webpack.config.js

```
const path = require('path');
module.exports={
    //入口文件的配置项
    entry:{
        entry:'./src/entry.js',
        //这里我们又引入了一个入口文件
        entry2:'./src/entry2.js'
    },
    //出口文件的配置项
    output:{
        //输出的路径，用了Node语法
        path:path.resolve(__dirname,'dist'),
        //输出的文件名称
        filename:'[name].js'
    },
    //模块：例如解读CSS,图片如何转换，压缩
    module:{},
    //插件，用于生产模版和各项功能
    plugins:[],
    //配置webpack开发服务功能
    devServer:{}
}

entry：配置入口文件的地址，可以是单一入口，也可以是多入口。
output：配置出口文件的地址，在webpack2.X版本后，支持多出口配置。
module：配置模块，主要是解析CSS和图片转换压缩等功能。
plugins：配置插件，根据你的需要配置不同功能的插件。
devServer：配置开发服务功能
```

#### 13、webpack的构建流程是什么?从读取配置到输出文件这个过程尽量说全

Webpack 的运行流程是一个串行的过程，从启动到结束会依次执行以下流程：

- 初始化参数：从配置文件和 Shell 语句中读取与合并参数，得出最终的参数；
- 开始编译：用上一步得到的参数初始化 Compiler 对象，加载所有配置的插件，执行对象的 run 方法开始执行编译；
- 确定入口：根据配置中的 entry 找出所有的入口文件；
- 编译模块：从入口文件出发，调用所有配置的 Loader 对模块进行翻译，再找出该模块依赖的模块，再递归本步骤直到所有入口依赖的文件都经过了本步骤的处理；
- 完成模块编译：在经过第4步使用 Loader 翻译完所有模块后，得到了每个模块被翻译后的最终内容以及它们之间的依赖关系；
- 输出资源：根据入口和模块之间的依赖关系，组装成一个个包含多个模块的 Chunk，再把每个 Chunk 转换成一个单独的文件加入到输出列表，这步是可以修改输出内容的最后机会；
- 输出完成：在确定好输出内容后，根据配置确定输出的路径和文件名，把文件内容写入到文件系统。

在以上过程中，Webpack 会在特定的时间点广播出特定的事件，插件在监听到感兴趣的事件后会执行特定的逻辑，并且插件可以调用 Webpack 提供的 API 改变 Webpack 的运行结果









