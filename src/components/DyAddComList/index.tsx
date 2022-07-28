import React from 'react';
import { DeleteOutlined, PlusOutlined } from '@ant-design/icons';
import classnames from 'classnames';
import { Button, Form, Divider } from 'antd';
import { KKBFormItem } from '../../lib/KKBForm/KKBFormItem';
import { DyInputFormListProps, AddDefalutData, AddFn } from './typeData';
import { KKBBoxType } from '../../lib/KKBForm/typeData';
import { handleLabelCom, handlFormItemOpts } from '../../utils/form_utils';
import { getPrefixCls } from '../../utils';
import tips from '../../utils/tips_utils';
import './index.less';

type FormItemFnProps = {
  field: any;
  listItem: KKBBoxType;
};

/**
 * 动态添加移除组件
 * @name object[] form表单总体key，返回类型是
 * @className 组件样式class
 * @title 标题名称，每个item的标题，会自增索引后缀
 * @addText 添加按钮文字内容
 * @removeFn 移除事件回调，返回true可删除
 * @formlist 动态组件
 */
const DyAddComList = ({
  addText = '添加参数',
  className,
  removeFn,
  formlist,
  title,
  rules,
  token,
  addValue,
  maxNum,
  minNum,
  desc,
  style,
  hiddenAdd,
  formRef,
  ...props
}: DyInputFormListProps) => {
  const handleFormItem = ({ field, listItem }: FormItemFnProps) => {
    const { name } = listItem;

    return (
      <Form.Item
        name={[field.name, name]}
        fieldKey={[field.fieldKey, name]}
        key={name}
        className={listItem.className}
        label={handleLabelCom(listItem)}
        rules={listItem.rules}
        {...handlFormItemOpts(listItem)}
        style={{
          marginLeft: '126px',
          width: '530px',
          ...style,
        }}
      >
        {KKBFormItem(
          {
            ...listItem,
            options: {
              style,
              token,
              ...listItem?.options,
            },
          },
          formRef,
        )}
      </Form.Item>
    );
  };

  // 添加组件
  const addCallback = ({ add, fields }: AddFn) => {
    const addData: AddDefalutData = { ...addValue };
    const handleMaxNum = maxNum || 9999;
    if (fields.length + 1 > handleMaxNum) {
      tips.error(`超出最大限制${handleMaxNum}个`);
      return;
    }
    add(addData);
  };

  // 移除事件
  const onRemove = ({ fields, field, remove, index }: any) => {
    let removeFlag = true;
    if (removeFn) {
      removeFlag = removeFn?.({
        fields,
        remove,
        currentField: field,
        currentIndex: index,
      });
    }

    const handleMinNum = minNum || 0;
    if (fields.length - 1 < handleMinNum) {
      tips.error(`无法移除，最少保留${handleMinNum}个`);
      return;
    }
    if (removeFlag) remove(field.name);
  };

  const addBtn = ({ add, fields }: any) => {
    if (hiddenAdd) {
      return fields.length < (maxNum || 9999) ? (
        <Form.Item
          style={{
            marginBottom: '0px',
            marginLeft: '126px',
            width: '530px',
            ...style,
          }}
        >
          <>
            <Button
              type="dashed"
              onClick={() => addCallback({ add, fields })}
              block
            >
              <PlusOutlined /> {addText}
            </Button>
            {desc ? (
              <div className={classnames(getPrefixCls('formDyListDesc'))}>
                {desc}
              </div>
            ) : null}
          </>
        </Form.Item>
      ) : null;
    }

    return (
      <Form.Item
        style={{
          marginBottom: '0px',
          marginLeft: '126px',
          width: '530px',
          ...style,
        }}
      >
        <>
          <Button
            type="dashed"
            onClick={() => addCallback({ add, fields })}
            block
          >
            <PlusOutlined /> {addText}
          </Button>
          {desc ? <div>{desc}</div> : null}
        </>
      </Form.Item>
    );
  };

  return (
    <div className={classnames(getPrefixCls('dyComFormWrap'), className)}>
      <Form.List name={props.name}>
        {(fields, { add, remove }) => (
          <>
            {fields?.map((field, index: number) => {
              return (
                <div key={field.key} className={getPrefixCls('dyComListWrap')}>
                  {title ? (
                    <div className={getPrefixCls('dyComTitile')}>
                      {`${title} ${index + 1}`}
                    </div>
                  ) : null}

                  {formlist?.map((item) =>
                    handleFormItem({ field, listItem: item }),
                  )}

                  {/* 移除icon */}
                  <DeleteOutlined
                    onClick={() => onRemove({ fields, field, remove, index })}
                    // className={getPrefixCls('dyAddComList-removeIcon')}
                    style={{
                      position: 'absolute',
                      right: -25,
                      top: title ? 40 : 7,
                      color: 'red',
                    }}
                  />

                  {fields.length > index + 1 ? <Divider /> : null}
                </div>
              );
            })}

            {addBtn({ add, fields })}
          </>
        )}
      </Form.List>
    </div>
  );
};

export default DyAddComList;
