---
title: KKBMenu - 菜单组件

nav:
  title: KKBMenu - 菜单组件


group:
  path: /KKBMenu
  title: KKBMenu - 菜单组件
  order: 1
---

## KKBMenu 介绍
<p>kkb-design KKBMenu 基于 antd 二次封装</p>
<p>支持原antd各属性</p>

## 代码演示

<code src='./demo/index' title='案例' desc='综合使用'></code>


### KKBMenu 参数

| 参数       | 说明         | 类型            | 默认值 | 版本 |
| ---------- | ------------ | --------------- | ------ | ---- |
| kkbTheme    | 主题 | dark \| light \| object[cssVars]      |        |      |
| topSlot    | 菜单顶部插槽 | react.reactNode |        |      |
| bottomSlot | 菜单底部插槽 | react.reactNode |        |      |

#### cssVars
```
  --menu-bg-color: #F2F5FC; // 默认菜单颜色
  --menu-bg-hover-color: #E4E9F7; // hover菜单颜色
  --menu-bg-selected-color: #015DFF; // 选中菜单颜色
  --menu-font-color: #3E4D88; // 菜单字体颜色
  --menu-font-selected-color: #FFFFFF; // 菜单选中后字体颜色
  --submenu-font-selected-color: #015DFF; // 子菜单选中后父菜单颜色

  // 折叠后的弹框样式变量
  --menu-modal-bg-color: #fff;// 默认菜单颜色
  --menu-modal-bg-hover-color: #E4E9F7; // hover菜单颜色
  --menu-modal-bg-selected-color: #015DFF; // 选中菜单颜色
  --menu-modal-font-color: #3E4D88;// 菜单字体颜色
  --menu-modal-font-selected-color: #FFFFFF;// 菜单选中后字体颜色
  --submenu-modal-font-selected-color: #015DFF;// 子菜单选中后父菜单颜色
```

### SubMenu 参数

| 参数            | 说明                   | 类型    | 默认值 | 版本 |
| --------------- | ---------------------- | ------- | ------ | ---- |
| inlineCollapsed | 收起情况下的菜单 title | boolean | false  |      |
