## 快速入门

kkb-design 一套能够帮助你快速搭建后台页面的组件库<br/> kkb-design 组件均符合开课吧后台系统规范<br/> 官方文档入口 http://fe.kaikeba.com/kkb-design

## 接入方式

1、yarnrc

```bash
"@base:registry" "https://registry-npm.kaikeba.com"
```

2、安装插件

```bash
yarn add @base/kkb-design

```

## 发版流程

1. fe-doc 切换至 develop 分支
2. 执行 yarn
3. 修改版本号，kkb-design 项目执行 knpm publish
4. kkb-design 项目执行 yarn fedocs
5. 更新 fedocs 的 kkb-design 的版本号
6. 确定本地存有~/.ssh/fedocs_rsa
7. 如果是第一次执行，需要配置写的权限 chmod 600 ~/.ssh/fedocs_rsa
8. fedocs 执行 yarn deploy
9. 发版成功，fe.kaikeba.com 验收。
