---
title: use内置扩展组件
order: 10
nav:
  title: use内置扩展组件

group:
  title: 集成组件
  path: /vgeForm
  order: 3
---

## 扩展组件介绍

vgeform 组件扩展了一些组件，但默认未挂载在组件中，扩展组件全部引入会导致打包体积过大，所以按需引入需要的组件到 vgeConfig 热插拨中，从而减少打包体积！

使用方式就是内置集成组件一样即可，看文档配置参数！

1、在全局处引入 vgeConfig 方法，并且挂载自己需要的组件。此方法此需要执行一次即可

```js | pure
import { vgeConfig, UseDyDndListModel } from '@base/kkb-design';

vgeConfig({
  // gmForm热插拨配置
  gmFormUse: [
    {
      type: 'dyDndListModel', // 声明自定义组件type名称
      component: UseDyDndListModel, // 传入内置use组件
    },
  ],
});
```

2、在使用 gmForm 组件的方式如下：

```jsx | pure
import React, { useEffect, useState, useRef } from 'react';
import {
  vgeConfig,
  GmForm,
  GMFORM_TYPE,
  UseDyDndListModel,
} from '@base/kkb-design';

const useMyCustomName = 'dyDndListModel';

const App = () => {
  const [boxData, setBoxData] = useState([]);

  useEffect(() => {
    const boxDataType = [
      {
        type: 'dyDndListModel', // 传入热插拨配置中的name名称，
        name: 'dyDnd1', // 表单的key
        label: '动态列表1',
      },
    ];
    setBoxData(boxDataType);
  }, []);

  return <GmForm boxData={boxData} />;
};
```

## 使用案例

### dyDndListModel 示例

<code src="./demo/DyDndListModel" title="动态扩展组件（可排序）" desc="动态添加list组件，并且支持拖拽排序功能"></code>

## API

props 其它参数查看 GmForm 组件介绍（通用），这里只作 options 参数详细介绍

## options

每个组件的 options 参数不同，根据 type 字段分类。

例如：`type: GMFORM_TYPE.dyDndListModel`，那么选择 dyDndListModel 查看文档

### dyDndListModel

| 参数        | 说明                                                                                                              | 类型                                  | 默认值       | 版本 |
| ----------- | ----------------------------------------------------------------------------------------------------------------- | ------------------------------------- | ------------ | ---- |
| modalTitle  | 编辑弹层标题                                                                                                      | `string`                              | `编辑`       |      |
| formlist    | 动态添加的组件列表，同 gmForm 中 boxData 配置相同                                                                 | `GmBoxType[]`                         |              |      |
| maxNum      | 最大可添加数量限制                                                                                                | `number`                              |              |      |
| minNum      | 最小可移除数量，低与指定值不可删除                                                                                | `number`                              |              |      |
| hiddenAdd   | 超出最大添加数量时，是否隐藏添加按钮                                                                              | `boolean`                             | false        |      |
| disableDrap | 是否禁用拖拽列表功能                                                                                              | `boolean`                             |              |      |
| customTitle | 自定义列表中标题                                                                                                  | `(text: string, i: number) => string` | `参数 index` |      |
| customDesc  | 自定义列表中描述                                                                                                  | `(text: string, i: number) => string` |              |      |
| mapping     | 列表映射字段，指定标题、描述映射到 formlist 中指定组件，此参数与`customTitle\|customDesc`二参数互斥，不能同时使用 | `object`                              |              |      |
| addValue    | 添加组件时，默认给组件赋值的参数，key 对应组件 name，value 为具体设置的默认参数                                   | `object`                              |              |      |
