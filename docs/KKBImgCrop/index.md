---
title: KKBImgCrop - 图片剪裁

nav:
  title: KKBImgCrop - 图片剪裁

---

## KKBImgCrop 介绍

## 常规剪裁图片

<code src='./demo/basic' title='剪裁简单使用' desc='剪裁图片src支持远程图片和本地File文件模式！'></code>

## 剪裁及预览

<code src='./demo/cropReview' title='剪裁加预览模式' desc='剪裁图片过程中，实时显示剪裁后的图片预览，并且支持默认剪裁大小块定义等！'></code>

## 等比剪裁及缩放

<code src='./demo/cropScale' title='缩放模式' desc='剪裁图片开启缩放图片功能模式，以及按比例剪裁图像！'></code>

## ImgCropProps

| 参数   | 说明     | 类型     | 默认值     | 版本 |
| ----- | -------- | ------- | --------- | --- |
| src | 剪裁图片资源 | `string \| File` |  |  |
| crop | 默认剪裁大小及位置 | `Crop` |  |  |
| minWidth | 剪裁最小宽度 | `number` |  |  |
| minHeight | 剪裁最小高度 | `number` |  |  |
| maxWidth | 剪裁最大宽度 | `number` |  |  |
| maxHeight | 剪裁最大高度 | `number` |  |  |
| disabled | 禁用剪裁 | `boolean` |  |  |
| rotate | 旋转剪裁图片 | `number` |  |  |
| scale | 缩放剪裁图片 | `number` | 0 |  |
| circularCrop | 是否开启圆形剪裁 | `boolean` |  |  |
| scaleFlag | 是否开启缩放剪裁模式 | `boolean` | false |  |
| imageStyle | 图片dom元素样式 | `object` |  |  |
| onChange | 每次更改作物时都会发生回调（即多次拖动/调整大小） | `(crop, percentageCrop) => void` |  |  |
| onComplete | 在调整大小、拖动或微移之后发生的回调 | `(crop, percentageCrop) => void` |  |  |
| onImageLoaded | 加载图像时发生的回调 | `(image: HTMLImageElement) => boolean` |  |  |
| onImageError | 如果图像加载错误时回调 | `(event) => void` |  |  |
| onDragStart | 当用户开始拖动或调整大小时发生的回调 | `(event) => void` |  |  |
| onDragEnd | 当用户在拖动或调整大小后释放光标或触摸时发生的回调 | `(event) => void` |  |  |
| renderComponent | 自定义HTML元素来代替图像 | `ReactNode` |  |  |
