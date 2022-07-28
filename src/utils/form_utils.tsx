import React from 'react';
import { QuestionCircleOutlined } from '@ant-design/icons';
import { FormItemProps, Popover } from 'antd';
import { KKBBoxType } from '../lib/KKBForm/typeData';
import { KKBFORM_TYPE } from '../lib/KKBForm/boxType';

// 处理部份参数警告
export const handlFormItemOpts = (itemData?: any): FormItemProps => {
  const formItemOpts: FormItemProps = {};
  // 解决警告：Switch组件在Form中需要映射参数
  if (itemData?.type === KKBFORM_TYPE.switch) {
    formItemOpts.valuePropName = 'checked';
  }
  return formItemOpts;
};

/**
 * 生成form label组件
 */
export const handleLabelCom = (opts: KKBBoxType): React.ReactNode | string => {
  const { labelTips } = opts || {};
  if (labelTips?.length && labelTips?.length > 0) {
    return (
      <Popover
        content={labelTips.map?.((tipsStr, i) => (
          <div key={`${tipsStr + i}`}>{tipsStr}</div>
        ))}
        trigger="hover"
        overlayStyle={{ maxWidth: 200, zIndex: 999999 }}
      >
        <div>
          {opts.label}
          <span> </span>
          <QuestionCircleOutlined />
        </div>
      </Popover>
    );
  }
  return opts.label;
};
