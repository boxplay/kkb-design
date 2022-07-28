import { RcFile } from 'antd/lib/upload';
import { formatDate } from './index';
import { globalData, IMG_HOST } from '../consts';
import {
  FileListItem,
  ImageSizeType,
  FileVolumeType,
  UploadValueData,
} from '../lib/KKBUploadImg/typeData';
import Tips from './tips_utils';
import { Modal } from 'antd';

/**
 * 生成随机字符串
 * @param {*} length
 * @param {*} chars
 */
export const randomString = (
  length = 4,
  chars = 'abcdefghijklmnopqrstuvwxyz',
) => {
  let result = '';
  // eslint-disable-next-line
  for (let i = length; i > 0; --i)
    result += chars[Math.floor(Math.random() * chars.length)];
  return result;
};

/**
 * 随机生成图片urlKey
 */
export const generateName = () => {
  const key = `${formatDate(new Date(), 'yyyy_MM_dd_mmss')}_${randomString(
    12,
  )}`;
  return key;
};

/**
 * 生成七牛 唯一名称路径
 */
export const generateQiniuUrlKey = (file: FileListItem) => {
  const ext = file.name.split('.').splice(-1);
  const key = `${globalData.uploadOpts?.prefix}${generateName()}.${ext}`; // 自定义文件名
  return key;
};

// 获取七牛完整url
export const getQiniuFileUrl = (fileName: string) => {
  const imageUrl = `${globalData.uploadOpts?.imgHost || IMG_HOST}${fileName}`;
  return imageUrl;
};

// 把file文件转成blob
export const getBase64 = (
  img: File | Blob | undefined,
  callback?: Function,
): Promise<string> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    if (img) reader.readAsDataURL(img);
    reader.onload = async () => {
      await callback?.(reader.result);
      resolve(reader.result?.toString() || '');
    };
    reader.onerror = (error) => reject(error);
  });
};

/**
 * image 尺寸检测宽高
 */
export const imgSizeCheck = async (
  files: RcFile,
  imageSize: ImageSizeType,
  fixedSize: boolean,
  useAspectRatio?: boolean
) => {
  if (!imageSize) return false;

  const fileBuffer = await getBase64(files);
  return new Promise((resolve) => {
    const image = new Image();
    image.src = fileBuffer;
    const [imageSizeWidth, imageSizeHeight] = imageSize || [];
    image.onload = () => {
      switch (imageSize?.length || 0) {
        case 1:
          // 严格要求宽高相等
          if (fixedSize) {
            // 只有宽
            if (imageSizeWidth && !(image.width === imageSizeWidth)) {
              Tips.error(`图片尺寸错误，请上传${imageSizeWidth}宽度的图片！`);
              resolve(false);
            }
            resolve(true);
            break;
          }
          // 非严格要求
          if (image.width >= imageSizeWidth) {
            Tips.error(`图片尺寸错误，请上传宽${imageSize[0]}px的图片！`);
            resolve(false);
          }
          resolve(true);
          break;
        case 2:
          // 使用用户定义的宽高比上传
          if(useAspectRatio) {
            // 用户定义的宽高比
            const defineRatio = imageSizeWidth / imageSizeHeight
            // 图片自身的宽高比
            const imageRatio = image.width / image.height
            
            if(defineRatio <= 0) {
              Tips.error(`如果使用宽高比(useAspectRatio)上传，imageSize属性的值必须大于0`);
              resolve(false)
            }
            const defineRatioAfter = defineRatio + 0.05
            const defineRatioBefore = defineRatio - 0.05
            if(imageRatio <= defineRatioBefore || imageRatio >= defineRatioAfter) {
              Tips.error(`使用宽高比(useAspectRatio)上传，请使用符合imageSize宽高比的图片`);
              resolve(false)
            }
            resolve(true)
            break
          }
          // 严格要求宽高相等
          if (fixedSize) {
            // 只有宽
            if (
              imageSizeWidth &&
              !imageSizeHeight &&
              !(image.width === imageSizeWidth)
            ) {
              Tips.error(`图片尺寸错误，请上传${imageSizeWidth}宽度的图片！`);
              resolve(false);
              break;
            }
            // 只有高
            if (
              !imageSizeWidth &&
              imageSizeHeight &&
              !(image.height === imageSizeHeight)
            ) {
              Tips.error(`图片尺寸错误，请上传${imageSizeHeight}高度的图片！`);
              resolve(false);
              break;
            }
            // 宽高都有情况下，并且宽或高二者之一不满足之时
            const flag = imageSizeWidth && imageSizeHeight;
            if (
              (flag && !(image.width === imageSizeWidth)) ||
              (flag && !(image.height === imageSizeHeight))
            ) {
              Tips.error(
                `图片尺寸错误，请上传${imageSizeWidth}宽 * ${imageSizeHeight}高的图片！`,
              );
              resolve(false);
              break;
            }
          }

          // <范围尺寸处理
          if (
            imageSizeWidth &&
            !imageSizeHeight &&
            !(image.width <= imageSizeWidth)
          ) {
            Tips.error(`图片尺寸错误，请上传小于${imageSizeWidth}宽度的图片！`);
            resolve(false);
            break;
          }
          // 高
          if (
            !imageSizeWidth &&
            imageSizeHeight &&
            !(image.height <= imageSizeHeight)
          ) {
            Tips.error(
              `图片尺寸错误，请上传小于${imageSizeHeight}高度的图片！`,
            );
            resolve(false);
            break;
          }

          if (
            imageSizeWidth &&
            imageSizeHeight &&
            !(image.width <= imageSizeWidth) &&
            !(image.height <= imageSizeHeight)
          ) {
            Tips.error(
              `图片尺寸错误，请上传小于${imageSizeWidth}宽 * ${imageSizeHeight}高的图片！`,
            );
            resolve(false);
            break;
          }
          resolve(true);
          break;
        default:
          resolve(true);
          break;
      }
    };
  });
};

