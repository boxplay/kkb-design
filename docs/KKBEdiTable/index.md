---
title: KKBEdiTable - 可编辑表格

nav:
  title: KKBEdiTable - 可编辑表格


group:
  path: /KKBEdiTable
  title: KKBEdiTable - 可编辑表格
  order: 1
---

##  KKBEdiTable 介绍

- 组件支持使用ref、并提供了ref提供： 添加：onAdd()、保存：onSave()、取消：onCannel()、编辑：onEdit()、全部保存: onAllSave()
- 多行添加功能仅能在多行编辑和全部编辑情况下使用
### 单行编辑
<code src='./demo/baseRow2.jsx' title='单行编辑' desc='单行编辑table 使用ref.onAdd 进行增加数据 使用ref.onCannel 进行取消 '></code>

### 多行编辑
<code src='./demo/baseRow.jsx' title='多行编辑' desc='多行编辑table'></code>

### 全部编辑
<code src='./demo/baseAll.jsx' title='全部编辑' desc='全部编辑table'></code>

### 单元格编辑
<code src='./demo/base.jsx' title='单元格编辑' desc='单元格编辑'></code>

### 新增数据默认值
<code src='./demo/baseRowDefault.jsx' title='默认值' desc='编辑table结合defaultValue'></code>

### 表单校验
<code src='./demo/baseRowRule.jsx' title='校验' desc='编辑table结合rules'></code>

## API

### Props

| 参数            | 说明                                                                                                        | 类型                                             | 默认值     | 版本 |
| --------------- | ----------------------------------------------------------------------------------------------------------- | ------------------------------------------------ | ---------- | ---- |
|     ediType     |                   table编辑的类型                                                     | '`cellEdit`' \| '`rowEdit`'                                  |      `rowEdit`      |      |
|     columns     |                   列属性                                                     |           `columnsProps`                       |       ——     |      |

### columnsProps
| 参数            | 说明                                                                                                        | 类型                                             | 默认值     | 版本 |
| --------------- | ----------------------------------------------------------------------------------------------------------- | ------------------------------------------------ | ---------- | ---- |
|     ediType     |                   列的编辑类型                                                     | '`input`' \| '`select`' \| '`textArea`' \| '`rangePicker`' \|  '`switch`'      |     ——      |      |
|     options     |                   ediType的配置项                                                     |          参考 ediType 的 props                       |       ——     |      |
|     defaultValue     |                   新增数据时改列的默认值                                                     |          string                       |       ——     |      |
|     rules     |                   表单校验                                                     |          参考antd                       |       ——     |      |

### cellEdit props
| 参数            | 说明                                                                                                        | 类型                                             | 默认值     | 版本 |
| --------------- | ----------------------------------------------------------------------------------------------------------- | ------------------------------------------------ | ---------- | ---- |
|     onSave     |                   单元格保存数据                                                     | (record) => boolean                                  |      ——      |      |

### rowEdit props
| 参数            | 说明                                                                                                        | 类型                                             | 默认值     | 版本 |
| --------------- | ----------------------------------------------------------------------------------------------------------- | ------------------------------------------------ | ---------- | ---- |
|     allEdit     |                   是否全编辑                                                     | boolean                                 |      false      |      |
|     multiple     |                   是否开启多行编辑                                                     | boolean                                 |      false      |      |
|     rowSave     |                   行保存数据回调 返回true则组件内保存数据（纯展示）                                                     | (record) => boolean                                 |      ——      |      |
|     ref     |                   ediTableRef                                                    | ediTableRef                                 |      ——      |      |

### ediTableRef props
| 参数            | 说明                                                                                                        | 类型                                             | 默认值     | 版本 |
| --------------- | ----------------------------------------------------------------------------------------------------------- | ------------------------------------------------ | ---------- | ---- |
|     onDelete     |                   table内部删除事件                                                     |  (record) => void                                 |      ——      |      |
|     onSave     |                   table保存内部事件 触发 props rowSave                                  | (record) => void;                                 |      ——      |      |
|     onCancel     |                   取消事件                                                     | (record) => void                                 |      ——      |      |
|     onAdd     |                   table内部添加事件                                                    | (record) => void                                 |      ——      |      |
|     onAllSave     |                   table全部保存事件配合allEdit使用                                                    | (record) => void                                 |      ——      |      |
