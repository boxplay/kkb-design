import React from 'react';
import './index.less';
import { KKBBoxType } from '../../lib/KKBForm/typeData';
import { KKBFormItem } from '../../lib/KKBForm/KKBFormItem';
import { getPrefixCls } from '../../utils';

export interface OperateProps {
  compact?: boolean;
  lists: KKBBoxType[];
}

const InputGroup = ({ lists }: OperateProps): React.ReactElement => {
  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'space-between',
        width: '530px',
      }}
    >
      <div style={{ display: 'flex' }}>
        {lists?.map((v, index) => {
          const formBoxEle = KKBFormItem(v);
          // 无form包裹
          // if (v.noForm) {
          return (
            <div
              key={v.name}
              className={v.className}
              style={{
                display: 'inline-block',
                marginRight: `${index === lists.length - 1 ? '8px' : '24px'}`,
                width: 228,

                ...v?.options?.style,
              }}
            >
              {formBoxEle}
            </div>
          );
          // }
        })}
      </div>
      <div className={`${getPrefixCls('operate-btn')}`}>
        <span className={`${getPrefixCls('operate-delete')}`}>
          <i className={`${getPrefixCls('operate-line')}`} />
        </span>
      </div>
    </div>
  );
};

export default InputGroup;
