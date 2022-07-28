---
title: KKBForm - 表单组件
order: 1
nav:
  title: KKBForm - 表单组件

group:
  title: 集成组件
  path: /vgeForm
  order: 3
---

## KKBForm 介绍

这是一个通用的 Form 组件，可以在详情、弹窗等等不同场景下使用！

上传组件需要自定义二级目录名称，不要使用默认目录！

```js
import { KKBConfig } from '@base/kkb-design';

KKBConfig({
  // 上传文件配置
  uploadOpts: {
    prefix: 'kkb/', // 上传二级目录名，默认kkb/
  },
});
```

## 标准化案例

<code src="./demo/basic" title="弹窗内使用" desc="通过弹窗内使用组件，隐藏内置按钮，通过ref暴露的方法获取表单参数值！"></code>

### 动态增加嵌套字段

<code src="./demo/comprehensiveDemo1" title="自定义动态添加组件" desc="动态添加字段嵌套组件, 支持默认展示一行, 支持添加组件的个数"></code>

### 动态增减表单字段

<code src="./demo/comprehensiveDemo2" title="动态添加组件" desc="动态添加表单项组件, 支持默认展示一行, 支持删除及组件添加的个数"></code>

### 综合示例

<code src="./demo/baseForm" title="多场景" desc="多种场景展示"></code>

### Input.Group 组合组件

<code src="./demo/inputGroup" title="输入框组合组件" desc="支持紧凑和非紧凑模式"></code>

### 复杂组件

<code src="./demo/complexForm" title="复杂组件" desc="formlist组合组件, 支持表单外区域自定义组件"></code>

<!-- 上面全是标准化案例，以下为开发者的demo示例 -->

## 开发案例

### 基础示例

<code src="./demo/basic" title="基本用法" desc="常规组件生成，每个组件都有onChange事件参数"></code>

<code src="./demo/basicClass" title="组件样式扩展" desc="内置组件会有弹性大小，但用户可以传入className字段去配置每个组件的宽占比属性！"></code>

<code src="./demo/hybridDemo" title="组件混合用法" desc="将多个组件混合成一个页面使用方式，可配置内置默认参数！自定义底部按钮区域组件，通过调用ref方法互form表单联动更新"></code>

<code src="./demo/refDemo1" title="表单联动" desc="将多个组件混合成一个页面使用方式，可配置内置默认参数！自定义底部按钮区域组件，通过调用ref方法互form表单联动更新"></code>

### 高阶用法示例

<code src="./demo/formExtrabottom" title="底部扩展组件" desc="自定义每个form item底部组件，并且form左侧label可以添加提示内容！"></code>

<code src="./demo/highDyRequired" title="动态改变必填" desc="通过参数动态改变某个组件是否必选，这只是简单的案例，你可以扩展出各种样式的玩法！"></code>

### 动态组件

<code src="./demo/dyAddInput" title="动态增减表单项" desc="动态增加、减少表单项。并且可以设置默认初始值"></code>

<code src="./demo/dyAddComList" title="自定义动态添加组件" desc="动态添加自定义组件，支持内置组件，传入参数同boxType字段类型！支持默认参数、限制添加组件数上限等功能。"></code>

### 其它示例

<code src="./demo/select" title="下拉类组件" desc="下拉多种场景展示，以及表单互动，推荐使用内置ref对象设置表单中的值，以达到不同组件相互联动效果"></code>

<code src="./demo/basicLayout" title="表单布局" desc="表单提供几种布局方式，默认是horizontal模式。"></code>

<code src="./demo/datePicker" title="日期类组件" desc="日期多种场景展示"></code>

### 上传组件示例

<code src="./demo/upload" title="图片类组件" desc="图片多种场景展示"></code>

<code src="./demo/uploadFile" title="上传文件demo" desc="通过upload组件配置不同参数实现文件上传功能"></code>

### 自定义组件

<code src="./demo/custom" title="自定义组件" desc="custom自定义组件，此场景比较符合单个页面自定义组件，如果有多处使用相同自定义组件，推荐使用热插拨API集成在内。<br><br>自定义组件会在返回的组件中挂载 `value, onChange` 二参数，用于绑定和触发form组件之间的交互更新"></code>

