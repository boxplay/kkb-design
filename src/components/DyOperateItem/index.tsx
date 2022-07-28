import React, { useState } from 'react';
import { Button, Form, Space } from 'antd';
import {
  PlusOutlined,
  MinusCircleOutlined,
} from '@ant-design/icons';
import classnames from 'classnames';
import { KKBFormItem } from '../../lib/KKBForm/KKBFormItem';
import { DyListProps, AddFn } from './typeData';
import { KKBBoxType } from '../../lib/KKBForm/typeData';
import { handlFormItemOpts } from '../../utils/form_utils';
import { getPrefixCls } from '../../utils';
import tips from '../../utils/tips_utils';
import './index.less';

type FormItemFnProps = {
  field: any;
  listItem: KKBBoxType;
  fieldNum?: number;
  formListNum: number;
  fields: Array<any>;
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
const DyOperateItem = ({
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
  label,
  hiddenAdd,
  formRef,
  operateType,
  defalutItem,
  ...props
}: DyListProps) => {
  const [haveDefaut, setDefault] = useState(defalutItem);
  const handleFormItem = ({
    field,
    listItem,
    formListNum,
    fieldNum,
    fields,
  }: FormItemFnProps) => {
    // console.log('formlist', formlist);
    const { name } = listItem;
    const itemStyle = {
      marginRight: `${formListNum === 0 ? 24 : 0}`,
    };
    const labelItem = (formListNum === 0 && listItem.label) || '';
    // 添加按钮不隐藏最后一项或者不是最后一项设置bottom, 按钮隐藏后最后一项不设置bottom
    const itemBottom =
      (fieldNum === fields?.length - 1 &&
        hiddenAdd &&
        fields.length < (maxNum || 9999)) ||
      fieldNum !== fields?.length - 1
        ? '24px'
        : '0';

    return (
      <Form.Item
        name={[field?.name, name]}
        fieldKey={[field?.fieldKey, name]}
        key={name}
        className={listItem.className}
        rules={listItem.rules}
        label={labelItem}
        style={{
          marginBottom: itemBottom,
        }}
        {...handlFormItemOpts(listItem)}
      >
        {KKBFormItem(
          {
            ...listItem,
            options: {
              style: { width: 241, ...itemStyle, ...style },
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
    // const addData: AddDefalutData = { ...addValue };
    const handleMaxNum = maxNum || 9999;
    if (fields.length + 1 > handleMaxNum) {
      tips.error(`超出最大限制${handleMaxNum}个`);
      return;
    }
    add();
  };

  // 移除事件
  const onRemove = ({ fields, field, remove, index }: any, type: string) => {
    const handleMinNum = minNum || 0;
    const len = haveDefaut ? fields.length : fields.length - 1;
    if (len < handleMinNum) {
      tips.error(`无法移除，最少保留${handleMinNum}个`);
      return;
    }
    if (type === 'default') {
      setDefault(false);
      return;
    }
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
  };

  const addBtn = ({ add, fields }: any) => {
    if (hiddenAdd) {
      return fields.length < (maxNum || 9999) ? (
        <Form.Item
          // {...formItemButtonLabel}
          style={{
            marginBottom: '0px',
            marginLeft: '126px',
            width: '507px!important',
            ...style,
          }}
        >
          {/* <div
            style={{
              display: 'flex',
              flexDirection: 'row',
              // marginLeft: '4px'
            }}
          >
            <div style={{ width: '484px' }}> */}
            <div style={{ width: '507px' }}> 
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
          
          </div> 
        </Form.Item>
      ) : null;
    }

    return (
      <Form.Item
        style={{
          marginBottom: '0px',
          marginLeft: '126px',
          width: '507px',
          ...style,
        }}
      >
        {/* <div
          style={{ display: 'flex', flexDirection: 'row', marginLeft: '4px' }}
        > */}
          <div style={{ width: '507px' }}> 
        <Button
          type="dashed"
          onClick={() => addCallback({ add, fields })}
          block
        >
          <PlusOutlined /> {addText}
        </Button>
        {desc ? <div>{desc}</div> : null}
         
        </div> 
      </Form.Item>
    );
  };

  return (
    <div className={classnames(getPrefixCls('dyComOperateItem'), className)}>
      {/* <Form.Item {...formItemLayout}> */}
      <Form.List name={props.name}>
        {(fields, { add, remove }) => {
          return (
            <>
              {haveDefaut ? (
                <Space
                  style={{ display: 'flex', width: '100%' }}
                  size={[24, 8]}
                  align="baseline"
                >
                  {formlist?.map((item, itemNum) => {
                    const num = 0;
                    return handleFormItem({
                      field: '',
                      listItem: item,
                      formListNum: itemNum,
                      fieldNum: num,
                      fields: [],
                    });
                  })}

                  {/* 移除icon */}
                  <MinusCircleOutlined
                    onClick={() => onRemove({ fields, remove }, 'default')}
                    style={{
                      position: 'relative',
                      left: '-16px',
                      top: '3px',
                      fontSize: 20,
                      color: 'rgba(0, 0, 0, 0.25)',
                    }}
                  />
                </Space>
              ) : null}
              {fields?.map((field, index: number) => {
                return (
                  <Form.Item
                    key={field.key}
                    style={{ marginBottom: '0' }}
                    // labelCol={{ xs: { span: 24 }, sm: { span: 4 } }}
                    // {...formItemLayout}
                    // style={{
                    //   marginBottom: '0',
                    //   marginLeft: `${
                    //     index === 0 && !haveDefaut ? '0' : '126px'
                    //   }`,
                    // }}
                  >
                    <Space
                      key={field.key}
                      style={{ display: 'flex', width: '100%' }}
                      size={[24, 8]}
                      align="baseline"
                    >
                      {/* <div
                    key={field.key}
                    className={getPrefixCls('dyComListWrap')}
                  >
                    {title ? (
                      <div className={getPrefixCls('dyComTitile')}>
                        {`${title} ${index + 1}`}
                      </div>
                    ) : null} */}

                      {formlist?.map((item, itemNum) => {
                        return handleFormItem({
                          field,
                          listItem: item,
                          formListNum: itemNum,
                          fieldNum: index,
                          fields,
                        });
                      })}

                      {/* 移除icon */}
                      <MinusCircleOutlined
                        onClick={() =>
                          onRemove({ fields, field, remove, index }, '')
                        }
                        style={{
                          position: 'relative',
                          left: '-16px',
                          top: '3px',
                          fontSize: 20,
                          color: 'rgba(0, 0, 0, 0.25)',
                        }}
                      />

                      {/* {fields.length > index + 1 ? <Divider /> : null} */}
                      {/* </div> */}
                    </Space>
                  </Form.Item>
                );
              })}

              {addBtn({ add, fields })}
            </>
          );
        }}
      </Form.List>
      {/* </Form.Item> */}
    </div>
  );
};

export default DyOperateItem;
