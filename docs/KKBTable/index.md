---
title: KKBTable - 列表组件

nav:
  title: KKBTable - 列表组件

group:
  path: /KKBTable
  title: KKBTable - 列表组件
  order: 1
---

## KKBTable 介绍

<p>kkb-design KKBTable组件 基于 antd 二次封装</p>
<p>columns新增字段type< text | money | time | group | avatar ></p>
<p>支持原antd各属性</p>
<p>状态含义及色号</p>
<div style="margin:10px">
    <div style="width: 7px; height: 7px; background: #96F022; display: inline-block; border-radius:50%"></div>
    <span style="margin:0 10px">适用于未开始状态，比如待处理</span>
    <span style="margin:0 10px">#96F022</span>
</div>
<div style="margin:10px">
    <div style="width: 7px; height: 7px; background: #1874CE; display: inline-block; border-radius:50%"></div>
        <span style="margin:0 10px">适用于流程中状态，比如处理中，部分退款</span>
    <span style="margin:0 10px">#1874CE</span>
</div>
<div style="margin:10px">
    <div style="width: 7px; height: 7px; background: #30A44F; display: inline-block; border-radius:50%"></div>
        <span style="margin:0 10px">适用于完成状态，比如已退款、已完成</span>
    <span style="margin:0 10px">#30A44F</span>
</div>
<div style="margin:10px">
    <div style="width: 7px; height: 7px; background: #DB1919; display: inline-block; border-radius:50%"></div>
        <span style="margin:0 10px">适用于异常状态</span>
    <span style="margin:0 10px">#DB1919</span>
</div>
<div style="margin:10px">
    <div style="width: 7px; height: 7px; background: #FBBD00; display: inline-block; border-radius:50%"></div>
        <span style="margin:0 10px">适用于警示状态</span>
    <span style="margin:0 10px">#FBBD00</span>
</div>
<div style="margin:10px">
    <div style="width: 7px; height: 7px; background: #C179FF; display: inline-block; border-radius:50%"></div>
        <span style="margin:0 10px">为业务多状态预留</span>
    <span style="margin:0 10px">#C179FF</span>
</div>
<div style="margin:10px">
    <div style="width: 7px; height: 7px; background: #7FD3F7; display: inline-block; border-radius:50%"></div>
    <span style="margin:0 10px">为业务多状态预留</span>
    <span style="margin:0 10px">#7FD3F7</span>
</div>

## 案例演示 

### 带筛选项的表格
<code src='./demo/index' title='带筛选项的表格' desc='筛选区域操作不多于4个按钮'></code>

### 单一筛选项的表格

<code src='./demo/onlyFilter' title='单一筛选项的表格' desc='可自由配置单一筛选项的类型'></code>

### 固定列
<code src='./demo/fixedColumns' title='固定列' desc='综合使用'></code>

### 多选
<code src='./demo/rowSelection' title='多选' desc='综合使用'></code>


### 字段为空
<code src='./demo/valueEmpty' title='多选' desc='综合使用'></code>

### 升降序
<code src='./demo/sorter' title='升降序' desc='综合使用'></code>

### 字段筛选
<code src='./demo/groupMapping' title='字段筛选' desc='综合使用'></code>


### 操作
<code src='./demo/actions' title='操作' desc='综合使用'></code>


### 文字链
<code src='./demo/textLink' title='文字链' desc='综合使用'></code>

<code src='./demo/type' title='案例' desc='综合使用'></code>

### 竖向排列按钮
<code src='./demo/button' title='竖向排列按钮' desc='综合使用'></code>
### 无数据
<code src='./demo/emptyData' title='空数据' desc='综合使用'></code>
### 树表格
<code src='./demo/tree' title='树表格' desc='综合使用'></code>
### 自定义列
<code src='./demo/custom' title='自定义列表项' desc='综合使用'></code>


## API

