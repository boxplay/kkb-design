import React from 'react';
import { MinusCircleOutlined, PlusOutlined } from '@ant-design/icons';
import { Rule } from 'antd/lib/form';
import { FormListFieldData } from 'antd/lib/form/FormList';
import classnames from 'classnames';
import { Button, Form, Input } from 'antd';
import TextArea from '../TextArea';
import { getPrefixCls } from '../../utils';
import './index.less';

interface DyInputFormListProps {
  /** form表单总体key，返回类型是 object[] */
  name: string;
  /** 验证规则 */
  rules?: Rule[] | undefined;
  /** 多行文本验证 */
  textAreaRules?: Rule[] | undefined;
  /** input输入框key */
  inputKey?: string;
  /** input框placeholder提示 */
  inputPlaceholder?: string;
  /** 新增input框时，默认添加到input中的内容 */
  inputDefalutValue?: string;
  /** 多行输入框key */
  textAreaKey?: string;
  /** 多行输入框placeholder提示 */
  textAreaPlaceholder?: string;
  /** 新增多行输入框时，默认添加到input中的内容 */
  textAreaDefalutValue?: string;
  /** 多行输入框文字数量限制 */
  textAreaMaxLen?: number;
  /** 添加按钮文字内容 */
  addText?: string;
  /** 组件样式class */
  className?: string;
  /** 移除事件回调 */
  removeFn?: (data: RemoveFnData) => boolean;
}

interface RemoveFnData {
  fields: FormListFieldData[];
  currentField: FormListFieldData;
  currentIndex: number;
  remove: (index: number | number[]) => void;
}

interface FormFieldsItem {
  fields: FormListFieldData[];
  remove: (index: number | number[]) => void;
}

interface AddDefalutData {
  inputKey?: string;
  textAreaKey?: string;
}

// 添加行add函数类型
type addType = (data?: any) => void;

// 动态扩展input组件
const DyInputFormList = ({
  name,
  rules,
  textAreaRules,
  inputKey,
  inputPlaceholder = '请输入',
  inputDefalutValue,
  textAreaKey,
  textAreaMaxLen = 150,
  textAreaPlaceholder = '请输入',
  textAreaDefalutValue,
  addText = '添加参数',
  className,
  removeFn,
}: DyInputFormListProps) => {
  const formItemBox = ({ fields, remove }: FormFieldsItem) =>
    fields?.map((field, index: number) => {
      return (
        <div key={field.key} className={getPrefixCls('dyinput-listWrap')}>
          {inputKey && (
            <Form.Item
              {...field}
              name={[field.name, inputKey]}
              className={
                textAreaKey ? getPrefixCls('dyinput-inputKey') : undefined
              }
              rules={rules}
            >
              <Input placeholder={inputPlaceholder} />
            </Form.Item>
          )}

          {textAreaKey && (
            <Form.Item
              name={[field.name, textAreaKey]}
              rules={textAreaRules ?? rules}
            >
              <TextArea
                width="100%"
                maxLength={textAreaMaxLen}
                placeholder={textAreaPlaceholder}
              />
            </Form.Item>
          )}

          <MinusCircleOutlined
            onClick={() => {
              let removeFlag = true;
              if (removeFn) {
                removeFlag = removeFn?.({
                  fields,
                  remove,
                  currentField: field,
                  currentIndex: index,
                });
              }
              if (removeFlag) remove(field.name);
            }}
            className={getPrefixCls('dyinput-removeIcon')}
          />
        </div>
      );
    });

  const addCallback = (add: addType) => {
    const addData: AddDefalutData = {};

    if (inputKey) addData.inputKey = inputDefalutValue;
    if (textAreaKey) addData.textAreaKey = textAreaDefalutValue;
    add(addData);
  };

  return (
    <div className={classnames(getPrefixCls('dyInput-formWrap'), className)}>
      <Form.List
        name={name}
        // rules={rules}
      >
        {(fields, { add, remove }) => {
          return (
            <>
              {formItemBox({ fields, remove })}

              <Form.Item
              // className={fields?.length > 0 ? styles.addCardBtn : ''}
              >
                <Button type="dashed" onClick={() => addCallback(add)} block>
                  <PlusOutlined /> {addText}
                </Button>
              </Form.Item>
            </>
          );
        }}
      </Form.List>
    </div>
  );
};

export default DyInputFormList;
