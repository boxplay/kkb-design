## 快速入门

kkb-design 一套能够帮助你快速搭建后台页面的组件库<br/>
kkb-design 组件均符合开课吧后台系统规范<br/>
官方文档入口 <http://fe.kaikeba.com/kkb-design>

## 接入方式

1、yarnrc

```bash
"@base:registry" "https://registry-npm.kaikeba.com"
```

2、安装插件

```bash
yarn add @base/kkb-design

```

3、app.js入口处配置样式前缀

```js
import { deafultCss } from '@base/kkb-design'

// 样式前缀名，和ConfigProvider组件prefixCls要相同
deafultCss('cssPrefix')

export default class App extends Component {
  render() {
    return (
      <ConfigProvider prefixCls="cssPrefix">
        {/* ...其它 */}
      </ConfigProvider>
    )
  }
}
```
