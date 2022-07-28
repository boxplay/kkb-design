import React from 'react';
import { Form, FormItemProps } from 'antd';
import { handleLabelCom } from '../../../../utils/form_utils';
import { KKBBoxType } from '../../typeData';
import { getPrefixCls } from '../../../../utils';
import { KKBFORM_TYPE } from '../../boxType';
import '../../index.less';
import './index.less';

interface ExtensionFormItemProps {
  config: KKBBoxType;
  children: any;
}

interface FormItemCommonData {
  isExtension?: boolean;
}

type ExtensionFormItemType = (
  props: ExtensionFormItemProps,
) => React.ReactElement;

const ExtensionFormItem: ExtensionFormItemType = ({ children, config }) => {
  const { right, bottom } = config;

  // 处理部份参数警告
  const handlFormItemOpts = (itemData?: KKBBoxType): FormItemProps => {
    const formItemOpts: FormItemProps = {};
    // 解决警告：Switch组件在Form中需要映射参数
    if (itemData?.type === KKBFORM_TYPE.switch) {
      formItemOpts.valuePropName = 'checked';
    }

    return formItemOpts;
  };

  // 通用form函数，isExtension是否扩展右侧
  const formItemCommon = (data?: FormItemCommonData) => {
    const { isExtension } = data || {};
    const classnames = `${
      isExtension
        ? getPrefixCls('extensionFormItem')
        : config.className || getPrefixCls('formItemWrap')
    } ${config.options?.style?.width === undefined ? '' : 'customContronl'} ${
      config.type === KKBFORM_TYPE.checkbox ||
      (config.type === KKBFORM_TYPE.radio &&
        config.options?.optionType !== 'button')
        ? 'checkField'
        : ''
    }
            ${config.type === KKBFORM_TYPE.uploadImg ? 'extUploadImg' : ''} ${
      config.type === KKBFORM_TYPE.multiExtCom ? 'multiExtComBox' : ''
    }
            ${
              config.type === KKBFORM_TYPE.uploadFile &&
              config.options?.btnType === 'dragger'
                ? 'extUploadFile'
                : ''
            }
            ${config.options?.operateType === 'preview' ? 'extPreviewWrap' : ''}
            ${
              config.type === 'datePicker' || config.options?.shortcontrol
                ? 'shortcontrol'
                : ''
            }
            ${config.type === 'textArea' ? 'areaControl' : ''}
            `;
    return (
      <Form.Item
        wrapperCol={config.wrapperCol}
        name={config.name}
        label={isExtension ? null : handleLabelCom(config)}
        rules={config.rules}
        validateStatus={config.validateStatus}
        hasFeedback={config.hasFeedback}
        noStyle={isExtension}
        className={classnames}
        {...handlFormItemOpts(config)}
        // style={config?.options?.style}
        extra={bottom} // 底部组件
      >
        {children}
      </Form.Item>
    );
  };

  // 右侧组件
  const handleRightCom = (): React.ReactNode => {
    if (!right) return formItemCommon();
    // console.log('donfig', config)
    return (
      <Form.Item
        label={handleLabelCom(config)}
        className={config.className || getPrefixCls('formItemWrap')}
        extra={bottom} // 底部组件
        // style={config?.options?.style}
      >
        {formItemCommon({ isExtension: true })}
        <div className={getPrefixCls('rightItemBox')}>{right}</div>
      </Form.Item>
    );
  };

  return <>{handleRightCom()}</>;
};

export default ExtensionFormItem;
