##### 1、盒模型，box-sizing
- IE盒子模型和W3C盒子模型：计算width和height时，IE盒子模型包含padding和border, W3C盒子模型则不包括；
- box-sizing: content-box; //指定盒子模型为W3C
- box-sizing: border-box; //指定盒子模型为IE盒子模型

##### 2、CSS3新特性，伪类，伪元素，锚伪类
- 单冒号(:)用于CSS3伪类，双冒号(::)用于CSS3伪元素。
- CSS伪类：用于向某些选择器添加特殊的效果。（:hover :active :visited）
- CSS伪元素：用于将特殊的效果添加到某些选择器。伪元素代表了某个元素的子元素，这个子元素虽然在逻辑上存在，但却并不实际存在于文档树中。（::before ::after）

##### 3、CSS实现隐藏页面的方式
``` css
opacity: 0;
visibility: hidden;
display: none;

position: absolute;top: -9999px;left: -9999px 
```

##### 4、如何实现水平居中和垂直居中。
1. margin和width实现水平居中；
2. inline-block,并且在元素的父容器中设置text-align的属性为“center”；
3. position: absolute; width: 宽度值; left: 50%; margin-left: -(宽度值/2);
4. flex

##### 5、说说position，display
1. static、relative、absolute、fixed
2. none、inline、block、inline-block

##### 6、请解释*{box-sizing:border-box;}的作用，并说明使用它的好处
设置以后，相当于以怪异模式解析，border和padding全会在你设置的宽度内部。

比如手机端设置两行并列的布局，宽度各为50%,如果不用这个属性，设置border后右边的div会下来错位，设置这个属性，宽度还是50%而不是50%+*px,两行可以并列显示

##### 7、浮动元素引起的问题和解决办法？绝对定位和相对定位，元素浮动后的display值
问题： 
1. 由于浮动元素已脱离文档流，所以父元素无法被撑开，影响与父级元素同级的元素
2. 与浮动元素同级的非浮动元素（内联元素）会跟随其后，也是由于浮动元素脱离文档流，不占据文档流中的位置。 
3. 如果该浮动元素不是同级第一个浮动的元素，则它之前的元素也应该浮动，否则容易影响页面的结构显示。

解决方法：

clear：both；// 解决2。3

给父元素添加clearfix样式    //解决1
``` css
.clearfix:after{
    content: ".";       
    display: block;  
    height: 0;  
    clear: both;  
    visibility: hidden;
} 
```

overflow为hidden或者auto

##### 8、link和@import引入css的区别
1. link是XHTML标签，除了加载CSS外，还可以定义RSS等其他事务；@import属于CSS范畴，只能加载CSS。
2. link引用CSS时，在页面载入时同时加载；@import需要页面网页完全载入以后加载。
3. link是XHTML标签，无兼容问题；@import是在CSS2.1提出的，低版本的浏览器不支持。
4. link支持使用Javascript控制DOM去改变样式；而@import不支持。

##### 9、解释一下css3的flexbox，以及适用场景
一个用于页面布局的全新CSS3功能，Flexbox可以把列表放在同一个方向（从上到下排列，从左到右），并让列表能延伸到占用可用的空间。

常规布局是基于块和内联流方向，而Flex布局是基于flex-flow流可以很方便的用来做局中，能对不同屏幕大小自适应。

##### 10、grid布局
网格布局

##### 11、table布局的作用
用于显示批量的数据

##### 12、实现两栏布局有哪些方法？
1. `absolute + padding + %`
2. float + BFC
`.left{float: left; width: 200px;}.right{overflow: hidden;}`
3. flex 
`.container{display: flex;}.left{width: 200px;}.right{flex: 1;}`

##### 13、你知道attribute和property的区别么
property是DOM中的属性，是JavaScript里的对象；
attribute是HTML标签上的特性，它的值只能够是字符串；

HTML标签中定义的属性和值会保存该DOM对象的attributes属性里面；

attribute和property之间的数据绑定是单向的，attribute->property；
更改property和attribute上的任意值，都会将更新反映到HTML页面中；

##### 14、css布局问题？css实现三列布局怎么做？如果中间是自适应又怎么做？
flex

