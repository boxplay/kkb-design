import React, { useState, useEffect, useCallback } from 'react';
import { Button } from 'antd';
import { DragDropContext, Droppable, DropResult } from 'react-beautiful-dnd';
import { cloneDeep } from 'lodash';
import {
  ListDataTypeScope,
  EditorOrDelFn,
  GenerateItemData,
  CurrentDataType,
} from './typeData';
import { UseFormProps } from '../../lib/KKBForm/typeData';
import DndItem from './DndItem';
import DataModal from './DataModal';
import { uuid, getPrefixCls } from '../../utils';
import tips from '../../utils/tips_utils';
import './index.less';

// 处理映射字段
const generateItemMapping = ({ options, index, config }: GenerateItemData) => {
  function handleMapping({ key, defalutStr, customFn }: any) {
    let resStr = '';
    if (key) {
      resStr = config?.[key];
    }
    if (customFn && key) {
      resStr = customFn(config?.[key] || '', index);
    }
    return resStr || defalutStr || '';
  }
  const { mapping, customTitle, customDesc } = options || {};
  const handleTitle = handleMapping({
    key: mapping?.title,
    defalutStr: `参数 ${index}`,
    customFn: customTitle,
  });

  const handleDesc = handleMapping({
    key: mapping?.desc,
    defalutStr: '',
    customFn: customDesc,
  });
  const itemData = {
    title: handleTitle,
    desc: handleDesc,
  };
  return itemData;
};

// 转换内部list的数据结构
const generateItemData = (data: GenerateItemData) => {
  const itemData = {
    id: uuid(8, 10),
    ...generateItemMapping(data),
    config: data.config, // 默认参数
  };
  return itemData;
};

const DyDndListModel = ({
  value,
  onChange,
  options,
}: UseFormProps<any[], any>) => {
  const { maxNum, minNum, disableDrap, hiddenAdd } = options || {};
  const randomId = Date.now();
  const [listData, setListData] = useState<ListDataTypeScope>([]);
  const [visibleModel, setVisibleModel] = useState(false);
  const [currentData, setCurrentData] = useState<CurrentDataType>();

  // 更新form表单数据
  const upFormListData = useCallback((lists: ListDataTypeScope) => {
    const formData: Array<object> = [];
    const newLists: ListDataTypeScope = []; // 本地数据list
    lists?.forEach?.((item, i) => {
      formData.push({ ...item.config });

      newLists.push({
        ...item,
        ...generateItemMapping({
          options,
          config: item.config,
          index: i + 1,
        }),
      });
    });
    onChange?.(formData.filter(Boolean));
    setListData(newLists);
  }, []);

  // 初始化拖拽list
  useEffect(() => {
    const newList = value?.map?.((item, i) => {
      const curIndex = i + 1;
      return generateItemData({
        options,
        index: curIndex,
        config: item,
      });
    });
    upFormListData(newList);
  }, [options]);

  // 添加
  const handleAdd = () => {
    const handleMaxNum = maxNum || 9999;
    if (listData.length + 1 > handleMaxNum) {
      tips.error(`超出最大限制${handleMaxNum}个`);
      return;
    }
    const item = generateItemData({
      options,
      index: listData.length + 1,
      config: options?.addValue,
    });
    const newList = cloneDeep([...listData!, item]);
    upFormListData(newList);
  };

  // 删除操作
  const handleDel: EditorOrDelFn = (_itemData, index) => {
    if (minNum && listData.length - 1 < minNum) {
      tips.error(`无法移除，最少保留${minNum}个`);
      return;
    }
    listData.splice(index, 1);
    upFormListData(listData);
  };

  // 编辑操作
  const handleEdit: EditorOrDelFn = (itemData, index) => {
    setCurrentData({
      index,
      data: itemData,
    });
    setVisibleModel(true);
  };

  // 拖拽结束
  const onDragEnd = (result: DropResult) => {
    if (disableDrap) return;
    const startIndex = result.source.index;
    const endIndex = result.destination?.index || 0;
    if (
      !result.destination ||
      result.destination.index === result.source.index
    ) {
      return;
    }
    const items = Array.from(listData);
    const [removed] = items.splice(startIndex, 1);
    items.splice(endIndex, 0, removed);
    upFormListData(items);
  };

  const addBtn = () => {
    if (hiddenAdd) {
      return listData.length < (maxNum || 9999) ? (
        <div style={{ marginTop: '10px' }}>
          <Button onClick={handleAdd} type="dashed" block>
            添加
          </Button>
        </div>
      ) : null;
    }

    return (
      <div style={{ marginTop: '10px' }}>
        <Button onClick={handleAdd} type="dashed" block>
          添加
        </Button>
      </div>
    );
  };

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <div className={getPrefixCls('dydnd-dataList')}>
        <Droppable
          droppableId={`droppable${randomId}`}
          isDropDisabled={disableDrap}
        >
          {(provided) => (
            <div {...provided.droppableProps} ref={provided.innerRef}>
              {listData?.map?.((item, i) => {
                return (
                  <DndItem
                    {...item}
                    onDel={() => handleDel(item, i)}
                    onEdit={() => handleEdit(item, i)}
                    key={item.id}
                    id={`${item.id}`}
                    index={i}
                    disableDrap={disableDrap}
                  />
                );
              })}
              {provided.placeholder}
            </div>
          )}
        </Droppable>
        {addBtn()}
      </div>
      <DataModal
        listData={listData}
        upFormListData={upFormListData}
        visibleModel={visibleModel}
        setVisibleModel={setVisibleModel}
        currentData={currentData}
        formlist={options?.formlist}
        modalTitle={options?.modalTitle}
      />
    </DragDropContext>
  );
};

export default DyDndListModel;
