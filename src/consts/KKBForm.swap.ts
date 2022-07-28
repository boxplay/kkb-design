import { KKBFORM_TYPE } from '../lib/KKBForm/boxType';

type ComType<T> = React.ComponentType<T>;

/** gmForm外置组件 */
export const KKBFormSwapData = new Map<string, ComType<any>>();

export interface SwapData<T> {
  type: string;
  component: ComType<T>;
}

const disableKey = Object.entries(KKBFORM_TYPE).map(([key]) => key);

export type KKBFormUseFnType = <T>(data: Array<SwapData<T>>) => void;

/**
 * 新增gmForm内置组件，供全局其它页面使用
 */
export const KKBFormUse: KKBFormUseFnType = (data) => {
  data?.forEach((item) => {
    const { type } = item;
    if (KKBFORM_TYPE[type]) {
      console.warn(
        `禁用字段：${type}，请把name更换其它名称，内置禁用字段有：${disableKey.join(
          '、',
        )}`,
      );
      return;
    }
    KKBFormSwapData.set(type, item.component);
  });
};
