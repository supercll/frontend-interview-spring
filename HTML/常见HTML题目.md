## 如何理解HTML标签语义化
### 语义化阶段的发展
1. 后台开发来写html
后台开发人员可能会使用table套table布局，导致维护很麻烦
2. 设计师阶段
他们写布局是DIV + CSS布局，整个页面标签用了很多div，这种写法没有语义化，无法区分div与div
3. 前后端分离阶段 [标签语义化详解](https://editor.csdn.net/md/?articleId=105044634)才是专业的写法

## 你用过哪些 HTML 5 标签？
header，main ，footer，article，
canvas：[canvas MDN](https://developer.mozilla.org/zh-CN/docs/Web/API/Canvas_API/Tutorial)
video: [video MDN](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Element/video)
audio [audio MDN](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Element/audio)

## 什么是H5?
绝对不能回答HTML5
[参考回答](https://xiedaimala.com/posts/5603e488-86cd-4cf4-bb57-94ff8920b12a)
## meta viewport 是做什么用的，怎么写？
meta元数据

可用于SEO优化
```html
<!-- 页面标题<title>标签(head 头部必须) -->
<title>your title</title>
<!-- 页面关键词 keywords -->
<meta name="keywords" content="your keywords">
<!-- 页面描述内容 description -->
<meta name="description" content="your description">
<!-- 定义网页作者 author -->
<meta name="author" content="author,email address">
<!-- 定义网页搜索引擎索引方式，robotterms 是一组使用英文逗号「,」分割的值，通常有如下几种取值：none，noindex，nofollow，all，index和follow。 -->
<meta name="robots" content="index,follow">
```


可用于控制移动端视口
viewport常用代码
```html
<meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=0">
```
- width viewport 宽度(数值/device-width)
- height viewport 高度(数值/device-height)
- initial-scale 初始缩放比例
- maximum-scale 最大缩放比例
- minimum-scale 最小缩放比例
- user-scalable 是否允许用户缩放(yes/no)

