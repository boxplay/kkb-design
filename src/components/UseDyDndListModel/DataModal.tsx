import React, { useState, useEffect, useRef } from 'react';
import { Modal } from 'antd';
import { cloneDeep } from 'lodash';
import { KKBForm } from '../../lib/KKBForm';
import { CurrentDataType, ListDataTypeScope } from './typeData';
import { KKBBoxType, KKBFormRef } from '../../lib/KKBForm/typeData';

interface DataModalProps {
  visibleModel: boolean;
  setVisibleModel: (flag: boolean) => void;
  currentData?: CurrentDataType;
  listData: ListDataTypeScope;
  /** 更新form表单 */
  upFormListData: (data: ListDataTypeScope) => void;
  /** 弹层渲染组件 */
  formlist?: KKBBoxType[];
  modalTitle?: string;
}

const DataModal = ({
  visibleModel,
  setVisibleModel,
  currentData,
  listData,
  upFormListData,
  formlist,
  modalTitle,
}: DataModalProps) => {
  const gmRef = useRef<KKBFormRef>(null);
  const [boxType, setBoxType] = useState<KKBBoxType[]>([]);

  useEffect(() => {
    setBoxType(formlist || []);
  }, [formlist, currentData, listData]);

  const handleOk = () => {
    gmRef.current?.validateFields?.().then((res) => {
      const newListData = cloneDeep(listData);
      try {
        newListData[currentData?.index || 0].config = res;
        upFormListData(newListData);
        setVisibleModel(false);
      } catch (error) {
        console.error(
          `未找到相匹配修改的数据，确认当前参数有config对象`,
          newListData,
          error,
        );
      }
    });
  };

  const handleCancel = () => {
    setVisibleModel(false);
  };

  return (
    <>
      <Modal
        title={modalTitle || '编辑'}
        visible={visibleModel}
        onOk={handleOk}
        onCancel={handleCancel}
        cancelText="取消"
        okText="确定"
        width={600}
        destroyOnClose
        centered
      >
        <KKBForm
          ref={gmRef}
          boxData={boxType}
          cancelBtnText={null}
          saveBtnText={null}
          labelAlign="left"
          defaultValue={{ ...currentData?.data?.config }}
        />
      </Modal>
    </>
  );
};

export default DataModal;
