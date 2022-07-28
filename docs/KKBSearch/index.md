---
title: KKBSearch - 搜索表单

nav:
  title: KKBSearch - 搜索表单

group:
  path: /KKBSearch
  title: KKBSearch - 搜索表单
  order: 1
---

## KKBSearch 介绍

这是一个通用的 Form 搜索组件，可以在列表页面，传入 config 数据，直接动态渲染搜索组件。

## 组件使用案例

### 基础示例

<code src='./demo/basic' title='基本使用' desc='基本的搜索表单数据域控制搜索，包含布局、初始化、搜索、重置。'></code>

<code src='./demo/collapse' title='可折叠面板' desc='表单数据域控制搜索，搜索条件过多，可通过折叠面板显示、隐藏，支持复制粘贴查询'></code>

<code src='./demo/datePicker' title='日期选择' desc='多种日期场景'></code>

<code src='./demo/cols' title='两列、三列混用' desc='两列、三列混用，标签右对齐'></code>

### 自定义组件

<code src='./demo/custom' title='自定义组件' desc='可通过配置传入自定义组件，实现个性化配置<br>通过ref
暴露的setValue设置表单值'></code>

### 热插拨示例

<code src="./demo/hotSwap" title="自定义组件" desc="通过内置热插拨组件API，插入自己的自定义组件，其它地方就像使用内置组件一样，声明type即可！<br><br>自定义内置组件，<br>props.value 这是form实时返回的value值<br>props.onChange 这是form更新时触发的函数事件，传入需要更新视图表单的值。<br><br>需要注意props会挂载`value, onChange`二参数，用于绑定和触发form组件之间的交互更新"></code>

### 清除后搜索

<code src='./demo/clearSearch' title='清除后搜索' desc='清除后搜索'></code>

## API

### Props

| 参数 | 说明 | 类型 | 默认值 | 版本 |
| --- | --- | --- | --- | --- |
| boxData | 搜索组件的 json 数据 | `array` | [] |  |
| labelAlign | label 对其方式 | `string` | right |  |
| btnTextAlign | 按钮对其方式 | `string` | left |  |
| btnSpan | 按钮栅格占位格数 | `number` | 8 |  |
| searchFn | 搜索回调 | function | `(values:FormValues) => void` |  |
| searchResetFn | 重置回调 | function | `(values) => void` |  |
| saveBtnText | 保存按钮文案 | `string` | 搜索 |  |
| resetBtnText | 重置按钮文案 | `string` | 重置 |  |
| isCollapse | 是否启动折叠面板 | `boolean` | false |  |
| defaultCollaps | 默认折叠状态 | `boolean` | false | ^3.0.3 |
| isPasteSearch | 是否启动粘贴搜索 | `boolean` | true |  |

### ref

| 参数     | 说明                  | 类型               | 默认值 | 版本 |
| -------- | --------------------- | ------------------ | ------ | ---- |
| setValue | 设置表单的值          | `(values) => void` |        |      |
| getValue | 获取表单内所有值      | `() => any`        |        |      |
| reset    | 重置表单              | `() => any`        |        |      |
| formRef  | antd formRef 完整实例 | `FormInstance`     |        |      |

### boxData

| 参数 | 说明 | 类型 | 默认值 | 版本 |
| --- | --- | --- | --- | --- |
| type | 类型 | `string` |  |  |
| label | 标签文本 | `string` |  |  |
| name | 搜索组件每一个字段值(唯一) | `string` |  |  |
| span | 栅格占位格数 | `number` | 8 |  |
| custom | 自定义组件函数，会暴露声明组件时的参数以及 formRef 完整实例等 | `(data) => React.ReactElement` |  |  |
| options | 每一项的表单配置（同 antd 配置参数相同，详见 antd 文档） | `Object` | {} |  |

## options

### input

| 参数 | 说明 | 类型 | 默认值 | 版本 |
| --- | --- | --- | --- | --- |
| placeholder | hint 提示信息 | `string` |  |  |
| allowClear | 可以点击清除图标删除内容 | `boolean` |  |  |
| value | 输入框内容 | `string` |  |  |
| onChange | 输入框内容变化时的回调 | `function(e)` |  |  |
| style | 自定义样式 | `Object` |  |  |
| isClearSearch | 输入框点击清空按钮触发搜索回调 | `boolean` | true | ^4.0.4 |

