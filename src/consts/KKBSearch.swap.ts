import SEARCH_TYPE  from '../lib/KKBSearch/boxType';

type ComponentType<T> = React.ComponentType<T>;

/**
 * vgSearch外置组件
 */
export const KKBSearchSwapData = new Map<String, ComponentType<any>>();

export interface SwapData<T> {
  type: string;
  component: ComponentType<T>;
}

const disabledKeys = Object.keys(SEARCH_TYPE);
export type KKBSearchUseFuncType = <T>(data: Array<SwapData<T>>) => void;

/**
 * 新增vgSearch内置组件，供全局页面使用
 */
export const KKBSearchUse: KKBSearchUseFuncType = (data) => {
  data?.forEach((el) => {
    const { type } = el;
    if (SEARCH_TYPE[type]) {
      console.warn(
        `禁用字段：${type}，请把name更换其它名称，内置禁用字段有：${disabledKeys.join(
          '、',
        )}`,
      );
      return;
    }
    KKBSearchSwapData.set(type, el.component);
  });
};
