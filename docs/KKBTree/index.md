---
title: KKBTree - 树形控件

nav:
  title: KKBTree - 树形控件

group:
  path: /KKBTree
  title: KKBTree - 树形控件
  order: 1
---

## KKBTree 介绍

KKBTree 组件，可拖拽的树形控件，支持任意拖拽、同级拖拽等

## 案例演示

<code src='./demo/dragBasic' title='基本拖拽' desc='最简单的拖拽用法，可支持任意层级拖拽控制'></code>

<code src='./demo/dragLevel' title='同级拖拽' desc='指定层级拖拽，相同层级之间才可被拖拽'></code>

<code src='./demo/dragTool' title='拖拽工具栏' desc='拖拽内置新增、删除、拖拽功能action方法，action方法详细使用见demo案例！comRender为内置组件'></code>

<code src='./demo/dragRef' title='tree组件ref演示(受控组件)' desc='KKBTree组件内部挂载ref上一些方法，例如treeFindPath查找指定节点，以及addTreeKey给数据添加唯一key。'></code>

## API

### props

| 参数 | 说明 | 类型 | 默认值 | 版本 |
| --- | --- | --- | --- | --- |
| treeTitleRender | 自定义每个树节点渲染组件，内置暴露 action 控制当前节点的方法 | `(treeItem, action, comRender) => React.Node` |  |  |
| treeData | treeNodes 数据，如果设置则不需要手动构造 TreeNode 节点（key 在整个树范围内唯一） | `array<{key, title, children, [disabled, selectable]}>` |  |  |
| autoExpandParent | 是否自动展开父节点 | `boolean` | false |  |
| checkable | 节点前添加 Checkbox 复选框 | `boolean` | false |  |
| defaultCheckedKeys | 默认选中复选框的树节点 | `string[]` | [] |  |
| defaultExpandAll | 默认展开所有树节点 | `boolean` | false |  |
| defaultExpandedKeys | 默认展开指定的树节点 | `string[]` | [] |  |
| defaultExpandParent | 默认展开父节点 | `boolean` | true |  |
| defaultSelectedKeys | 默认选中的树节点 | `string[]` | [] |  |
| disabled | 将树禁用 | `boolean` | false |  |
| draggable | 设置节点可拖拽 | `boolean \| (node: DataNode) => boolean` | false |  |
| expandedKeys | （受控）展开指定的树节点 | `string[]` | [] |  |
| onDragEnd | dragend 触发时调用 | `function({event, node})` | - |  |
| onDragEnter | dragenter 触发时调用 | `function({event, node, expandedKeys})` | - |  |
| onDragLeave | dragleave 触发时调用 | `function({event, node})` | - |  |
| onDragOver | dragover 触发时调用 | `function({event, node})` | - |  |
| onDragStart | 开始拖拽时调用 | `function({event, node})` | - |  |
| onDrop | drop 触发时调用 | `function({event, node, dragNode, dragNodesKeys}, {dragPosLevel, parentPosLevel})` | - |  |
| onExpand | 展开/收起节点时触发 | `function(expandedKeys, {expanded: bool, node})` | - |  |
| onLoad | 节点加载完毕时触发 | `function(loadedKeys, {event, node})` | - |  |
| onRightClick | 响应右键点击 | `function({event, node})` | - |  |
| onSelect | 点击树节点触发 | `function(selectedKeys, {selected: bool, selectedNodes, node, event})` | - |  |

其它参数同 antd tree 配置参数相同，详见 antd 文档 https://ant.design/components/tree-cn/#API

### refs

| 参数 | 说明 | 类型 | 默认值 | 版本 |
| --- | --- | --- | --- | --- |
| treeFindPath | 查找指定节点方法，返回查找到的节点及父节点数据 | `({tree, diffFn, savePathFn})=>TreeDataItem[]` |  |  |
| addTreeKey | 给 treeData 数据添加唯一 key（以层级索引表述的 key），返回一个新 treeData | `(treeArr: TreeDataItem[]) => TreeDataItem[]` |  |  |

### TreeNode props

| 参数 | 说明 | 类型 | 默认值 | 版本 |
| --- | --- | --- | --- | --- |
| checkable | 当树为 checkable 时，设置独立节点是否展示 Checkbox | `boolean` |  |  |
| disableCheckbox | 禁掉 checkbox | `boolean` | false |  |
| disabled | 禁掉响应 | `boolean` | false |  |
| icon | 自定义图标。可接收组件，props 为当前节点 props | `boolean` |  |  |
| isLeaf | 设置为叶子节点 (设置了 loadData 时有效)。为 false 时会强制将其作为父节点 | `boolean` |  |  |
| key | 被树的 (default)ExpandedKeys / (default)CheckedKeys / (default)SelectedKeys 属性所用。注意：整个树范围内的所有节点的 key 值不能重复！ | `string` | (内部计算出的节点位置) |  |
| selectable | 设置节点是否可被选中 | `boolean` | true |  |
| title | 标题 | `ReactNode` |  |  |
