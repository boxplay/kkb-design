import React, { useImperativeHandle, forwardRef } from 'react';
import { Form, Spin, Row, Col } from 'antd';
import BottomCom from './components/BottomCom';
import ExtensionFormItem from './components/ExtensionFormItem';
import { KKBFORM_TYPE } from './boxType';
import { FormValues, KKBFormProps, KKBFormRef } from './typeData';
import { KKBFormItem } from './KKBFormItem';
import { getPrefixCls } from '../../utils';
import './index.less';

const KKBForm = forwardRef<KKBFormRef, KKBFormProps>(
  (
    {
      title,
      boxData = [], // 动态表单数据，每个动态组件详细参数
      saveBtnText = '提交',
      cancelBtnText = '取消',
      saveFn, // 保存事件回调
      cancelFn,
      defaultValue = {}, // 默认初始参数
      customBottomBtn, // 自定义底部区域组件
      bottomWrap, // 自定义底部外层，例如包裹权限组件
      labelAlign = 'right', // 左侧文字对齐方式
      loading = false, // 是否显示加载中动画
      // wrapperCol = {},
      labelCol = { span: 4 },
      style,
      pageType = 'page',
      // formAlign = 'center',
      extraCustom,
      layout = 'horizontal',
      ...rest
    },
    ref,
  ) => {
    const [dyFormRef] = Form.useForm();

    // 保存提交事件
    const onFinish = (values: FormValues) => {
      saveFn?.(values);
    };

    useImperativeHandle<KKBFormRef, KKBFormRef>(ref, () => ({
      formRef: dyFormRef,
      setValue: (values) => dyFormRef?.setFieldsValue(values),
      getValue: () => dyFormRef?.getFieldsValue(),
      submit: () => dyFormRef?.submit(),
      validateFields: (nameList) => dyFormRef?.validateFields(nameList),
      resetFields: (fields) => dyFormRef?.resetFields(fields),
    }));
    // const formItemLayout = {
    //     labelCol: {
    //       xs: { span: 24 },
    //       sm: { span: 4 },
    //     },
    //     wrapperCol: {
    //       xs: { span: 24 },
    //       sm: { span: 20 },
    //     },
    //   };

    return (
      <div
        className={getPrefixCls(
          `KKBForm-dyFormWrap ${
            pageType === 'form' ? 'KKBForm-modalWrap' : ''
          }`,
        )}
        style={{ ...style }}
      >
        <Row justify="center" style={{ overflow: 'hidden' }}>
          <Col
            style={{
              width: '100%',
              overflowX: 'auto',
              display: 'flex',
              justifyContent: pageType === 'form' ? 'left' : 'center',
              marginLeft: `${pageType === 'form' ? 0 : '-196px'}`,
            }}
          >
            <Form
              {...rest}
              form={dyFormRef}
              onFinish={onFinish}
              initialValues={defaultValue}
              // wrapperCol={wrapperCol}
              // {...formItemLayout}
              labelAlign={labelAlign}
              layout={layout}
              style={{ width: pageType === 'form' ? 'auto' : '700px' }}
            >
              <Spin tip="加载中..." spinning={loading}>
                <>
                  {boxData?.map((v) => {
                    const formBoxEle = KKBFormItem(v, dyFormRef);
                    // 无form包裹
                    if (v.noForm) {
                      return (
                        <div key={v.key || v.name} className={v.className}>
                          {formBoxEle}
                        </div>
                      );
                    }

                    return (
                      <ExtensionFormItem config={v} key={v.key || v.name}>
                        {formBoxEle}
                      </ExtensionFormItem>
                    );
                  })}
                  <div className={getPrefixCls('kkbForm-outFormWrap')}>
                    {typeof extraCustom === 'function'
                      ? extraCustom?.()
                      : extraCustom}
                  </div>
                </>
              </Spin>
            </Form>
          </Col>
        </Row>
        {pageType === 'form' ? null : (
          <Row justify="center">
            <Col style={{ marginRight: '287px' }}>
              <BottomCom
                saveBtnText={saveBtnText}
                cancelBtnText={cancelBtnText}
                cancelFn={cancelFn}
                customBottomBtn={customBottomBtn}
                loading={loading}
                bottomWrap={bottomWrap}
                dyFormRef={dyFormRef}
              />
            </Col>
          </Row>
        )}
      </div>
    );
  },
);

export { KKBForm, KKBFORM_TYPE };
