---
title: Button - 按钮组件

nav:
  title: Button - 按钮组件


group:
  path: /button
  title: Button - 按钮组件
  order: 1
---

## Button 介绍

<p>kkb-design Button组件 基于 antd 二次封装</p>
<p>新增2种新类型success、warning</p>
<p>新增radius、aftericon属性</p>
<p>支持原antd各属性</p>
<a href="https://ant.design/components/button-cn/" target="_black">antd Button组件地址</a>

## 代码演示
<code src='./demo/type' title='新增五种新类型' desc='新增2种类型success、warning'></code>
<code src='./demo/index' title='案例' desc='综合使用'></code>

## API
<p>通过设置 Button 的属性来产生不同的按钮样式，推荐顺序为：`type` -> `shape` -> `size` -> `loading` -> `disabled`。</p>

### 新增属性

| 参数           | 说明                  | 类型     | 默认值      | 版本  |
| -------------- | -------------------- | -------- | --------- | ---- |
| type |设置按钮类型    |primary \| ghost \| dashed \| link \| text \| default \| success \| danger \| warning \|default|      |
| aftericon |内容后icon| ReactNode|   -   |
| content |内容| any|   按钮   |
| radius |圆角| string|  -    |

### 原始属性
| 参数           | 说明                  | 类型     | 默认值      | 版本  |
| -------------- | -------------------- | -------- | --------- | ---- |
|block|将按钮宽度调整为其父宽度的选项|boolean|false|
|danger|设置危险按钮|boolean|false|
|disabled |按钮失效状态 |boolean |false|
|ghost|幽灵属性，使按钮背景透明|boolean |false|
|href|点击跳转的地址，指定此属性 button 的行为和 a 链接一致|string|-|
|htmlType|设置 button 原生的 type 值，可选值请参考 HTML 标准|string|button|
|icon|设置按钮的图标组件|ReactNode|-|
|loading|设置按钮载入状态|boolean \| { delay: number }|false|
|shape|设置按钮形状|circle \| round|-|
|size|设置按钮大小|large \| middle \| small|middle|
|target|相当于 a 链接的 target 属性，href 存在时生效|string|-|
|onClick|点击按钮时的回调|(event) => void|-|