和 antd 的 props 配置参数相同，详见 antd 文档 https://ant.design/components/input-cn/#API

### select

| 参数 | 说明 | 类型 | 默认值 | 版本 |
| --- | --- | --- | --- | --- |
| placeholder | hint 提示信息 | `string` |  |  |
| allowClear | 可以点击清除图标删除内容 | `boolean` |  |  |
| disabled | 是否禁用 | `boolean` |  |  |
| value | 输入框内容 | `string` |  |  |
| showSearch | 使单选模式可搜索 | `boolean` |  |  |
| style | 自定义样式 | `Object` |  |  |
| onChange | 选中 option，或 input 的 value 变化时，调用此函数 | `function(value, option)` |  |  |

和 antd 的 props 配置参数相同，详见 antd 文档 https://ant.design/components/input-number-cn/#API

### datePicker

| 参数 | 说明 | 类型 | 默认值 | 版本 |
| --- | --- | --- | --- | --- |
| placeholder | hint 提示信息 | `string` |  |  |
| allowClear | 可以点击清除图标删除内容 | `boolean` |  |  |
| disabled | 禁用 | `boolean` |  |  |
| disabledDate | 不可选择的日期 | `(currentDate: moment) => boolean` |  |  |
| picker | 设置选择器类型 | `date、 week 、 month 、 quarter 、 year` |  |  |
| size | 输入框大小，large 高度为 40px，small 为 24px，默认是 32px | large、 middle 、 small |  |  |
| style | 自定义样式 | `Object` |  |  |
| onChange | 时间发生变化的回调 | `function(date: moment, dateString: string)` |  |  |

和 antd 的 props 配置参数相同，详见 antd 文档 https://ant.design/components/date-picker-cn/#API

### rangePicker

| 参数 | 说明 | 类型 | 默认值 | 版本 |
| --- | --- | --- | --- | --- |
| ranges | 预设时间范围快捷选择 | `{ [range: string]: moment[] } or { [range: string]: () => moment[] }` |  |  |
| style | 自定义样式 | `Object` |  |  |

和 antd 的 props 配置参数相同，详见 antd 文档 https://ant.design/components/date-picker-cn/#API

### radio

| 参数 | 说明 | 类型 | 默认值 | 版本 |
| --- | --- | --- | --- | --- |
| checked | 指定当前是否选中 | `boolean` |  |  |
| disabled | 禁用 Radio | `boolean` |  |  |
| value | 根据 value 进行比较，判断是否选中 | `any` |  |  |
| style | 自定义样式 | `Object` |  |  |
| onChange | 选项变化时的回调函数 | `function(e:Event)` |  |  |

和 antd 的 props 配置参数相同，详见 antd 文档 https://ant.design/components/radio-cn/#API

### cascader

| 参数 | 说明 | 类型 | 默认值 | 版本 |
| --- | --- | --- | --- | --- |
| placeholder | 输入框占位文本 | `string` |  |  |
| allowClear | 可以点击清除图标删除内容 | `boolean` |  |  |
| options | 可选项数据源 | `Option[]` |  |  |
| showSearch | 在选择框中显示搜索框 | `boolean` ｜ Object |  |  |
| style | 自定义样式 | `Object` |  |  |
| onChange | 选择完成后的回调 | `(value, selectedOptions) => void` |  |  |

和 antd 的 props 配置参数相同，详见 antd 文档 https://ant.design/components/cascader-cn/#API

### treeSelect

| 参数 | 说明 | 类型 | 默认值 | 版本 |
| --- | --- | --- | --- | --- |
| placeholder | 选择框默认文字 | `string` |  |  |
| allowClear | 显示清除按钮 | `boolean` |  |  |
| showSearch | 是否支持搜索框 | `boolean` |  |  |
| treeData | treeNodes 数据，如果设置则不需要手动构造 TreeNode 节点（value 在整个树范围内唯一） | `array<{value, title, children, [disabled, disableCheckbox, selectable, checkable]}>` |  |  |
| multiple | 支持多选（当设置 treeCheckable 时自动变为 true） | `boolean` |  |  |
| style | 自定义样式 | `Object` |  |  |
| onChange | 输入框内容变化时的回调 | `function(e)` |  |  |

和 antd 的 props 配置参数相同，详见 antd 文档 https://ant.design/components/tree-cn/#API
