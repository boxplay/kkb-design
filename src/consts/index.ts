import { merge } from 'lodash';
import { KKBFormUse, SwapData } from './KKBForm.swap';
import { KKBSearchUse } from './KKBSearch.swap';

export const IMG_HOST = 'https://img.kaikeba.com';

interface IQiniuOpts {
  imgHost?: string;
  action?: string;
  prefix: string;
  token: string;
}
interface GlobalConfig {
  uploadOpts?: IQiniuOpts;
  KKBFormUse?: Array<SwapData<any>>;
  KKBSearchUse?: Array<SwapData<any>>;
}

// eslint-disable-next-line import/no-mutable-exports
let globalData: GlobalConfig = {
  // 上传图片配置
  uploadOpts: {
    imgHost: IMG_HOST, // 图片前缀
    prefix: 'kkb/', // 上传二级目录名
    token: '',
    action: ''
  },
};

// 全局配置
const KKBConfig = (opts: GlobalConfig = {}) => {
  globalData = merge(globalData, opts);

  // gmForm外置组件挂载
  const KKBFormData = opts.KKBFormUse;
  if (KKBFormData) {
    KKBFormUse(KKBFormData);
  }

  // vgSearch外置组件挂载
  const KKBSearchData = opts.KKBSearchUse;
  if (KKBSearchData) {
    KKBSearchUse(KKBSearchData);
  }
};

export { globalData, KKBConfig };
