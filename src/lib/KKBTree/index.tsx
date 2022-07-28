import React, { useState, useImperativeHandle, forwardRef } from 'react';
import { Tree } from 'antd';
import { BorderOuterOutlined } from '@ant-design/icons';
import {
  ActionFn,
  KKBTreeProps,
  KKBTreeRef,
  SlotComFn,
  TreeDataItem,
} from './typeData';
import { getPrefixCls } from '../../utils';
import {
  addTree,
  delTree,
  setTree,
  treeFindPath,
  addTreeKey,
} from './tree_utils';
import './index.less';

const KKBTree = forwardRef<KKBTreeRef, KKBTreeProps>(
  ({ className, draggable, treeTitleRender, treeData, ...props }, ref) => {
    const [dragFlag, setDragFlag] = useState(false);

    // 设置整体节点可拖拽
    const handleDraggable = () => {
      // 内部组件拖拽控制
      if (dragFlag) return dragFlag || false;
      if (!draggable) return false;
      return true;
    };

    // 内置处理tree方法
    const treeAction: ActionFn = (opts) => {
      const { type } = opts;
      let newTree: TreeDataItem[] = [];

      switch (type) {
        case 'delete':
          newTree = delTree(opts, treeData);
          break;
        case 'add':
          newTree = addTree(opts, treeData);
          break;
        case 'set':
          newTree = setTree(opts, treeData);
          break;
        default:
          break;
      }
      return newTree;
    };

    // 内置右侧组件
    const comRender = (treeItem: TreeDataItem): SlotComFn => {
      return (data) => {
        let ComIcon;
        switch (data.type) {
          case 'drag':
            ComIcon = (
              <span
                onMouseDown={() => {
                  setDragFlag(true);
                }}
                onMouseUpCapture={() => {
                  setDragFlag(false);
                }}
                className={getPrefixCls('KKBTree-dragIcon')}
              >
                {data.render?.(treeItem) || (
                  <a className={getPrefixCls('KKBTree-dragIcon')}>
                    <BorderOuterOutlined {...data} />
                  </a>
                )}
              </span>
            );
            break;

          default:
            break;
        }
        return ComIcon;
      };
    };

    // 处理tree渲染
    const handleTreeData = (data: TreeDataItem[]): TreeDataItem[] => {
      return data?.map?.((item) => {
        let treeTitle: React.ReactNode = item.title;
        if (treeTitleRender) {
          treeTitle = treeTitleRender?.(item, treeAction, comRender(item));
        }
        return {
          ...item,
          title: treeTitle,
          children: item?.children ? handleTreeData(item.children) : [],
        };
      });
    };

    const onDrop = (info: any) => {
      const dropPos = info.node.pos.split('-'); // 拖拽后目标节点
      const dropPosition =
        info.dropPosition - Number(dropPos[dropPos.length - 1]);

      let parentNodePos: string[] = []; // 待对比的父节点

      // 子节点首位，取父节点
      if (dropPosition === 0) {
        parentNodePos = info.node?.pos?.split?.('-');
      }
      // 子节点除首位外，向上一级取父节点
      if (dropPosition === 1) {
        const newNodePos = info.node.pos?.split?.('-');
        if (newNodePos.length > 0) newNodePos.pop();
        parentNodePos = newNodePos;
      }
      // 拖拽节点层级
      const dragPosLevel = info.dragNode.pos?.split?.('-').length - 1;
      // 父节点层级
      const parentPosLevel = parentNodePos?.length || 0;
      const parentNode = parentNodePos?.reduce?.(
        (preValue, currentValue, index) => {
          if (index === 0) return preValue;
          if (Array.isArray(preValue)) {
            return preValue?.[currentValue];
          }
          return (preValue as unknown as TreeDataItem)?.children?.[
            currentValue
          ];
        },
        treeData,
      ) as unknown as TreeDataItem;

      props.onDrop?.(info, { dragPosLevel, parentPosLevel, parentNode });
    };

    useImperativeHandle(ref, () => ({
      treeFindPath: (data) => treeFindPath(data),
      addTreeKey: (treeArr) => addTreeKey(treeArr),
    }));

    return (
      <div>
        <Tree
          className={className}
          blockNode
          {...props}
          treeData={handleTreeData(treeData || [])}
          draggable={handleDraggable}
          onDragEnter={(info) => {
            props.onDragEnter?.(info);
          }}
          // 拖拽结束前
          onDrop={onDrop}
          // 拖拽结束
          onDragEnd={(info) => {
            setDragFlag(false);
            props.onDragEnd?.(info);
          }}
        />
      </div>
    );
  },
);

export default KKBTree;
