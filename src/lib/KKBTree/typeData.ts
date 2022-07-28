import React from 'react';
import { TreeProps } from 'antd';
import { DataNode } from 'antd/lib/tree';

/** 组件props */
export interface KKBTreeProps extends Omit<TreeProps, 'onDrop'> {
  treeData?: TreeDataItem[];
  /** 树节点 右侧工具栏 */
  treeTitleRender?: TreeTitleRenderFn;
  onDrop?: (info: any, diffData: DiffTreeData) => void;
}

/** 对比节点数据 */
export interface DiffTreeData {
  dragPosLevel: number; // 当前拖拽节点层级
  parentPosLevel: number; // 拖拽后父节点层级
  parentNode?: TreeDataItem; // 拖拽后父节点完整数据
}

/** 组件ref方法 */
export interface KKBTreeRef {
  /** 查找指定节点方法 */
  treeFindPath: TreeFindPathFn;
  /** 给treeData添加唯一key，以层级索引表述的key */
  addTreeKey: (treeArr: TreeDataItem[]) => TreeDataItem[];
}

/** 树节点item数据结构 */
export type TreeDataItem = DataNode;

/** 内置处理树节点方法，返回处理后的新节点数据 */
export type ActionFn = (options: ActionOpts) => TreeDataItem[];
export interface ActionOpts {
  /** 操作类型 moveUp上移操作 moveDown下移操作，上下移动只支持同级子节点 */
  type: 'add' | 'delete' | 'set'; // | 'moveUp' | 'moveDown'
  /** 整体完整tree数据 */
  treeData: TreeDataItem;
  /** 当前处理的treeItem数据，如删除时，需要传入当前节点的treeItem，新增节点时数据 */
  currentTreeData: TreeDataItem;
  /** 新增、修改tree数据 */
  customTreeData: TreeDataItem;
}

/** 内置右侧工具组件 */
export type SlotComFn = (data: SlotComFnData) => React.ReactNode;
export interface SlotComFnData {
  /** 内置组件类型 drag拖拽组件 */
  type: 'drag';
  /** 自定义icon */
  render?: (treeItem: TreeDataItem) => React.ReactNode | void;
}

/** 自定义tree右侧节点函数 */
export type TreeTitleRenderFn = (
  treeItem: TreeDataItem,
  action: ActionFn,
  slotCom: SlotComFn,
) => React.ReactNode;

/** 查找指定节点方法 */
export type TreeFindPathFn = <T>(data: TreeFindPathFnData<T>) => T[];
export interface TreeFindPathFnData<T> {
  /** 原始tree完整节点 */
  tree: TreeDataItem[];
  /** 自定义查找的节点时 对比diff字段，返回true查找到指定节点 */
  diffFn: (data: TreeDataItem) => boolean;
  /** 自定义保存节点的格式 */
  savePathFn?: (data: TreeDataItem, index: number) => T;
  /** 返回查找到节点的初始数据 */
  path?: any[];
}
