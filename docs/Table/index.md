---
title: table - 列表组件

nav:
  title: table - 列表组件


group:
  path: /table
  title: table - 列表组件
  order: 1
---

## Table 介绍

<p>kkb-design Table组件 基于 antd 二次封装</p>
<p>columns新增字段type< text | money | time | group | avatar ></p>
<p>支持原antd各属性</p>
<a href="https://ant.design/components/table-cn/" target="_black">antd Table组件地址</a>
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
<code src='./demo/index' title='案例' desc='综合使用'></code>


### columns新增属性

| 参数           | 说明                  | 类型     | 默认值      | 版本  |
| -------------- | -------------------- | -------- | --------- | ---- |
| styleType |设置列类型   | 'text' \| 'money' \| 'time' \| 'avatar' \| 'action' \| 'group'| |    |
| groupMapping |分组类型的映射关系（当styleType 为 group时生效） | | |    |
| actionList |操作类型类型的list | | |    |
| defaultVisible |默认是否展示该列 | boolean | true |    |
| defaultSymbol | defaultSymbol字段 styleType='time' \| 'money'时 空值处理 展示字段默认‘-’ | string | |  -  |
### groupMapping

| 参数           | 说明                  | 类型     | 默认值      | 版本  |
| -------------- | -------------------- | -------- | --------- | ---- |
|label | 标签名|string | | |
|value|对应值 |string\|number | | |
|colr |对应颜色 |string | | |
|icon |icon图标（与color互斥） | React.ReactDOM | | |

### actionList
| 参数           | 说明                  | 类型     | 默认值      | 版本  |
| -------------- | -------------------- | -------- | --------- | ---- |
|label | 标签名|string | | |
|id|id |number | | |
|onClick |点击回调(返回行内所有信息) |fn | | |
|children |子操作项 | Array[actionProps] | | |