##### 15、流式布局如何实现，响应式布局如何实现
- 流式布局（Liquid）的特点（也叫"Fluid") 是页面元素的宽度按照屏幕分辨率进行适配调整，但整体布局不变。代表作栅栏系统（网格系统）
1. 设计方法：使用%百分比定义宽度，高度大都是用px来固定住，可以根据可视区域 (viewport) 和父元素的实时尺寸进行调整，尽可能的适应各种分辨率。往往配合 max-width/min-width 等属性控制尺寸流动范围以免过大或者过小影响阅读。
- 响应式设计的目标是确保一个页面在所有终端上都能显示出令人满意的效果；
1. 设计方法：媒体查询+流式布局。通常使用 @media 媒体查询 和网格系统 (Grid System) 配合相对布局单位进行布局，实际上就是综合响应式、流动等上述技术通过 CSS 给单一网页不同设备返回不同样式的技术统称。

##### 16、移动端布局方案
- 静态布局
- 流式布局
- 自适应布局
- 响应式布局
- 弹性布局
1. em是相对其父元素
2. rem是始终相对于html大小，即页面根元素

##### 17、实现三栏布局（圣杯布局，双飞翼布局，flex布局）
- 圣杯布局
```
<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8">
    <title>实现三栏水平布局之圣杯布局</title>
    <style type="text/css">
    .container {
        padding: 0 300px 0 200px;
    }
    .left, .main, .right {
        position: relative;
        min-height: 130px;
        float: left;
    }
    .left {
        left: -200px;
        margin-left: -100%;
        background: green;
        width: 200px;
    }
    .right {
        right: -300px;
        margin-left: -300px;
        background-color: red;
        width: 300px;
    }
    .main {
        background-color: blue;
        width: 100%;
    }
    </style>
</head>
<body>
<div class="container"> 
　　<div class="main">main</div> 
　　<div class="left">left</div> 
　　<div class="right">right</div> 
</div>
</body>
</html>
```

- 双飞翼布局
```
<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8">
    <title>实现三栏水平布局之双飞翼布局</title>
    <style type="text/css">
    .left, .main, .right {
        float: left;
        min-height: 130px;
        text-align: center;
    }
    .left {
        margin-left: -100%;
        background: green;
        width: 200px;
    }

    .right {
        margin-left: -300px;
        background-color: red;
        width: 300px;
    }
    .main {
        background-color: blue;
        width: 100%;
    }
    .content{
        margin: 0 300px 0 200px;
    }
    </style>
</head>
<body>
<div class="container"> 
　　<div class="main">
    　　<div class="content">main</div> 
    </div>
　　<div class="left">left</div> 
　　<div class="right">right</div> 
</div>
</body>
</html>
```
- flex布局
```
<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8">
    <title>实现三栏水平布局之Flex布局</title>
    <style type="text/css">
    .container{
        display: flex;
        min-height: 130px;
    }
    .main{
        flex-grow: 1;
        background-color: blue;
    }
    .left{
        order: -1;
        flex-basis: 200px;
        background-color: green;
    }
    .right{
        flex-basis: 300px;
        background-color: red;
    }
    </style>
</head>
<body>
<div class="container"> 
　　<div class="main">main</div> 
　　<div class="left">left</div> 
　　<div class="right">right</div> 
</div>
</body>
</html>
```

##### 18、清除浮动的原理
当元素设置了overflow样式，且值不为visible时，该元素就建构了一个BFC, BFC的高度是要包括浮动元素的，所以浮动元素的高度被撑起来，达到了清除浮动影响的目的


##### 19、overflow:hidden有什么缺点？
当父元素的高度是靠子元素撑开的时候，子元素浮动时，则在父元素使用overflow: hidden可以清除浮动，使得父元素的高度依旧是靠子元素撑开。

当父元素自身设置了height属性值，则在父元素使用overflow: hidden可以使子元素超出父元素的那部分隐藏。

##### 20、padding百分比是相对于父级宽度还是自身的宽度
父级宽度

