import React, { useState, useRef, useEffect } from 'react';
import { KKBTree, Input } from '@base/kkb-design';
import {
  DeleteOutlined,
  PlusCircleOutlined,
  SettingOutlined,
} from '@ant-design/icons';
import { treeDataNoKeyDemo } from '../mock';
import styles from './index.less';

const Index = () => {
  const [gData, setGData] = useState([]);
  const [expandedKeys, setExpandedKeys] = useState(['0-0', '0-0-0', '0-0-0-0']);
  const treeRef = useRef(null);

  useEffect(() => {
    if (treeRef.current?.addTreeKey) {
      // 给tree数据添加唯一key
      const newData = treeRef.current.addTreeKey(treeDataNoKeyDemo);
      setGData(newData);
      setExpandedKeys(['0-0', '0-0-0', '0-0-0-0']);
    }
  }, [treeRef]);

  const treeTitleRender = (treeItem, action) => {
    return (
      <div className={styles.treeItem}>
        <div className={styles.treeTitle}>{treeItem.title}</div>
        <div>
          <span style={{ marginRight: 10 }}>
            <a
              onClick={(e) => {
                e.stopPropagation();
                const data = action({
                  type: 'add',
                  treeData: gData,
                  currentTreeData: treeItem,
                  customTreeData: {
                    title: `新内容${Date.now()}`,
                    key: `${Date.now()}`,
                  },
                });
                setGData(data);
              }}
              title="添加子节点"
            >
              <PlusCircleOutlined />
            </a>
          </span>

          <span style={{ marginRight: 10 }}>
            <a
              onClick={(e) => {
                const data = action({
                  type: 'set',
                  currentTreeData: treeItem,
                  // 修改节点相关数据
                  customTreeData: {
                    title: `修改内容${Date.now()}`,
                  },
                });
                setGData(data);
              }}
              title="修改节点"
            >
              <SettingOutlined />
            </a>
          </span>

          <span style={{ marginRight: 10 }}>
            <a
              onClick={(e) => {
                e.stopPropagation();
                const data = action({
                  type: 'delete',
                  currentTreeData: treeItem,
                });
                setGData(data);
              }}
              title="删除节点"
            >
              <DeleteOutlined />
            </a>
          </span>
        </div>
      </div>
    );
  };

  // tree展开/收起节点时触发
  const onExpand = (_expandedKeys) => {
    setExpandedKeys(_expandedKeys);
  };

  const onDragEnter = (info) => {
    // expandedKeys 需要受控时设置
    setExpandedKeys(info.expandedKeys);
  };

  const onDrop = (info) => {
    const dropKey = info.node.key; // 拖拽后目标节点
    const dragKey = info.dragNode.key; // 拖拽时的节点
    const dropPos = info.node.pos.split('-');
    const dropPosition =
      info.dropPosition - Number(dropPos[dropPos.length - 1]);

    const loop = (data, key, callback) => {
      for (let i = 0; i < data.length; i += 1) {
        if (data[i].key === key) {
          return callback(data[i], i, data);
        }
        if (data[i].children) {
          loop(data[i].children, key, callback);
        }
      }
    };
    const data = [...gData];

    // Find dragObject
    let dragObj;
    loop(data, dragKey, (item, index, arr) => {
      arr.splice(index, 1);
      dragObj = item;
    });

    if (!info.dropToGap) {
      // Drop on the content
      loop(data, dropKey, (item) => {
        item.children = item.children || [];
        // where to insert 示例添加到头部，可以是随意位置
        item.children.unshift(dragObj);
      });
    } else if (
      (info.node.props.children || []).length > 0 && // Has children
      info.node.props.expanded && // Is expanded
      dropPosition === 1 // On the bottom gap
    ) {
      loop(data, dropKey, (item) => {
        item.children = item.children || [];
        // where to insert 示例添加到头部，可以是随意位置
        item.children.unshift(dragObj);
        // in previous version, we use item.children.push(dragObj) to insert the
        // item to the tail of the children
      });
    } else {
      let ar;
      let i;
      loop(data, dropKey, (item, index, arr) => {
        ar = arr;
        i = index;
      });
      if (dropPosition === -1) {
        ar.splice(i, 0, dragObj);
      } else {
        ar.splice(i + 1, 0, dragObj);
      }
    }
    setGData(data);
  };

  const onSearch = (v) => {
    const newTree = treeRef.current.treeFindPath({
      tree: gData, // 整体tree数据结构
      // 自定义tree对比值，返回布尔值
      diffFn: (data) => data.title === v,
      // 自定义保存数据格式
      savePathFn: (data, i) => {
        const { children, ...newData } = data;
        return {
          ...newData,
          findIndex: i,
        };
      },
    });

    console.log('查找到的tree数据', newTree);
  };

  return (
    <div>
      <div style={{ marginBottom: 20 }}>
        <Input.Search placeholder="请输入搜索tree的名称" onSearch={onSearch} />
      </div>
      <KKBTree
        ref={treeRef}
        treeData={gData}
        draggable
        expandedKeys={expandedKeys}
        treeTitleRender={treeTitleRender}
        onDrop={onDrop}
        onDragEnter={onDragEnter}
        onExpand={onExpand}
      />
    </div>
  );
};

export default Index;
