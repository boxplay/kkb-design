import React, { useState } from 'react';
import { Button, Form, Space} from 'antd';
import {
  PlusOutlined,
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
  fieldNum: number;
  formListNum: number;
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
  const [haveDefaut] = useState(defalutItem);
  // const formItemLayout = {
  //   labelCol: {
  //     xs: { span: 24 },
  //     sm: { span: 4 },
  //   },
  //   wrapperCol: {
  //     xs: { span: 24 },
  //     sm: { span: 24 },
  //   },
  // };
  // const formItemLayoutWithOutLabel = {
  //   wrapperCol: {
  //     xs: { span: 24, offset: 0 },
  //     sm: { offset: 4 },
  //   },
  // };
  // const formItemButtonLabel = {
  //   wrapperCol: {
  //     xs: { span: 24, offset: 0 },
  //     sm: { span: 20, offset: 4 },
  //   },
  // };
  const handleFormItem = ({
    field,
    listItem,
    formListNum,
  }: FormItemFnProps) => {
    const { name } = listItem;

    let labelItem;
    if (formListNum === 1) {
      labelItem = listItem.label;
    }

    return (
      <Form.Item
        name={[field?.name, name]}
        fieldKey={[field?.fieldKey, name]}
        key={name}
        className={`formListError ${listItem.className} ${
          formListNum === 1 ? 'noColon' : ''
        }`}
        rules={listItem.rules}
        label={labelItem}
        // {...formItemLayout}
        colon={formListNum !== 1}
        style={{ marginBottom: 0 }}
        {...handlFormItemOpts(listItem)}
      >
        {KKBFormItem(
          {
            ...listItem,
            options: {
              style: { width: '224px', ...style },
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
  // const onRemove = ({ fields, field, remove, index }: any, type: string) => {
  //   const handleMinNum = minNum || 0;
  //   const len = haveDefaut ? fields.length : fields.length - 1;
  //   if (len < handleMinNum) {
  //     tips.error(`无法移除，最少保留${handleMinNum}个`);
  //     return;
  //   }
  //   if (type === 'default') {
  //     setDefault(false);
  //     return;
  //   }
  //   let removeFlag = true;
  //   if (removeFn) {
  //     removeFlag = removeFn?.({
  //       fields,
  //       remove,
  //       currentField: field,
  //       currentIndex: index,
  //     });
  //   }

  //   if (removeFlag) remove(field.name);
  // };

  const addBtn = ({ add, fields }: any) => {
    if (hiddenAdd) {
      return fields.length < (maxNum || 9999) ? (
        <Form.Item
          // {...formItemButtonLabel}
          style={{
            marginBottom: '0px',
            // marginLeft: `${index === 0 && !haveDefaut ?'126px':'0'}`,
            marginLeft: !haveDefaut ? '126px' : '0',
            width: '530px',
            ...style,
          }}
        >
          {/* <div
            style={{
              display: 'flex',
              flexDirection: 'row',
              width: '530px',
              marginLeft: '4px',
            }}
          >
            <div style={{ width: '530px' }}> */}
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
          {/* </div>
          </div> */}
        </Form.Item>
      ) : null;
    }

    return (
      <Form.Item
        // {...formItemButtonLabel}
        style={{
          marginBottom: '0px',
          marginLeft: '126px', 
          width: '530px',
          ...style,
        }}
      >
        {/* <div
          style={{
            display: 'flex',
            flexDirection: 'row',
            width: '530px',
            marginLeft: '4px',
          }}
        >
          <div style={{ width: '530px' }}> */}
        <Button
          type="dashed"
          onClick={() => addCallback({ add, fields })}
          block
        >
          <PlusOutlined /> {addText}
        </Button>
        {desc ? <div>{desc}</div> : null}
        {/* </div>
        </div> */}
      </Form.Item>
    );
  };

  // useEffect(() => {
  //   addCallback({ add, fields });
  // }, []);
  return (
    <div className={getPrefixCls('DyOperateListWrap')}>
      <Form.List name={props.name}>
        {(fields, { add }) => {
          return (
            <>
              {haveDefaut ? (
                <Form.Item label={formlist?.[0]?.label}>
                  <Space size={[20, 0]} align="start">
                    {formlist?.map((item, itemNum) => {
                      const num = 0;
                      return handleFormItem({
                        field: '',
                        listItem: item,
                        formListNum: itemNum,
                        fieldNum: num,
                      });
                    })}

                    {/* 移除icon */}
                    {/* <MinusCircleOutlined
                    onClick={() => onRemove({ fields, remove }, 'default')}
                    style={{
                      position: 'relative',
                      left: '-16px',
                      fontSize: 20,
                      color: 'rgba(0, 0, 0, 0.25)',
                    }}
                  /> */}
                  </Space>
                </Form.Item>
              ) : null}
              {fields?.map((field, index: number) => {
                return (
                  <Form.Item
                    key={field.key}
                    label={
                      index === 0 && !haveDefaut ? formlist?.[0]?.label : ''
                    }
                    // labelCol={{ xs: { span: 24 }, sm: { span: 4 } }}
                    // {...(index === 0 && !haveDefaut
                    //   ? formItemLayout
                    //   : formItemLayoutWithOutLabel)}
                    style={{
                      // 添加按钮不隐藏最后一项或者不是最后一项设置bottom, 按钮隐藏后最后一项不设置bottom
                      marginBottom: `${
                        (index === fields?.length - 1 &&
                          hiddenAdd &&
                          fields.length < (maxNum || 9999)) ||
                        index !== fields?.length - 1
                          ? '24px'
                          : '0'
                      }`,
                      marginLeft: !haveDefaut ? '126px' : '0'
                      // marginLeft: `${
                      //   index === 0 && !haveDefaut ? '0' : '126px'
                      // }`,
                    }}
                  >
                    <Space key={field.key} size={[20, 0]} align="start">
                      {formlist?.map((item, itemNum) => {
                        return handleFormItem({
                          field,
                          listItem: item,
                          formListNum: itemNum,
                          fieldNum: index,
                        });
                      })}

                      {/* 移除icon */}
                      {/* <MinusCircleOutlined
                        onClick={() =>
                          onRemove({ fields, field, remove, index }, '')
                        }
                        style={{
                          position: 'relative',
                          left: '-16px',
                          fontSize: 20,
                          color: 'rgba(0, 0, 0, 0.25)',
                        }}
                      /> */}

                      {/* {fields.length > index + 1 ? <Divider /> : null} */}
                      {/* </div> */}
                    </Space>
                  </Form.Item>
                );
              })}
              {/* {add()} */}
              {addBtn({ add, fields })}
            </>
          );
        }}
      </Form.List>
    </div>
  );
};

export default DyOperateItem;