/**
 * image 文件大小检测
 */
export const imageVolumeCheck = (file: any, checkValue: FileVolumeType) => {
  if (!checkValue) return true;
  const fileSize = file.size; // b
  if (checkValue.type === 'kb') {
    if (fileSize / 1024 > checkValue.fileSize) {
      Tips.error(`文件超出限定大小，请上传不大于${checkValue.fileSize}kb！`);
      return false;
    }
  }
  if (checkValue.type === 'M') {
    if (fileSize / 1024 / 1024 > checkValue.fileSize) {
      Tips.error(`文件超出限定大小，请上传不大于${checkValue.fileSize}M！`);
      return false;
    }
  }
  return true;
};

export function checkFileType(file: any, accept: string) {
  if (!accept.split(',').includes(file.type) && accept !== '*') {
    Modal.error({
      title: '文件类型错误，请重新上传',
    })
    return false
  } 
    return true
}

interface ImageMaxSizeCheckData {
  fileList: UploadValueData;
  maxNum?: number | null;
  upFileList: RcFile[];
}
/**
 * 上传文件数量限制
 * @fileList 已有file文件列表
 * @upFileList 当前正在上传列表
 * @maxNum 最大上传限制
 */
export const imageMaxSizeCheck = ({
  fileList = [],
  maxNum,
  upFileList = [],
}: ImageMaxSizeCheckData): boolean => {
  if (!maxNum) return true;
  const hasNum = fileList?.length || 0;
  const curNum = upFileList?.length || 0;
  // 最大限制数量 未超过上传+现有数量
  if (maxNum >= hasNum + curNum) return true;
  Tips.error(`上传超出限定数量，总数量最多${maxNum}个！`);
  return false;
};

export const docCookies = {
  getItem(sKey: string | number | boolean) {
    return (
      decodeURIComponent(
        document?.cookie?.replace(
          new RegExp(
            `(?:(?:^|.*;)\\s*${encodeURIComponent(sKey).replace(
              /[-.+*]/g,
              '\\$&',
            )}\\s*\\=\\s*([^;]*).*$)|^.*$`,
          ),
          '$1',
        ),
      ) || null
    );
  },
  setItem(
    sKey: string | number | boolean,
    sValue: string | number | boolean,
    vEnd: number | Date,
    sPath: any,
    sDomain: any,
    bSecure: any,
  ) {
    if (!sKey || /^(?:expires|max-age|path|domain|secure)$/i.test(sKey as string)) {
      return false;
    }
    let sExpires = '';
    if (vEnd) {
      switch (vEnd.constructor) {
        case Number:
          sExpires =
            vEnd === Infinity ? '; expires=Fri, 31 Dec 9999 23:59:59 GMT' : `; max-age=${vEnd}`;
          break;
        case String:
          sExpires = `; expires=${vEnd}`;
          break;
        case Date:
          if (vEnd.constructor === Date) sExpires = `; expires=${vEnd.toUTCString()}`;
          break;
        default:
          break;
      }
    }
    if (document) {
      document.cookie = `${encodeURIComponent(sKey)}=${encodeURIComponent(sValue)}${sExpires}${
        sDomain ? `; domain=${sDomain}` : ''
      }${sPath ? `; path=${sPath}` : ''}${bSecure ? '; secure' : ''}`;
      return true;
    }
    return false;
  },
  removeItem(sKey: string | number | boolean, sPath: any, sDomain: any) {
    if (!sKey || !this.hasItem(sKey)) {
      return false;
    }
    if (document) {
      document.cookie = `${encodeURIComponent(sKey)}=; expires=Thu, 01 Jan 1970 00:00:00 GMT${
        sDomain ? `; domain=${sDomain}` : ''
      }${sPath ? `; path=${sPath}` : ''}`;
      return true;
    }
    return false;
  },
  hasItem(sKey: string | number | boolean) {
    return new RegExp(
      `(?:^|;\\s*)${encodeURIComponent(sKey).replace(/[-.+*]/g, '\\$&')}\\s*\\=`,
    ).test(document?.cookie);
  },
  keys() {
    const aKeys = document?.cookie
      .replace(/((?:^|\s*;)[^=]+)(?=;|$)|^\s*|\s*(?:=[^;]*)?(?:\1|$)/g, '')
      .split(/\s*(?:=[^;]*)?;\s*/);
    for (let nIdx = 0; nIdx < aKeys.length; nIdx += 1) {
      aKeys[nIdx] = decodeURIComponent(aKeys[nIdx]);
    }
    return aKeys;
  },
};
