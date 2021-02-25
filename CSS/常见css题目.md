## 清除浮动
```css
.clearfix:after {
    content: "";
    display: block;
    clear: both;
}
```
## css选择器优先级
> !important > style > id > 伪类选择器::hover > class > 伪元素选择器:after > tag > *通配符选择器
## BFC
什么是BFC
> 翻译为block formatting context 块级格式化上下文
> 
> 是一个独立的渲染区域，让处于BFC内部的元素与外界隔离，使定互不影响

 BFC的产生条件？
1. float不为none
2. overflow不为visible的块级元素
3. position不为static
4. display为flex或者grid

BFC的作用
1. 解决排列块元素间margin重叠的问题
2. 清除元素内部浮动产生的高度塌陷问题
3. 制作自适应两栏布局

## 居中的实现方法（n种，分类讨论）
水平居中
```css
.box {
    height: 
    width: 200px;
    display: block;
    margin: 0 auto;
}
```

盒子水平垂直居中 position: absolute;
```css
.box {
    position: absolute;
    height: 400px;
    width: 400px;
    left: 0;
    top : 0;
    right: 0;
    bottom: 0;
    margin: auto;
}
```
盒子水平/垂直居中: translate
```css
.box {
    position: relative;
    height: 400px;
    width: 400px;
    left: 50%;
    top: 50%;
    transform: translateX(-50%) translateY(-50%);
}
```
原理：
- top,left基于盒子的父级元素，定位点为盒子左上角
- translate基于盒子本身的宽高


盒子水平/垂直居中: margin
1. 使用left,top定位50%
2. 用margin负值，盒子宽高的一半


文字水平/垂直居中
```css
.context {
    height: 20px;
    line-height: 20px
}
```
内联元素水平居中
```css

.box {
    text-align: center;
}
```
内联元素垂直居中
```css
.box:before {
    content: "";
    height: 100%;
    display: inline;
    vertical-align: middle;
}
.box .context {
    vertical-align: middle;
}
```

flex布局
```css
.box {
    display: flex;
    justify-content: center;
    align-items: center;
}
```

grid类似
```css
.box {
    display: grid;
    justify-content: center;
    align-content: center;
}
```

## 说说盒子模型
- 标准盒模型：box-sizing: content-box;
  - 设置的宽高只是content内容的宽高
  - padding和margin的设置会让盒子变大
- 怪异盒模型：border-box
  - 设置的宽高是盒子的真实宽高
  - padding的设置会压缩content内容区域
  - padding大于宽高时以padding为准