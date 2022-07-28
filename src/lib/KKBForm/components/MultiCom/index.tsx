import React from 'react';
import { Form, Space } from 'antd';
import { KKBFormItem } from '../../KKBFormItem';
import { KKBBoxType } from '../../typeData';
import { getPrefixCls } from '../../../../utils';

import './index.less';

export interface KKBMultiProps {
  [key: string]: any;
}
export interface FormItem {
  index: number;
  listItem: KKBBoxType;
}

const MultiCom = ({
  formlist,
  formRef,
  name,
}: KKBMultiProps): React.ReactElement => {
  const innerCom = (v: KKBBoxType) => {
    const formBoxEle = KKBFormItem(v);
    return (
      <div
        key={v.key || v.name}
        className={v.className}
        style={{ ...v.options?.style }}
      >
        {formBoxEle}
      </div>
    );
  };
  const handleFormItem = ({ listItem, index }: FormItem) => {
    return (
      <div key={listItem.key || listItem.name}>
        {!listItem.noForm ? (
          <Form.Item
            name={listItem?.name}
            className={getPrefixCls('multiComWrap')}
            style={{
              marginBottom: '0',
              marginRight: `${index === formlist.length - 1 ? '0' : '24px'}`,
            }}
            label={listItem.label}
            rules={listItem.rules}
          >
            {KKBFormItem(
              {
                ...listItem,
                options: {
                  ...listItem?.options,
                  style: { width: '224px', ...listItem?.options?.style },
                },
              },
              formRef,
            )}
          </Form.Item>
        ) : (
          innerCom(listItem)
        )}
      </div>
    );
  };

  return (
    <div className={getPrefixCls('multiComWrap')}>
      <Form.List name={name}>
        {() => (
          <Space align="baseline">
            {formlist?.map((listItem: KKBBoxType, index: number) =>
              handleFormItem({ listItem, index }),
            )}
          </Space>
        )}
      </Form.List>
    </div>
  );
};

export default MultiCom;