##### 21、css3动画，transition和animation的区别，animation的属性，加速度，重力的模拟实现
- transition用于设置四个过渡属性，定义了动画的属性、时间、速度曲线以及延迟时间  ；通常和hover等事件配合使用，由事件触发。tranistion 只能设定头尾
```css
.one1{
    transition: width 3s linear 2s;
}
.one1:hover{
    width:300px;
}
```
- animation的使用必须结合@keyframes animation-name使用；可以设定每一帧的样式和时间

 ```css
 @keyframes  move{
    form{ left:0px;}   
    to{ left:200px;}
 }
 ```
- 在需要动画的元素上面添加动画  div{animation:move 5s infinite;}
- animation: name duration timing-function delay iteration-count direction;（动画名称，动画执行时间，速度曲线，动画延迟时间，播放次数，是否反向播放）


##### 22、CSS 3 如何实现旋转图片（transform: rotate）
```css
@-webkit-keyframes rotation{
    from {-webkit-transform: rotate(0deg);}
    to {-webkit-transform: rotate(360deg);}
}

.rotation{
    -webkit-transform: rotate(360deg);
    animation: rotation 3s linear infinite;
    -moz-animation: rotation 3s linear infinite;
    -webkit-animation: rotation 3s linear infinite;
    -o-animation: rotation 3s linear infinite;
}

```
##### 23、sass less
Sass是对CSS（层叠样式表）的语法的一种扩充，诞生于2007年，最早也是最成熟的一款CSS预处理器语言，它 可以使用变量、常量、嵌套、混 入、函数等功能，可以更有效有弹性的写出CSS

##### 24、对移动端开发了解多少？

响应式设计、Zepto；@media、viewport、JavaScript 正则表达式判断平台。

##### 25、什么是bfc，如何创建bfc？解决什么问题？
- 块级格式化上下文
- 创建BFC方法：
  - 浮动元素和绝对定位元素
  - overflow 不为 visiable的块级盒子
  - 非块级盒子的块级容器：即display 为 inline-blocks, table-cells, 和 table-captions （表格布局或者弹性布局）

- 解决问题：
  - 可以解决浮动元素造成的父元素高度塌陷问题
  - div浮动兄弟遮盖问题
  - Box垂直方向的距离由margin决定，在一个BFC中，两个相邻的块级盒子的垂直外边距会产生折叠

##### 26、CSS中的长度单位（px,pt,rem,em,ex,vw,vh,vh,vmin,vmax）

##### 27、CSS 选择器的优先级是怎样的？
!important > 行内样式>ID选择器 > 类选择器 > 标签 > 通配符 > 继承 > 浏览器默认属性

##### 28、常遇到的浏览器兼容性问题有哪些？常用的hack的技巧
1. margin 和padding差异较大: 通配符*来设置各个标签的内外补丁是0
2. 块属性标签float后，又有横行的margin情况下，在IE6显示margin比设置的大: 在float的标签样式控制中加入 display:inline;
3. 设置较小高度标签（一般小于10px），在IE6，IE7，遨游中高度超出自己设置高度: 给超出高度的标签设置overflow:hidden;
4. 图片默认有间距: 使用float属性为img布局

##### 29、外边距合并
- 两个或多个毗邻的普通流中的块元素垂直方向上的 margin 会折叠
- 解决方法：在写的时候尽量用同一方向的margin，比如都设置为top或者bottom
- 折叠结果遵循下列计算规则：
  1. 两个相邻的外边距都是正数时，折叠结果是它们两者之间较大的值。
  2. 两个相邻的外边距都是负数时，折叠结果是两者绝对值的较大值。
  3. 两个外边距一正一负时，折叠结果是两者的相加的和。

##### 30、解释一下“::before”和“:after”中的双冒号和单冒号的区别
- 都是CSS伪元素
- 单冒号是CSS2中提出来的，所以兼容性可能到IE8；
- 双冒号是CSS3中的写法，为了将伪类和伪元素区分开；

##### 31、超链接访问过后hover样式就不出现的问题是什么？如何解决？

被点击访问过的超链接就不再具有hover和active了，解决方法是改变CSS属性的排列顺序: L-V-H-A（link,visited,hover,active）

