import { ActionOpts, TreeDataItem, TreeFindPathFn } from './typeData';

export function cloneDeep<T>(data: any[] | object): T {
  try {
    return JSON.parse(JSON.stringify(data));
  } catch (error) {
    console.error('cloneDeep接收到字段有非法类型', error);
    return {} as T;
  }
}

/**
 * 生成treeData数据结构中的key
 * 以0-0-1-1方式体现不过索引的树的层级位置
 */
export function addTreeKey(
  treeArr: TreeDataItem[],
  _preKey?: string,
): TreeDataItem[] {
  let preKey = _preKey || '0';
  return treeArr?.reduce<TreeDataItem[]>((preValue, currentValue, index) => {
    preKey = `${preKey}-${index}`;
    const newData: TreeDataItem = {
      ...currentValue,
      key: preKey,
    };
    if (currentValue?.children) {
      newData.children = addTreeKey(newData.children || [], preKey);
    }
    preValue.push(newData);
    return preValue;
  }, []);
}

/**
 * 查找指定节点位置，返回数组 查找到节点信息及索引值，包含父节点>子节点
 */
export const treeFindPath: TreeFindPathFn = ({
  tree,
  diffFn,
  path = [],
  savePathFn,
}) => {
  if (!tree) return [];
  for (let i = 0; i < tree.length; i += 1) {
    const data = tree[i];

    const savePath = savePathFn
      ? savePathFn?.(data, i)
      : {
          ...data,
          findIndex: i,
        };
    // 存放最后返回的内容
    path.push(savePath);

    if (diffFn(data)) return path;
    if (data.children) {
      const findChildren = treeFindPath({
        tree: data.children,
        diffFn,
        path,
        savePathFn,
      });
      if (findChildren.length) return findChildren;
    }
    path.pop();
  }
  return [];
};

/** 添加新节点 */
export const addTree = (opts: ActionOpts, treeData?: TreeDataItem[]) => {
  const findData = treeFindPath({
    tree: cloneDeep<TreeDataItem[]>(opts.treeData || treeData || []),
    diffFn: (data) => data.key === opts.currentTreeData?.key,
    savePathFn: (data, i) => {
      const { children, ...newData } = data;
      return {
        ...newData,
        findIndex: i,
      };
    },
  });
  const newTreeData = cloneDeep<TreeDataItem[]>(
    opts.treeData || treeData || [],
  );
  // 查找当前节点信息
  let tempTree: any;
  for (let i = 0; i < findData.length; i += 1) {
    const { findIndex } = findData[i];
    if (tempTree) {
      tempTree = tempTree.children?.[findIndex];
    } else {
      tempTree = newTreeData[findIndex];
    }
  }

  if (!tempTree) console.warn('action：未找到相应节点信息');
  if (!opts.customTreeData) console.warn('action：缺少customTreeData参数');

  if (tempTree && opts.customTreeData) {
    if (!Array.isArray(tempTree?.children)) {
      tempTree.children = [];
    }
    tempTree.children.push(opts.customTreeData);
  }
  return newTreeData;
};

/** 移除指定节点 */
export const delTree = (opts: ActionOpts, treeData?: TreeDataItem[]) => {
  const findData = treeFindPath({
    tree: cloneDeep<TreeDataItem[]>(opts.treeData || treeData || []),
    diffFn: (data) => data.key === opts.currentTreeData?.key,
    savePathFn: (data, i) => {
      const { children, ...newData } = data;
      return {
        ...newData,
        findIndex: i,
      };
    },
  });
  const newTreeData = cloneDeep<TreeDataItem[]>(
    opts.treeData || treeData || [],
  );
  // 查找当前节点信息
  let tempTree: any;
  for (let i = 0; i < findData.length; i += 1) {
    const { findIndex } = findData[i];
    if (tempTree) {
      // 最后节点
      if (findData.length - 1 === i) {
        tempTree = tempTree.children.splice(findIndex, 1);
      } else {
        // 普通子节点
        tempTree = tempTree.children?.[findIndex];
      }
    } else {
      tempTree = newTreeData[findIndex];
      // 根节点移除
      if (findData.length - 1 === i) {
        newTreeData.splice(findIndex, 1);
      }
    }
  }
  return newTreeData;
};

/** 修改指定节点 */
export const setTree = (opts: ActionOpts, treeData?: TreeDataItem[]) => {
  const findData = treeFindPath({
    tree: cloneDeep<TreeDataItem[]>(opts.treeData || treeData || []),
    diffFn: (data) => data.key === opts.currentTreeData?.key,
    savePathFn: (data, i) => {
      const { children, ...newData } = data;
      return {
        ...newData,
        findIndex: i,
      };
    },
  });
  const newTreeData = cloneDeep<TreeDataItem[]>(
    opts.treeData || treeData || [],
  );

  // 查找当前节点信息
  let tempTree: any;
  for (let i = 0; i < findData.length; i += 1) {
    const { findIndex } = findData[i];
    if (tempTree) {
      // 最后节点
      if (findData.length - 1 === i) {
        tempTree.children[findIndex] = {
          ...tempTree.children[findIndex],
          ...opts.customTreeData,
          // children: tempTree.children[findIndex].children || [],
        };
      }

      tempTree = tempTree.children?.[findIndex];
    } else {
      tempTree = newTreeData[findIndex];
      // 根节点修改
      if (findData.length - 1 === i) {
        newTreeData[findIndex] = {
          ...newTreeData[findIndex],
          ...opts.customTreeData,
          // children: newTreeData[findIndex].children || [],
        };
      }
    }
  }
  return cloneDeep<TreeDataItem[]>(newTreeData);
};
