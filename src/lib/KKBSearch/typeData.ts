import { ColProps } from 'antd';
import { Store } from 'antd/lib/form/interface';
import { Rule } from 'antd/lib/form';
import { DataType } from './boxType';

export type labelAlignType = 'right' | 'left';
export type btnLabelAlignType =
  | 'right'
  | 'left'
  | 'center'
  | '-moz-initial'
  | 'inherit'
  | 'initial'
  | 'revert'
  | 'unset'
  | 'end'
  | 'start'
  | 'justify'
  | 'match-parent'
  | undefined;
export type dataType = 'list' | 'group';

export interface DataItem {
  label: React.ReactNode;
  value: string | number | boolean;
  disabled?: boolean;
}

export interface RadioItem {
  label: string;
  value: string | number | boolean | null | undefined;
}

// export interface SelectValue {
//   value: string;
// }

// 动态组件item参数，每个组件会有独立专用参数
export interface ItemKKBSearch {
  type: DataType | string;
  placeholder: string;
  name: string;
  className?: string;
  label?: string;
  options?: any;
  rules?: Rule[];
  noForm?: boolean;
  data?: DataItem[] | any;
  span?: Number | any;
  custom?: (data: ItemKKBSearch) => React.ReactNode;
  callback?: (value: any) => void;
  onChange?: (value: any) => void;
  mapping?: mapping;
}

// 动态组件item参数，每个组件会有独立专用参数
export interface VgboxDataItem {
  name: string;
  label: string;
  rules: any;
  span: number;
  type: DataType | string;
  placeholder: string;
  options?: any
}

export interface mapping {
  label: string;
  value: string;
}
// 组件props参数
export interface KKBSearchProps {
  miniSearch?:boolean;
  boxData: VgboxDataItem[];
  saveBtnText?: string;
  resetBtnText?: string;
  defaultValue: Store;
  customBottomBtn?: string | React.ReactElement;
  bottomWrap?: (el: React.ReactElement) => React.ReactElement;
  labelAlign?: labelAlignType;
  loading?: boolean;
  wrapperCol?: ColProps;
  labelCol?: ColProps;
  style?: React.CSSProperties;
  btnTextAlign: btnLabelAlignType;
  btnSpan: number;
  searchFn: (values: FormValues) => void;
  searchResetFn: (values: FormValues) => void;
  isCollapse?: boolean;
  collapseChange?: (active: boolean) => void;
  dataType?: dataType;
  onValuesChange: (currentValues: any, allValues: any) => void;
  customBtn?: React.ReactElement;
  defaultCollaps?: boolean; // 默认是否折叠
  isPasteSearch?: boolean;
  isClearSearch?: boolean;
}

// ref对象参数
export interface KKBSearchRef {}

// 表单value
export interface FormValues {
  [key: string]: any;
}

export type setStateAction = React.SetStateAction<any>;
