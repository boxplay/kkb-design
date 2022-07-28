import { ColProps } from 'antd';
import { FormInstance, Rule } from 'antd/lib/form';
import { RequiredMark } from 'antd/lib/form/Form';
import { NamePath } from 'antd/lib/form/interface';
import React from 'react';
import { KKBDataType } from './boxType';

export type labelAlignType = 'right' | 'left';
// boxData数据格式，数组形式使用
export interface BoxDataItem {
  label: React.ReactElement;
  value: string | number | boolean;
  disabled?: boolean;
}

export interface RadioItem {
  label: string;
  value: string | number | boolean | null | undefined;
}
// customContent数据格式
export interface customContentItem {
  text?: string | undefined;
  position?: string;
  style?: React.CSSProperties;
  onclick?: (value: any) => void;
  customform?: string | React.ReactElement | undefined;
}

// 动态组件item参数，每个组件会有独立专用参数
export interface KKBBoxType {
  /** 组件类型 */
  type: KKBDataType | string;
  /** form表单key值 */
  name: string;
  key: string;
  /** 外层样式 */
  className?: string;
  /** 左侧标签内容 */
  label?: string | React.ReactNode;
  /** 鼠标移入提示内容 */
  labelTips?: string[];
  /** 组件内置配置参数 */
  options?: any;
  /** 校验状态 */
  validateStatus?: 'success' | 'warning' | 'error' | 'validating';
  /** 展示校验状态图标 */
  hasFeedback?: boolean;
  /** form表单验证规则 */
  rules?: Rule[];
  /** 是否关闭form组件包裹 */
  noForm?: boolean;
  /** 子组件列表 */
  children?: KKBBoxType[];
  /** 组件数据源 */
  data?: BoxDataItem[] | any;
  /** 需要为输入控件设置布局样式时，使用该属性，用法同 labelCol */
  wrapperCol?: ColProps;
  /** 自定义组件 */
  custom?: (data: KKBBoxType) => React.ReactElement;
  /** 组件内容改变时回调 */
  onChange?: (value: any) => void;
  right?: React.ReactNode;
  /** 组件Item底部扩展内容 */
  bottom?: React.ReactNode;
  /** 外层样式 */
  style?: React.CSSProperties;
  /** 自定义组件宽度 */
  customWidth: boolean;
  mapping?: mapping;
  // 渲染boxDataItem
  renderBoxDataItem?: (item: any, index: number) => BoxDataItem;
}
export interface mapping {
  label: string;
  value: string;
}
export interface ExtensionConfig {
  className: string;
  component: React.ReactElement;
}

/**
 * 通用组件配置参数，各组件参数混用
 */
export interface GmBoxOptions {
  [key: string]: any;
}

// GmForm组件props参数
export interface KKBFormProps {
  /** 标题 */
  title?: string | null;
  /** 定义生成组件的类型 */
  boxData: KKBBoxType[];
  /** 保存按钮文案内容 */
  saveBtnText?: string | null;
  /** 取消按钮文案内容 */
  cancelBtnText?: string | null;
  /** 保存按钮submit事件 */
  saveFn?: (values: FormValues) => void;
  /** 取消按钮事件 */
  cancelFn?: () => void;
  /** form表单默认参数 */
  defaultValue?: FormValues;
  /** 自定义表单底部按钮组件 */
  customBottomBtn?: string | React.ReactElement;
  /** 底部按钮组件外层组件，一般用于权限控制之类 */
  bottomWrap?: (el: React.ReactElement) => React.ReactElement;
  /** label 标签的文本对齐方式 */
  labelAlign?: labelAlignType;
  /** 页面是否加载中 */
  loading?: boolean;
  /** 需要为输入控件设置布局样式时，使用该属性，用法同 labelCol */
  wrapperCol?: ColProps;
  /** label 标签布局，同 <Col> 组件，设置 span offset 值，如 {span: 3, offset: 12} 或 sm: {span: 3, offset: 12} */
  labelCol?: ColProps;
  /** 表单布局 */
  layout?: 'horizontal' | 'vertical' | 'inline';
  /** 外层样式 */
  style?: React.CSSProperties;
  /** 字段值更新时触发回调事件 */
  onValuesChange?: (changedValues: any, values: FormValues) => void;
  requiredMark?: boolean | RequiredMark;
  onFinishFailed?: (errorInfo: any) => void;
  scrollToFirstError?: boolean | any;
  /** 表单类型 page为页面中的表单, form为弹框中的表单 */
  pageType?: 'page' | 'form';
  /** 表单外的元素 */
  extraCustom?: () => React.ReactElement;
  /** 表单位置 */
  formAlign?: 'center' | 'start' | 'end';
}

// ref对象参数
export interface KKBFormRef {
  /**
   * antd formRef 完整实例，FormInstance实例上所有方法
   */
  formRef: FormInstance<any>;
  /**
   * 设置form参数
   */
  setValue: <T>(values: T | FormValues) => void;
  /** 获取表单内所有值 */
  getValue: <T>() => T | any;
  /** 提交表单，与点击 submit 按钮效果相同 */
  submit: () => any;
  /** 触发表单验证 */
  validateFields: (nameList?: NamePath[] | undefined) => Promise<any>;
  /** 重置表单 */
  resetFields: (nameList?: NamePath[] | undefined) => void;
}

// form表单value内容
export interface KKBFORM_TYPE {
  [key: string]: any;
}
export interface FormValues {
  [key: string]: any;
}
/** 热插拨props参数 */
export interface UseFormProps<V, O> {
  value: V;
  onChange: (value: V) => void;
  type: string;
  name: string;
  id: string;
  options?: O;
  data?: any;
  rules?: Rule[];
  className?: string;
  formRef: FormInstance<any>;
}
