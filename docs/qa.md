---
title: 常见问题
order: 1

nav:
  title: 常见问题
---

## 常见问题

1. 国际化
```js
import { ConfigProvider } from '@base/kkb-design';
import zhCn from '@base/kkb-design/es/lib/locale/zh_CN'

···

return (
  <ConfigProvider locale={locale}>
    ···
  </ConfigProvider>
)

```

2. layout黑色
```js
  //涉及的layout均替换为@base-deisgn组件
```

3. 边距问题
```js

 // 各项目layout中容器组件有 style={{ margin: '0 16px' }}
 // 使用kkb-design组件的页面中加容器组件包裹 style={{ margin: '0 -16px' }}

```

4. 样式问题
```js
// app.js
import '@base/kkb-design/dist/index.css'
```

5. 自定义样式前缀
```js
// app.js
deafultCss(package.name)

```


## 联系人
 - 崔钰