| 参数            | 说明                     | 类型 | 默认值 | 版本 |
| --------------- | ------------------------ | ---- | ------ | ---- |
| searchProps     | 搜索表单参数             |      |        |      |
| tableProps      | 列表参数                 |      |        |      |
| paginationProps | 分页参数                 |      |        |      |
| handleProps     | 操作参数                 |      |        |      |
| onChange        | 回调事件（返回所有参数） |      |        |      |
| miniSearch      | 是否为单行筛选            |    Boolean  |  false      |  ^4.0.1    |

### searchProps

<a href="/vgeForm/kkbsearch">searchProps</a>

#### searchProps 内部新增属性

| 参数          | 说明                    | 类型    | 默认值                         | 版本    |
| ------------- | ----------------------- | ------- | ------------------------------ | ------- |
| resetPageSize | 重置时是否重置 pageSize | boolean | 此属性仅在 KKBTable 组件内使用 | ^1.2.27 |

### paginationProps

| 参数            | 说明       | 类型 | 默认值 | 版本 |
| --------------- | ---------- | ---- | ------ | ---- |
| total           | 总数       |      |        |      |
| defaultCurrent  | 默认初始页 |      |        |      |
| defaultPageSize | 总数       |      |        |      |

### handleProps

| 参数      | 说明                            | 类型 | 默认值 | 版本 |
| --------- | ------------------------------- | ---- | ------ | ---- |
| leftArea  | 左侧区域（仅能输入 radio 类型） |      |        |      |
| rightArea | 右侧区域                        |      |        |      |

### leftArea

| 参数    | 说明            | 类型   | 默认值 | 版本 |
| ------- | --------------- | ------ | ------ | ---- |
| id      | id              | number |        |      |
| label   | 标签名          | string |        |      |
| options | 配置（同 antd） |        |        |      |

### rightArea

| 参数    | 说明           | 类型   | 默认值 | 版本 |
| ------- | -------------- | ------ | ------ | ---- |
| id      | id             | number |        |      |
| label   | 标签名         | string |        |      |
| onClick | 点击事件       | fn()   |        |      |
| options | 按钮的所有属性 |        |        |      |
| render  | 自定义渲染     | fn()   |        |      |

### tableProps 同 antd
#### 新增属性
| 参数    | 说明           | 类型   | 默认值 | 版本 |
| ------- | -------------- | ------ | ------ | ---- |
| custom      | 是否展示自定义列按钮             | boolean |   true    |      |


### columns 新增属性

| 参数         | 说明                                               | 类型                                                           | 默认值 | 版本 |
| ------------ | -------------------------------------------------- | -------------------------------------------------------------- | ------ | ---- |
| styleType    | 设置列类型                                         | 'text' \| 'money' \| 'time' \| 'avatar' \| 'action' \| 'group' |        |      |
| groupMapping | 分组类型的映射关系（当 styleType 为 group 时生效） |                                                                |        |      |
| actionList   | 操作类型类型的 list                                |                                                                |        |      |
| direction   | 操作栏按钮方向（当 styleType 为 action 时生效）          | 'vertical' \| 'horizontal' | 'vertical' 
| defaultVisible   | 默认是否展示该列（当tableProps中的custom指定时生效）                              | boolean | true                             

### groupMapping

| 参数  | 说明                       | 类型           | 默认值 | 版本 |
| ----- | -------------------------- | -------------- | ------ | ---- |
| label | 标签名                     | string         |        |      |
| value | 对应值                     | string\|number |        |      |
| colr  | 对应颜色                   | string         |        |      |
| icon  | icon 图标（与 color 互斥） | React.ReactDOM |        |      |

### actionList

| 参数     | 说明                       | 类型               | 默认值 | 版本 |
| -------- | -------------------------- | ------------------ | ------ | ---- |
| label    | 标签名                     | string             |        |      |
| id       | id                         | number             |        |      |
| onClick  | 点击回调(返回行内所有信息) | fn                 |        |      |
| children | 子操作项                   | Array[actionProps] |        |      |
