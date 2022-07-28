---
title: KKBInput - 输入框组件

nav:
  title: KKBInput - 输入框组件


group:
  path: /KKBInput
  title: KKBInput - 输入框组件
  order: 1
---

## KKBInput 介绍

<p>kkb-design KKBInput 基于 antd 二次封装</p>
<p>新增2种新类型success、warning</p>
<p>新增radius、aftericon属性</p>
<p>支持原antd各属性</p>

## 代码演示
<code src='./demo/index' title='kkbtype' desc='tel类型'></code>
<code src='./demo/options' title='options' desc='自定义连接符及长度'></code>

## API
### 新增属性

| 参数           | 说明                  | 类型     | 默认值      | 版本  |
| -------------- | -------------------- | -------- | --------- | ---- |
| valueLimite | 返回数据格式是否包含连接符    |boolean|  false    | |
| options | 连接符及分段配置项    |options|  -    | |
| kkbType | 内部默认继承的格式类型    |'`tel`'|  -    | |

### options

| 参数           | 说明                  | 类型     | 默认值      | 版本  |
| -------------- | -------------------- | -------- | --------- | ---- |
| limiters | 连接符数组    | string[] |  -    | |
| defalutLimiters | 默认连接符    |string|  -    | |
| blocks | 每个模块的长度    |number[]|  -    | |
