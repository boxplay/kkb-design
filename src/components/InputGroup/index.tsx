import React from 'react';
import { InputProps , Input, Form, Row, Col } from 'antd';
import './index.less';
import { KKBBoxType } from '../../lib/KKBForm/typeData';
import { KKBFormItem } from '../../lib/KKBForm/KKBFormItem';

export interface InputExtOptions extends InputProps {
  extensionType: '';
}

export interface InputGroupProps {
  size: 'small' | 'large' | 'default';
  compact?: boolean;
  formlist: KKBBoxType[];
}

const InputGroup = ({
  compact = true,
  size,
  formlist,
}: InputGroupProps): React.ReactElement => {
  return (
    <Input.Group compact={compact} size={size}>
      {compact ? (
        formlist?.map((v) => {
          const formBoxEle = KKBFormItem(v);
          // 无form包裹
          if (v.noForm) {
            return (
              <div
                key={v.key || v.name}
                className={v.className}
                style={{ display: 'inline-block', ...v?.options?.style }}
              >
                {formBoxEle}
              </div>
            );
          }

          return (
            <Form.Item noStyle key={v.key || v.name}>
              {formBoxEle}
            </Form.Item>
          );
        })
      ) : (
        <Row>
          {formlist?.map((v) => {
            const formBoxEle = KKBFormItem(v);
            // 无form包裹
            if (v.noForm) {
              return (
                <Col key={v.key || v.name}>
                  <div
                    // key={v.key || v.name}
                    className={v.className}
                    style={{ display: 'inline-block', ...v?.options?.style }}
                  >
                    {formBoxEle}
                  </div>
                </Col>
              );
            }

            return (
              <Form.Item noStyle key={v.key || v.name}>
                {formBoxEle}
              </Form.Item>
            );
          })}
        </Row>
      )}
    </Input.Group>
  );
};

export default InputGroup;
