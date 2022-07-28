import moment from 'moment';
import {
  SHOULD_NOT_BE_USED,
  VALUE_SEIZE_A_SEAT,
} from '../consts/warningTipText';

/**
 * 样式统一前缀处理方法
 * @suffixCls 样式名称
 * @customizePrefixCls 完全自定义样式
 */

let CssName: string = '';
export const deafultCss = (name: string) => {
  CssName = name;
};

export const getPrefixCls = (
  suffixCls?: string,
  customizePrefixCls?: string,
): string => {
  if (customizePrefixCls) return customizePrefixCls;
  return CssName
    ? suffixCls
      ? `${CssName}-${suffixCls}`
      : `${CssName}`
    : suffixCls
    ? `ant-${suffixCls}`
    : `ant`;
};

// table 计算 字符串宽度
export const stringLength = (str: string) => {
  let len = 0;
  for (let i = 0; i < str.length; i += 1) {
    if (str.charCodeAt(i) > 127 || str.charCodeAt(i) === 94) {
      len += 2;
    } else {
      len += 1;
    }
  }
  return len;
};

export interface moneyProps {
  num: string | number | null | undefined;
  defaultSymbol?: string;
}

// table 处理 金额
export const moneyHandle = (props: moneyProps) => {
  const { num, defaultSymbol = '-' } = props;
  let newNum = '';
  if (num || num === 0) {
    if (Number.isNaN(num) || Number.isNaN(Number(num))) {
      return defaultSymbol;
    }
    if (typeof num === 'string') {
      newNum = num;
    } else {
      newNum += num;
    }
  } else {
    return defaultSymbol;
  }

  if (newNum.indexOf('.') === -1) {
    newNum += '.00';
  }

  if (newNum.length - newNum.indexOf('.') === 2) {
    newNum += '0';
  }

  if (newNum.length - newNum.indexOf('.') > 3) {
    newNum = newNum.slice(0, newNum.indexOf('.') + 3);
  }

  const numFoot = newNum.split('.');
  const numHead = toThousands(numFoot[0]);
  return `￥${numHead}.${numFoot[1]}`;
};

// 每3位加,
function toThousands(num: string) {
  let result = '';
  let counter = 0;
  for (let i = num.length - 1; i >= 0; i -= 1) {
    counter += 1;
    result = num.charAt(i) + result;
    if (!(counter % 3) && i !== 0) {
      result = `,${result}`;
    }
  }
  return result;
}

export const dateDiff = (time: any) => {
  function add0(m: any) {
    return m < 10 ? `0${m}` : m;
  }
  let ntime = `${time}`;

  // eslint-disable-next-line no-underscore-dangle
  if (time._isAMomentObject) {
    ntime = `${moment(time).unix()}`
  }
  // 10位 13位时间戳
  if (ntime.indexOf('-') === -1) {
    const ctime = new Date(
      ntime.length === 10 ? Number(ntime) * 1000 : Number(ntime),
    );
    const y = ctime.getFullYear();
    const m = ctime.getMonth() + 1;
    const d = ctime.getDate();
    const h = ctime.getHours();
    const mm = ctime.getMinutes();
    const s = ctime.getSeconds();
    ntime = `${y}-${add0(m)}-${add0(d)} ${add0(h)}:${add0(mm)}:${add0(s)}`;
  }
  // 日期中含有T
  if (ntime.includes('T')) {
    ntime = ntime.replace('T', ' ');
  }
  // 直接算好的
  return ntime.split(' ');
};

export const computePage = (
  total: number | undefined,
  size: number | undefined,
) => {
  const ntotal = Number(total);
  const nsize = Number(size);
  if (ntotal % nsize) {
    return Math.ceil(ntotal / nsize);
  }
  return ntotal / nsize;
};

export const getRandomNumberByRange = (start: number, end: number) => {
  return Math.floor(Math.random() * (end - start) + start);
};

// 时间处理
export const formatDate = (dateTime: Date, fmt: string | undefined) => {
  if (!dateTime) return ''; // 传入参数不存在时退出
  const o = {
    'M+': dateTime.getMonth() + 1, // 月份
    'd+': dateTime.getDate(), // 日
    'h+': dateTime.getHours(), // 小时
    'm+': dateTime.getMinutes(), // 分
    's+': dateTime.getSeconds(), // 秒
    'q+': Math.floor((dateTime.getMonth() + 3) / 3), // 季度
    S: dateTime.getMilliseconds(), // 毫秒
  };
  let newDataStrin = fmt || 'yyyy-MM-dd hh:mm:ss.S';
  if (/(y+)/.test(newDataStrin)) {
    newDataStrin = newDataStrin.replace(
      RegExp.$1,
      `${dateTime.getFullYear()}`.substr(4 - RegExp.$1.length),
    );
  }
  // eslint-disable-next-line
  for (const k in o) {
    if (new RegExp(`(${k})`).test(newDataStrin)) {
      newDataStrin = newDataStrin.replace(
        RegExp.$1,
        RegExp.$1.length === 1 ? o[k] : `00${o[k]}`.substr(`${o[k]}`.length),
      );
    }
  }
  return newDataStrin;
};

// 生成uuid
export function uuid(len: number, radix: number = 10) {
  const chars =
    '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz'.split('');
  const uuidData = [];
  let i;
  const newRadix = radix || chars.length;

  if (len) {
    for (i = 0; i < len; i++)
      uuidData[i] = chars[0 | (Math.random() * newRadix)];
  } else {
    let r;
    // eslint-disable-next-line no-multi-assign
    uuidData[8] = uuidData[13] = uuidData[18] = uuidData[23] = '-';
    uuidData[14] = '4';

    for (i = 0; i < 36; i++) {
      if (!uuidData[i]) {
        r = 0 | (Math.random() * 16);
        uuidData[i] = chars[i === 19 ? (r & 0x3) | 0x8 : r];
      }
    }
  }

  return uuidData.join('');
}

/**
 *
 * @param properties 校验的属性列表
 * @param verifiedData 被校验的数据
 * @param tipsText 提示文案 `warning：VALUE_SEIZE_A_SEAT 描述` 格式， NODE_NAME_SEIZE_A_SEAT是属性名称占位
 */
export const verifyNodeProperties = (
  properties: string[],
  verifiedData: Object,
  tipsText?: string,
) => {
  if (
    !properties ||
    properties.length <= 0 ||
    !verifiedData ||
    Object.keys(verifiedData).length <= 0
  )
    return;

  properties.forEach((value: string) => {
    if (value in verifiedData) {
      if (tipsText) {
        console.warn(tipsText.replace(VALUE_SEIZE_A_SEAT, value));
      } else {
        console.warn(SHOULD_NOT_BE_USED.replace(VALUE_SEIZE_A_SEAT, value));
      }
    }
  });
};
