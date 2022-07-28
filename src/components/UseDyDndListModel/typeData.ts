import { KKBBoxType } from '../../lib/KKBForm/typeData';

export interface DyDndListModelOptions {
  /** 弹层标题 */
  modalTitle?: string;
  /** 添加组件默认参数 */
  addValue?: { [key in string]: any };
  /** 动态添加的组件数据，单次添加的组件 */
  formlist?: KKBBoxType[];
  /** 列表映射字段 */
  mapping?: {
    title: string;
    desc: string;
  };
  customTitle?: (text: string, index: number) => string;
  customDesc?: (text: string, index: number) => string;
  /** 最大添加数量 */
  maxNum?: number;
  /** 最小数量，低于此值不可移除组件 */
  minNum?: number;
  /** 超出添加上限时，是否隐藏添加按钮 */
  hiddenAdd?: boolean;
  /** 是否禁用可拖拽 */
  disableDrap: boolean;
}

export type ListDataTypeScope = any[];

export type EditorOrDelFn = (
  itemData: { [key in string]: any },
  index: number,
) => void;

/** 内部list数据结构 */
export interface GenerateItemData {
  options: DyDndListModelOptions;
  index: number;
  config: any;
}

/** 当前编辑数据 */
export interface CurrentDataType {
  index: number;
  data: any;
}