### 热插拨功能

<code src="./demo/swapDemo" title="热插拨使用案例" desc="通过内置热插拨组件API，在全局进行声明，配置自定义组件，其它地方就像使用内置组件一样，声明type即可！<br><br>自定义内置组件，<br>props.options 接收到的是boxData.options中所有参数<br><br>props.data 接收到的是boxData.data中所有参数<br><br>props.value 这是form实时返回的value值<br><br>props.onChange 这是form更新时触发的函数事件，传入需要更新视图表单的值。<br><br>需要注意props会挂载 `value, onChange` 二参数，用于绑定和触发form组件之间的交互更新"></code>

<code src="./demo/swapDemo2" title="热插拨使用案例2" desc="利用原生input组件去集成到form组件中去"></code>

## API

### Props

| 参数 | 说明 | 类型 | 默认值 | 版本 |
| --- | --- | --- | --- | --- |
| boxData | 定义生成组件的类型，[文档](#boxdata) | `GmBoxType[]` |  |  |
| saveBtnText | 保存按钮标题，当为 null 时隐藏组件 | `string \| null` | 保存 |  |
| cancelBtnText | 取消按钮标题，当为 null 时隐藏组件 | `string \| null` | 取消 |  |
| saveFn | 保存按钮 `submit` 事件 | `(values: FormValues) => void` |  |  |
| cancelFn | 取消按钮事件，如声明事件将取消默认内置事件 | `() => void` | 返回上一页 |  |
| defaultValue | 表单默认参数值 | `FormValues` |  |  |
| formAlign | 表单位置 | `center \| start \| end` | center |  |
| customBottomBtn | 自定义表单底部按钮组件 | `React.ReactElement` |  |  |
| bottomWrap | 底部按钮组件外层组件，一般用于权限控制之类 | `(el: React.ReactElement) => React.ReactElement` |  |  |
| labelAlign | label 标签的文本对齐方式 | `right \| left` | right |  |
| loading | 页面是否加载中 | `boolean` | false |  |
| wrapperCol | 需要为输入控件设置布局样式时，使用该属性，用法同 labelCol | `ColProps` |  |  |
| labelCol | label 标签布局，同 `<Col>` 组件，设置 span offset 值，如 {span: 3, offset: 12} 或 sm: {span: 3, offset: 12} | `ColProps` |  |  |
| layout | 表单布局模式 | `horizontal \| vertical` | horizontal |  |
| extra | 表单外自定义组件 | `(el: React.ReactElement) => React.ReactElement` |  |  |
| style | 外层样式 | `React.CSSProperties` |  |  |
| onValuesChange | 字段值更新时触发回调事件 | `function(changedValues, allValues)` |  |  |
| onFinishFailed | 提交表单且数据验证失败后回调事件 | `function({ values, errorFields, outOfDate })` |  |  |

### Ref

| 参数 | 说明 | 类型 | 默认值 | 版本 |
| --- | --- | --- | --- | --- |
| setValue | 设置表单的值 | `(values) => void` |  |  |
| getValue | 获取表单内所有值 | `() => any` |  |  |
| submit | 提交表单，与点击 submit 按钮效果相同 | `() => void` |  |  |
| validateFields | 触发表单验证 | `(nameList?: NamePath[]) => Promise` |  |  |
| resetFields | 重置一组字段到 initialValues | `(fields?: NamePath[]) => void` |  |  |
| formRef | antd formRef 完整实例，[FormInstance 文档](https://ant.design/components/form-cn/#FormInstance) | `FormInstance` |  |  |

### boxData

组件声明类型配置参数

| 参数 | 说明 | 类型 | 默认值 | 版本 |
| --- | --- | --- | --- | --- |
| type | 组件类型 | `GmDataType \| string` |  |  |
| label | 左侧标签内容 | `string \| React.ReactNode` |  |  |
| labelTips | 左侧标签，鼠标移入时提示的内容！ | `string[]` |  |  |
| name | form 表单 key 值(唯一) | `string` |  |  |
| className | 外层样式 | `string` |  |  |
| rules | form 表单验证规则 | `Rule[]` |  |  |
| noForm | 是否关闭 form 组件包裹 | `boolean` | false |  |
| data | 组件数据源 | `BoxDataItem[] \| any` |  |  |
| bottom | 自定义 form item 底部显示的组件 | `string \| React.ReactElement` |  |  |
| custom | 自定义组件函数，会暴露声明组件时的参数以及 formRef 完整实例等 | `(data: GmBoxType) => React.ReactElement` |  |  |
| options | 当前组件配置参数，基本同 antd 相关组件参数，或具体查看 [options 参数介绍](#options-参数) | `Object` |  |  |
| mapping | options 属性转换，将列表中属性换成指定的 label,value [mapping 参数介绍](#mapping) | `Object` |  |  |
| renderBoxDataItem | 支持自定义 options 属性转换 | `function` |  |  |

### mapping

| 参数  | 说明            | 类型     | 默认值 | 版本 |
| ----- | --------------- | -------- | ------ | ---- |
| label | 显示内容        | `string` |        |      |
| value | value，唯一标识 | `string` |        |      |

## options

每个组件的 options 参数不同，根据 type 字段分类。

例如： `type: KKBFORM_TYPE.radio` ，那么选择 radio 查看文档

### input

| 参数         | 说明                     | 类型          | 默认值 | 版本 |
| ------------ | ------------------------ | ------------- | ------ | ---- |
| placeholder  | hint 提示信息            | `string`      |        |      |
| allowClear   | 可以点击清除图标删除内容 | `boolean`     |        |      |
| maxLength    | 最大长度                 | `number`      |
|              |
| shortcontrol | 是否用宽度较短的组件     | `boolean`     | false  |
|              |
| disabled     | 是否禁用状态             | `boolean`     | false  |      |
| onChange     | 输入框内容变化时的回调   | `function(e)` |        |      |
| onPressEnter | 按下回车的回调           | `function(e)` |        |      |

和 antd 的 props 配置参数相同，详见 antd 文档 <https://ant.design/components/input-cn/#API>

### inputNum

| 参数 | 说明 | 类型 | 默认值 | 版本 |
| --- | --- | --- | --- | --- |
| placeholder | hint 提示信息 | `string` | 1 |  |
| step | 每次改变步数，可以为小数 | `number` |  |  |
| disabled | 是否禁用 | `boolean` |  |  |
| max | 最大值 | number | `number` |  |
| min | 最小值 | number | `number` |  |
| onChange | 变化时回调 | `function(value: number \| string)` |  |  |
| onPressEnter | 按下回车的回调 | `function(e)` |  |  |

和 antd 的 props 配置参数相同，详见 antd 文档 <https://ant.design/components/input-number-cn/#API>

### textArea

| 参数 | 说明 | 类型 | 默认值 | 版本 |
| --- | --- | --- | --- | --- |
| placeholder | hint 提示信息 | `string` |  |  |
| height | 组件高度 | `number` |  |  |
| maxLength | 内容最大字数限制，当为 null 时内容字数不限 | `number \| null` | 150 |  |
| onChange | 内容变化时的回调 | `function(e)` |  |  |
| triggerType | 输入内容时触发事件类型，onBlur 失去焦点时触发性能更高 | `onChange \| onBlur` | onChange |  |
| onPressEnter | 按下回车的回调 | `function(e)` |  |  |
| tipsFormatter | 自定义 tips 文案 | `(count: number, maxLength?: number) => string` |  |  |
| customBottom | 底部自定义元素 | `ReactNode \| value => ReactNode` |  |  |

和 antd 的 props 配置参数相同，详见 antd 文档 <https://ant.design/components/input-cn/#API>

<!-- ### dyInputs

| 参数                 | 说明                               | 类型          | 默认值                      | 版本 |
| -------------------- | ---------------------------------- | ------------- | --------------------------- | ---- |
| inputKey             | 定义 input 输入框 key              | `string`      |                             |      |
| inputDefalutValue    | 添加 input 组件时，追加默认参数    | `string`      |                             |      |
| inputPlaceholder     | hint 提示信息                      | `string`      |                             |      |
| textAreaKey          | 多行输入框 key，为空不显示         | `string`      |                             |      |
| textAreaDefalutValue | 添加多行输入框组件时，追加默认参数 | `string`      |                             |      |
| textAreaPlaceholder  | hint 提示信息                      | `string`      |                             |      |
| textAreaRules        | 多行输入框验证规则                 | `Rule[]`      | 默认使用 boxData.rules 规则 |      |
| textAreaMaxLen       | 多行输入框字数限制                 | `boolean`     |                             |      |
| onChange             | 输入框内容变化时的回调             | `function(e)` |                             |      |
| maxLength            | 内容最大长度                       | `number`      |                             |      | --> |

### dyAddComList

动态追加任意内部组件

| 参数 | 说明 | 类型 | 默认值 | 版本 |
| --- | --- | --- | --- | --- |
| formlist | 定义追加多个组件的类型，同 GmBoxType 参数，详见 boxData 文档 | `GmBoxType[]` |  |  |
| addText | 添加按钮文字内容 | `string` |  |  |
| title | item 标题内容 | `string` |  |  |
| removeFn | 移除事件回调，返回 true 可删除 | `boolean` |  |  |
| token | 全局的七牛上传 token，定义了此值在 formlist 中使用上传组件，不需要在次定义上传组件参数中的 token | `string` |  |  |
| addValue | 添加组件时，默认给组件赋值的参数，key 对应组件 name，value 为具体设置的默认参数 | `object` |  |  |
| maxNum | 最大限制，当添加参数时，超过此值将不可添加 | `number` |  |  |
| minNum | 最小限制，当添加参数时，低与此值将不可移除 | `number` |  |  |
| hiddenAdd | 超出最大添加数量时，是否隐藏添加按钮 | `boolean` | false |  |

### dyOperateItem

动态追加表单项为任意组件

| 参数 | 说明 | 类型 | 默认值 | 版本 |
| --- | --- | --- | --- | --- |
| formlist | 定义追加多个组件的类型，同 GmBoxType 参数，详见 boxData 文档 | `GmBoxType[]` |  |  |
| addText | 添加按钮文字内容 | `string` |  |  |
| title | item 标题内容 | `string` |  |  |
| removeFn | 移除事件回调，返回 true 可删除 | `boolean` |  |  |
| token | 全局的七牛上传 token，定义了此值在 formlist 中使用上传组件，不需要在次定义上传组件参数中的 token | `string` |  |  |
| addValue | 添加组件时，默认给组件赋值的参数，key 对应组件 name，value 为具体设置的默认参数 | `object` |  |  |
| maxNum | 最大限制，当添加参数时，超过此值将不可添加 | `number` |  |  |
| minNum | 最小限制，当添加参数时，低与此值将不可移除 | `number` |  |  |

### dyOperateList

动态追加表单项字段嵌套任意组件

| 参数 | 说明 | 类型 | 默认值 | 版本 |
| --- | --- | --- | --- | --- |
| formlist | 定义追加多个组件的类型，同 GmBoxType 参数，详见 boxData 文档 | `GmBoxType[]` |  |  |
| title | item 标题内容 | `string` |  |  |
| token | 全局的七牛上传 token，定义了此值在 formlist 中使用上传组件，不需要在次定义上传组件参数中的 token | `string` |  |  |
| addValue | 添加组件时，默认给组件赋值的参数，key 对应组件 name，value 为具体设置的默认参数 | `object` |  |  |
| maxNum | 最大限制，当添加参数时，超过此值将不可添加 | `number` |  |  |
| minNum | 最小限制，当添加参数时，低与此值将不可移除 | `number` |  |  |

### select

| 参数 | 说明 | 类型 | 默认值 | 版本 |
| --- | --- | --- | --- | --- |
| placeholder | 选择框默认文本 | `string` |  |  |
| allowClear | 可以点击清除图标删除内容 | `boolean` | true |  |
| showArrow | 是否显示下拉小箭头 | `boolean` | true |  |
| showSearch | 使单选模式可搜索 | `boolean` | false |  |
| mode | 设置 Select 的模式为多选或标签 | `multiple \| tags` |  |  |
| size | 选择框大小 | `large \| middle \| small` |  |  |
| disabled | 是否禁用 | `boolean` |  |  |
| onChange | 选中 option，或 input 的 value 变化时，调用此函数 | `function(value, option)` |  |  |
| onClear | 清除内容时回调 | `() => voide` |  |  |
| onSearch | 文本框值变化时回调 | `function(value)` |  |  |
| onSelect | 被选中时调用，参数为选中项的 value (或 key) 值 | `function(value, option)` |  |  |

和 antd 的 props 配置参数相同，详见 antd 文档 <https://ant.design/components/select-cn/#API>

### searchSelect

| 参数 | 说明 | 类型 | 默认值 | 版本 |
| --- | --- | --- | --- | --- |
| placeholder | 选择框默认文本 | `string` |  |  |
| allowClear | 可以点击清除图标删除内容 | `boolean` | true |  |
| showArrow | 是否显示下拉小箭头 | `boolean` | true |  |
| showSearch | 使单选模式可搜索 | `boolean` | true |  |
| mode | 设置 Select 的模式为多选或标签 | `multiple \| tags` |  |  |
| size | 选择框大小 | `large \| middle \| small` |  |  |
| disabled | 是否禁用 | `boolean` |  |  |
| onChange | 选中 option，或 input 的 value 变化时，调用此函数 | `function(value, option)` |  |  |
| onClear | 清除内容时回调 | `function` |  |  |
| onSearch | 文本框值变化时回调 | `function(value)` |  |  |
| onSelect | 被选中时调用，参数为选中项的 value (或 key) 值 | `function(value, option)` |  |  |

和 antd 的 props 配置参数相同，详见 antd 文档 <https://ant.design/components/select-cn/#API>

### tagsSelect

| 参数 | 说明 | 类型 | 默认值 | 版本 |
| --- | --- | --- | --- | --- |
| placeholder | 选择框默认文本 | `string` |  |  |
| allowClear | 可以点击清除图标删除内容 | `boolean` | true |  |
| size | 选择框大小 | `large \| middle \| small` |  |  |
| disabled | 是否禁用 | `boolean` |  |  |
| onChange | 选中 option，或 input 的 value 变化时，调用此函数 | `function(value, option)` |  |  |
| onClear | 清除内容时回调 | `function` |  |  |

和 antd 的 props 配置参数相同，详见 antd 文档 <https://ant.design/components/select-cn/#API>

### radio

| 参数 | 说明 | 类型 | 默认值 | 版本 |
| --- | --- | --- | --- | --- |
| placeholder | hint 提示信息 | `string` |  |  |
| size | 大小，只对按钮样式生效 | `large \| middle \| small` |  |  |
| optionType | 用于设置 Radio options 类型 | `default \| button` |  |  |
| buttonStyle | RadioButton 的风格样式，目前有描边和填色两种风格 | `outline \| solid` |  |  |
| onChange | 选项变化时的回调函数 | `function(e)` |  |  |

和 antd 的 props 配置参数相同，详见 antd 文档 <https://ant.design/components/radio-cn/#API>

### checkbox

| 参数        | 说明             | 类型                     | 默认值 | 版本 |
| ----------- | ---------------- | ------------------------ | ------ | ---- |
| placeholder | hint 提示信息    | `string`                 |        |      |
| direction   | 全选按钮排列方式 | `row \| column`          | `row`  |      |
| allBtn      | 是否显示全选按钮 | `boolean`                | true   |      |
| onChange    | 变化时回调函数   | `function(checkedValue)` |        |      |

和 antd 的 props 配置参数相同，详见 antd 文档 <https://ant.design/components/checkbox-cn/#API>

### switch

| 参数 | 说明 | 类型 | 默认值 | 版本 |
| --- | --- | --- | --- | --- |
| size | 开关大小，可选值：default small | `string` |  |  |
| checkedChildren | 选中时的内容 | `ReactNode` |  |  |
| unCheckedChildren | 非选中时的内容 | `ReactNode` |  |  |
| disabled | 是否禁用 | `boolean` | false |  |
| onChange | 点击时回调函数 | `function(checked, event)` |  |  |

和 antd 的 props 配置参数相同，详见 antd 文档 <https://ant.design/components/switch-cn/#API>

### datePicker

| 参数 | 说明 | 类型 | 默认值 | 版本 |
| --- | --- | --- | --- | --- |
| placeholder | 输入框内容 | `string` |  |  |
| showTime | 增加时间选择功能 | `Object \| boolean` |  |  |
| allowClear | 是否展示清除按钮 | `boolean` | true |  |
| format | 展示的日期格式 | `string` | YYYY-MM-DD HH:mm:ss |  |
| disabledDate | 不可选择的日期 | `(currentDate: moment) => boolean` |  |  |
| ranges | 预设时间范围快捷选择 | { `[range: string]: moment[] } \| { [range: string]: () => moment[] }` |  |  |
| picker | 设置选择器类型 | `date \| week \| month \| quarter \| year` |  |  |
| size | 大小，只对按钮样式生效 | `large \| middle \| small` |  |  |
| onChange | 时间发生变化的回调 | `function(date, dateString)` |  |  |

和 antd 的 props 配置参数相同，详见 antd 文档 <https://ant.design/components/date-picker-cn/#API>

### rangePicker

| 参数 | 说明 | 类型 | 默认值 | 版本 |
| --- | --- | --- | --- | --- |
| placeholder | 输入框提示文字 | `[string, string]` |  |  |
| showTime | 增加时间选择功能 | `Object \| boolean` |  |  |
| allowClear | 是否展示清除按钮 | `boolean` | true |  |
| format | 展示的日期格式 | `string` | YYYY-MM-DD HH:mm:ss |  |
| disabledDate | 不可选择的日期 | `(currentDate: moment) => boolean` |  |  |
| ranges | 预设时间范围快捷选择 | { `[range: string]: moment[] } \| { [range: string]: () => moment[] }` |  |  |
| picker | 设置选择器类型 | `date \| week \| month \| quarter \| year` |  |  |
| size | 大小，只对按钮样式生效 | `large \| middle \| small` |  |  |
| onChange | 时间发生变化的回调 | `function(date, dateString)` |  |  |

和 antd 的 props 配置参数相同，详见 antd 文档 <https://ant.design/components/date-picker-cn/#API>

### uploadImg

单图上传参数

| 参数 | 说明 | 类型 | 默认值 | 版本 |
| --- | --- | --- | --- | --- |
| token | 上传图片七牛 token（必传） | `string` |  |  |
| btnTitle | 上传按钮文字 | `string` | `点击上传` |  |
| accept | 上传文件类型限制 image audio video | `string` | `image/*` |  |
| data | 自定义上传参数 | `object` |  |  |
| headers | 自定义上传头部参数 | `object` |  |  |
| isImageDesc | 是否开启描述 | `boolean` | false |  |
| imageSize | img 尺寸 [宽，高] | `number[]` |  |  |
| fixedSize | 是否验证 img 图片尺寸完全相等 | `boolean` | false |  |
| imageVolume | 限制图片体积大小 | `ImageVolumeType` |  |  |
| imageType | 图片格式描述 | `string[]` |  |  |
| imageSizeDesc | 图片尺寸描述，不写默认展示 imageSize 参数 | `object` |  |  |
| hideViewIcon | 是否隐藏查看 icon 按钮 | `boolean` | false |  |
| hideDelIcon | 是否隐藏删除 icon 按钮 | `boolean` | false |  |
| onRemove | 移除按钮回调，返回 true 为删除 | `(files, file) => Promise<boolean>` |  |  |
| customRequest | 自定义上传 | `(options) => void` |  |  |
| onStart | 自定义上传开始上传回调 | `(file) => void` |  |  |
| onSuccess | 自定义上传成功回调 | `(res, file) =>void` |  |  |
| onError | 自定义上传失败回调 | `(err) => void` |  |  |
| onProgress | 自定义上传进度回调 | `(data, file) => void` |  |  |

点此跳转到：[uploadImg 更全文档](https://fe.kaikeba.com/kkb-design/KKBUpload/upload#kkbuploadimg-props)

### uploadImgMultiple

多图上传参数

| 参数 | 说明 | 类型 | 默认值 | 版本 |
| --- | --- | --- | --- | --- |
| token | 上传图片七牛 token（必传） | `string` |  |  |
| btnTitle | 上传按钮文字 | `string` | `点击上传` |  |
| accept | 上传文件类型限制 image audio video | `string` | `image/*` |  |
| isImageDesc | 是否开启描述 | `boolean` | false |  |
| imageSize | img 尺寸 [宽，高] | `number[]` |  |  |
| imageVolume | 限制图片体积大小 | `ImageVolumeType` |  |  |
| imageType | 图片格式描述 | `string[]` |  |  |
| imageSizeDesc | 图片尺寸描述，不写默认展示 imageSize 参数 | `object` |  |  |
| hideViewIcon | 是否隐藏查看 icon 按钮 | `boolean` | false |  |
| hideDelIcon | 是否隐藏删除 icon 按钮 | `boolean` | false |  |
| multiple | 是否支持多选图片 | `boolean` | false |  |
| totalNum | 上传数量限制 | `number` |  |  |
| limitShowBtn | 超出数量限制是否显示上传按钮 | `boolean` | false |  |
| onRemove | 移除按钮回调，返回 true 为删除 | `(files, file) => Promise<boolean>` |  |  |

### uploadFile

文件上传参数

| 参数 | 说明 | 类型 | 默认值 | 版本 |
| --- | --- | --- | --- | --- |
| token | 上传图片七牛 token（必传） | `string` |  |  |
| btnTitle | 上传按钮文字，支持传入 react 组件 | `string \| React.ReactNode` | `点击上传` |  |
| btnType | 上传按钮显示模式，dragger 拖拽按钮 | `dragger \| button` | button |  |
| accept | 上传文件类型限制 image audio video | `string` |  |  |
| data | 自定义上传参数 | `object` |  |  |
| headers | 自定义上传头部参数 | `object` |  |  |
| directory | 支持上传文件夹（caniuse） | `boolean` | false |  |
| fileVolume | 限制图片体积大小 | `ImageVolumeType` |  |  |
| onRemove | 移除按钮回调，返回 true 为删除 | `(files, file) => Promise<boolean>` |  |  |
| hideViewIcon | 是否隐藏查看 icon 按钮 | `boolean` | false |  |
| hideDelIcon | 是否隐藏删除 icon 按钮 | `boolean` | false |  |
| onDownload | 点击下载文件时的回调，如果没有指定，则默认跳转到文件 url 对应的标签页 | `(file) => boolean` | (跳转新标签页) |  |
| onPreview | 点击文件链接或预览图标时的回调 | `(file) => boolean` |  |  |
| doneCb | 单个文件上传完后回调 | `(files) => void` |  |  |
| maxCount | 限制上传数量 | `number` |  |  |
| replaceFile | 当超出限制上传数量时，是否替换当前文件。只有当 maxCount 为 1 时才生效，始终用最新上传的文件代替当前文件 | `boolean` | true |  |
| multiple | 是否支持多选文件，ie10+ 支持。开启后按住 ctrl 可选择多个文件 | `boolean` | false |  |
| btnDisabled | 是否禁用上传按钮，只有 btnType 类型为 button 才有效 | `boolean` | false |  |
| customRequest | 自定义上传 | `(options) => void` |  |  |
| onStart | 自定义上传开始上传回调 | `(file) => void` |  |  |
| onSuccess | 自定义上传成功回调 | `(res, file) =>void` |  |  |
| onError | 自定义上传失败回调 | `(err) => void` |  |  |
| onProgress | 自定义上传进度回调 | `(data, file) => void` |  |  |

点此跳转到：[uploadImg 更全文档](https://fe.kaikeba.com/kkb-design/KKBUpload/upload#kkbuploadfile-props)

### inputGroup

文件上传参数

| 参数 | 说明 | 类型 | 默认值 | 版本 |
| --- | --- | --- | --- | --- |
| compact | 是否用紧凑模式 | `boolean` | false |  |
| size | Input.Group 中所有的 Input 的大小，可选 large default small | `string` | default |  |

和 antd 的 props 配置参数相同，详见 antd 文档 <https://ant.design/components/input-cn/#API>
