---
title: KKBUpload - 上传组件

group:
  path: /KKBUpload
  title: KKBUpload - 上传组件
  order: 1
---

## KKBUpload 介绍

基于 antd upload 二次封装的上传组件

用户可传输文件或提交相应的内容。

注：上传分为"阿里上传"和"七六上传",可参考**图片上传**

---
## 图片上传
### 基础上传
可进行基本上传操作

#### 阿里上传
<code src='./demo/imgAli' title='阿里上传' desc='阿里上传示例'></code>

#### 七牛上传
<code src='./demo/img' title='七牛上传' desc='七牛上传示例'></code>

### 按宽高比上传
[测试图片地址](https://img.kaikeba.com/a/536112402202emns.jpg)
<code src='./demo/imgAspectRatio' title='按宽高比上传' desc='按宽高比上传'></code>

### 多图上传
可用于添加一张或多张图片，当上传照片数到达限制后，上传按钮消失

<code src='./demo/picMultiple' title='多图上传功能演示' desc='多图上传示例'></code>

### 表单使用图片上传
<code src='./demo/formImg' title='表单使用图片上传' desc='综合使用'></code>

### 图片剪裁

<code src='./demo/imgCrop' title='可以配置开启上传图片前，进行剪裁操作，剪裁功能只支持单图上传' desc='图片剪裁功能'></code>

## 文件上传
### 默认
可单次上传一个或多个文件，限制上传文件数
<code src='./demo/file'></code>

### 单个拖入上传
把文件拖入指定区域，完成上传，同样支持点
<code src='./demo/dragUpload' title='单个拖入上传' desc='综合使用'></code>
### 多个拖入上传
支持批量上传多个文件。
<code src='./demo/dragUploadMultiple' title='多个拖入上传' desc='综合使用'></code>
### 上传页面样式
页面级上传
<code src='./demo/dragUploadPage' title='页面级上传' desc='综合使用'></code>

### 表单使用上传文件
<code src='./demo/formFile' title='表单使用上传文件' desc='综合使用'></code>
### 内置状态组件
<code src='./demo/dragUploadStatus' title='内置状态组件' desc='综合使用'></code>

## Api

### KKBUploadImg Props

图片上传参数

| 参数 | 说明 | 类型 | 默认值 | 版本 |
| --- | --- | --- | --- | --- |
| action | 自定义上传地址 自定义上传时必传 | `string` |  | 4.0.1 |
| imgHost | 图片返回拼接路径 自定义上传时必传 | `string` |  | 4.0.1 |
| bucketName | 桶名 找基础技术部康瑞伟申请 | `string` |  | 4.0.1 |
| env | 环境变量 | `dev | test | pre | prod` |  | 4.0.1 |
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
| customRequest | 自定义      上传 | `(options) => void` |  |  |
| onStart | 自定义上传开始上传回调 | `(file) => void` |  |  |
| onSuccess | 自定义上传成功回调 | `(res, file) =>void` |  |  |
| onError | 自定义上传失败回调 | `(err) => void` |  |  |
| onProgress | 自定义上传进度回调 | `(data, file) => void` |  |  |
| isCrop | 是否开启剪裁 | `boolean` |  |  |
| cropOpts | 剪裁配置 | `CropViewProps` |  |  |
| singlePreview         |  是否单图预览          | `boolean`                     |    `false`    |      |
| useAspectRatio         |  使用宽高比上传，`使用该属性时，imageSize必传且值必须大于0`          | `boolean`                     |    `false`    |      |


### CropViewProps 剪裁参数

| 参数      | 说明           | 类型                   | 默认值 | 版本 |
| --------- | -------------- | ---------------------- | ------ | ---- |
| onSuccess | 剪裁成功后回调 | `(file: File) => void` |        |      |
| onCancel  | 取消剪裁回调   | `() => void`   |        |      |
| minWidth  |   最小剪裁宽度   | `number`   |        |      |
| maxWidth  |   最大剪裁宽度   | `number`   |        |      |
| minHeight |  最小剪裁高度   | `number`    |        |      |
| maxHeight |  最大剪裁高度   | `number`    |        |      |
| cropInfo    |   是否显示剪裁信息      | `CropInfo`                     |        |      |
|  circularCrop         |    是否圆形剪裁        | `boolean`                     |        |      |
|  scaleFlag         |  是否开启缩放图片          | `boolean`                     |    `false`    |      |

### KKBUploadFile Props

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
| showUploadList | 是否展示文件列表, 可设为一个对象，用于单独设定 showPreviewIcon, showRemoveIcon, showDownloadIcon, removeIcon 和 downloadIcon | 用法同[antd-upload](https://ant.design/components/upload-cn/#components-upload-demo-customize-progress-bar) |  | `4.0.1` |
| iconRender | 自定义显示 icon, `在ant基础上增加了根据文件扩展名定义icon` | `(file: UploadFile, listType?: UploadListType) => ReactNode` |  | `4.0.1`  |
| page | 页面级上传，`仅支持拖拽/点击上传` |`boolean`|  | `4.0.1`  |
| fileImportStatus | 文件导入状态，需搭配 `disabled` 使用, [demo](/KKBUpload/upload#内置状态组件) | `start`, `success`, `fail` ,`loading`, `undefined` |  | `4.0.1`  |
| disabled | 是否禁用 | `boolean` | false | `4.0.1`  |
| renderStatusNode | 渲染导入状态组件,[demo](/KKBUpload/upload#内置状态组件) | `function` , <br/>返回值： `{uploadNode: (props: any) => React.ReactNode, status: start ,success ,fail, loading, undefined}`  | | `4.0.1` |


fileList前置icon支持的文件类型
|类型|扩展名|
| --- | --- |
|视频|.avi,.mpg,.mlv,.mpeg,.dat, .mov, .wmv, .rm, .swf,.flv,mp4|
|图片|.png,.jpg,.jpeg,.gif,.svg,.bmp,.webp, .tif|
|pdf|.pdf|
|excel|.xlsx, .xls|
|word|.doc, .docx|
|ppt|.ppt, .pptx|
|音频|.cda, .wav, .mp3, .mp1, .amr, .mp2, .mmf, .aac, .mid,.vqf,.ogg, .ra, .ape, .flac|
|压缩包|.zip, .rar, .arj, .tar, .gz, .z, .ari, .arc, .7z, .001, .bz, .taz, .zipx|

### statusCom
> `4.0.1`开始支持
#### Loading
| 参数 | 说明 | 类型 | 默认值 | 版本 |
| --- | --- | --- | --- | --- |
| tips | 上传中文案提示 | `array` |  |  |

#### Success、Loading、Fail
| 参数 | 说明 | 类型 | 默认值 | 版本 |
| --- | --- | --- | --- | --- |
| title | 提示信息中标题 | `string`, React.ReactNode  |  |  |
| desc | 提示信息中描述 | `string`, React.ReactNode  |  |  |

