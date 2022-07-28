---
title: 更新日志
order: 1

nav:
  title: 更新日志
---

## 更新日志

修订版本号：每周四会进行日常 bugfix 更新。（如果有紧急的 bugfix，则任何时候都可发布）

次版本号：带有新特性的向下兼容的版本。

主版本号：含有破坏性更新和新特性。

icon: 🐞 修复问题; 💄 样式相关; 🔥 新增内容; 🚧 文件调整; 🆕 新增属性；

### v4.0.1
`2022-04-15`
* 🆕 kkbSearch 新增粘贴搜索 
* 🆕 kkbTable  新增自定义列 竖向按钮排列  增加使用案例
* 🆕 新增KKBEdiTable可编辑表格 支持单行编辑｜多行编辑｜整体编辑｜单元格编辑功能
* 🆕 kkbUpload 重写上传逻辑 增加阿里上传 增加使用案例 优化样式
* 🆕 kkbIcon 新增icon
* 🆕 kkbPagenation  增加使用案例
* 🆕 主题色变更 （配合cli 升级使用）
* 🆕 适配webpack5


### v3.0.3
`2022-03-10`
* 🆕 kkbSearch 新增defaultCollaps
### v3.0.2
`2022-02-28`
* 🚧 调整项目依赖
### v3.0.1
`2022-02-28`
* 🚧 调整项目依赖
### v3.0.0
`2022-02-25`
* 🔥 新增上传阿里云 七牛云方法及token
* 🔥 新增可编辑table组件
### v2.2.5
`2022-02-28`
* 🔥 支持webpack5.
* 🚧 修复react-router-dom依赖问题
### ~~v2.2.4~~ （已废弃！）
~~`2022-02-25`~~
* ~~🔥 支持webpack5.~~
### v2.2.3

 `2022-02-17`

* 🐞 修复剪裁组件 不同机型的兼容性问题
* 🚧 扩展uploadImg上传图片组件，剪裁可滚动功能

### v2.2.2

 `2022-02-08`

* 🔥 新增kkbInput组件 支持自定义连接
* 🔥 新增KKBEdiTable组件 支持多行｜单行编辑 单元格编辑 全部编辑
* 🐞 修复KKBImgCrop组件 可选参数的容错性

### v2.2.1

 `2022-02-08`

* 🔥 新增剪裁图片组件

### v2.2.0

 `2022-02-08`

* 🔥 上传图片组件扩展 剪裁图片功能

### v2.1.3

 `2022-01-19`

* 💄 更新kkbMenu组件白色主题样式

### v2.1.2

 `2022-01-10`

* 🐞 修复KKBSearch组件 Select的禁用失效问题

### v2.1.1

 `2021-12-30`

* 🚧 uploadImg(图片上传)组件 扩展imageSize可验证的灵活性，可只配单个宽或高参数
* 🐞 修复uploadImg图片描述不对，优先展示imageSizeDesc字段
* 🐞 修复KKBForm组件 Select的禁用失效问题

### v2.1.0

 `2021-12-24`

* 🚧 新增uploadFile(文件上传) ｜ uploadImg(图片上传)组件
* 兼容antd@4.18.0 Form.item 移除fieldKey属性

### v2.0.5

 `2021-12-17`

* KKBTable 修复styleType='time' | 'money'时 空值处理
* colums新增defaultSymbol字段 styleType='time' | 'money'时 空值处理 展示字段默认‘-’

### v2.0.4

 `2021-12-16`

* KKBFrom 动态组件支持校验及上传组件删除按钮可配置

### v2.0.1

 `2021-12-13`

* KKBFrom 上传组件支持自定义上传其他服务器

### v2.0.0

 `2021-12-13`

* KKBMenu KKBLayout.header 添加 kkbTheme属性（'dark' | 'light' | object[css变量名: value]）

### v1.3.14

 `2021-12-09`

* 🐞修复uploadImg disabled属性失效问题

### v1.3.13

 `2021-12-03`

* 🐞修复dataBox中span ！== 8 时折叠出现问题

### v1.3.11

* KKBPagination 分页 total属性支持string

### v1.3.10

* KKBTable修复当选择分页数大于总数时分页器被隐藏的问题,      `1.3.9更新的功能已废弃`

### v1.3.9

* KKBTable的分页器当数据记录总数`total`少于或等于每页所展示数量时隐藏`pageSize`

### v1.3.8

* KKBForm 中Select label废除`suffix`属性，增加renderBoxDataItem方法

### v1.3.7

* KKBForm 中Select label增加后缀`suffix`

### v1.3.5

* 修复上传图片生成文件规则
* 修复KKBTable的onChange事件，搜索组件未反馈此事件

### v1.3.1

* KKBTable actionList 支持函数渲染

### v1.2.29

* KKBTable handleProps>rightArea 新增 options | render 属性 支持自定义渲染 修复按钮区域传入属性

### v1.2.28

* KKBSearch 新增 customBtn 自定义按钮插槽

### v1.2.27

* KKBTable 新增 resetPageSize 是否重置 pagesize

### v1.2.26

* KKBTable 修复 重置修改 pageSize 至初始状态
* Table bordered 属性修复

### v1.2.25

* KKBMenuDataDriven 发布

### v1.0.8

* table 组件添加容错
* 清除 KKBSearch 组件引入的全局样式

### v1.0.6

* 面包屑使用 react-router-dom

### v1.0.3

* 分页总数为零时取消显示分页组件

### v1.0.0

* 新增 KKBTable, KKBSearch, KKBHeader, KKBContent 组件
* Button 组件 type 新增属性'success、warning'、新增 radius、afterIcon 属性
* Tabs 组件新增 commonstyle 属性
