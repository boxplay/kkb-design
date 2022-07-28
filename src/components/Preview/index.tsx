import React from 'react';
import { Form, Space } from 'antd';
import { KKBFormItem } from '../../lib/KKBForm/KKBFormItem';
import { KKBBoxType } from '../../lib/KKBForm/typeData';
import { getPrefixCls } from '../../utils';
import './index.less';

export interface KKBMultiProps {
  [key: string]: any;
}

const MultiExtCom = ({ formlist }: KKBMultiProps): React.ReactElement => {
  const innerCom = (v: KKBBoxType) => {
    const formBoxEle = KKBFormItem(v);
    return (
      <div key={v.name} className={v.className} style={{ ...v.options?.style }}>
        {formBoxEle}
      </div>
    );
  };
  const handleFormItem = ({ listItem, index }: KKBMultiProps) => {
    return (
      <>
        {!listItem.noForm ? (
          <Form.Item
            className={getPrefixCls('multiComWrap')}
            style={{
              marginBottom: '0',
              marginRight: `${index === formlist.length - 1 ? '0' : '24px'}`,
            }}
            label={`${index === 0 ? '' : listItem.label}`}
          >
            {KKBFormItem({
              ...listItem,
              options: {
                ...listItem?.options,
                style: { width: '224px', ...listItem?.options?.style },
              },
            })}
          </Form.Item>
        ) : (
          innerCom(listItem)
        )}
      </>
    );
  };
  return (
    <div className={getPrefixCls('previewWrap')}>
      <Space align="start">
        {formlist?.map((listItem: KKBBoxType, index: number) => {
          return <>{handleFormItem({ listItem, index })}</>;
        })}
      </Space>
    </div>
  );
};

export default MultiExtCom;
