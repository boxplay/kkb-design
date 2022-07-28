/* eslint-disable no-unused-vars */
import { FormInstance, Rule } from 'antd/lib/form';
import { FormListFieldData } from 'antd/lib/form/FormList';
import { KKBBoxType } from '../../lib/KKBForm/typeData';

export interface DyInputFormListProps {
  /** form表单总体key，返回类型是 object[] */
  name: string;
  /** 组件样式class */
  className?: string;
  /** 分割标题 */
  title: string;
  /** 添加按钮文字内容 */
  addText?: string;
  /** 超出添加上限时，是否隐藏添加按钮 */
  hiddenAdd?: boolean;
  /** 所有验证规则 */
  rules?: Rule[];
  /** 动态添加的组件数据，单次添加的组件 */
  formlist?: KKBBoxType[];
  /** 七牛token */
  token?: string;
  /** 说明信息 */
  desc?: string;
  /** 样式 */
  style?: React.CSSProperties;
  /** 添加组件默认参数 */
  addValue?: { [key in string]: any };
  /** 移除事件回调 */
  removeFn?: (data: RemoveFnData) => boolean;
  /** 最大添加数量 */
  maxNum?: number;
  /** 最小数量，低于此值不可移除组件 */
  minNum?: number;
  formRef: FormInstance<any>;
}

export interface RemoveFnData {
  fields: FormListFieldData[];
  currentField: FormListFieldData;
  currentIndex: number;
  remove: (index: number | number[]) => void;
}

export interface FormFieldsItem {
  fields: FormListFieldData[];
  remove: (index: number | number[]) => void;
}

export interface AddDefalutData {
  [key: string]: any;
}

// 添加行add函数类型
export type AddType = (data?: any) => void;

export interface AddFn {
  add: AddType;
  fields: FormListFieldData[];
}
