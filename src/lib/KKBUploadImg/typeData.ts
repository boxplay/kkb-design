import { UploadFile, UploadListType } from 'antd/lib/upload/interface';
import { CropViewProps } from './ImgCropModal';

// 单个file文件类型
export interface FileListItem extends UploadFile<any> {
  // url: string;
  // uid?: string;
  // status?: string;
  // preview?: string;
  // name?: string;
}

// files文件类型
export type UploadValueData = UploadFile<any>[];

export type ImageSizeType = number[];
export type BaseObj = Record<string, any>;

// 组件props参数
export interface UploadImgProps {
  isCrop?: boolean;
  /** 剪裁参数 */
  cropOpts?: Omit<CropViewProps, 'file' | 'visible'>;
  style?: any;
  imageSize: ImageSizeType;
  fixedSize: boolean;
  imageVolume: FileVolumeType;
  totalNum: number;
  value?: UploadValueData;
  onChange: (data: UploadValueData | undefined) => void;
  hideDelIcon: boolean;
  hideViewIcon: boolean;
  showUploadList: boolean;
  token: string;
  limitShowBtn: boolean;
  allDoneCallback?: (files: UploadFile<any>[]) => void;
  percentCallback?: (currentPercent: number, errorLen: number) => void;
  /** 移除事件回调 */
  onRemove?: <T>(
    files: UploadFile<T>[],
    currentFile: UploadFile<T>,
  ) => Promise<boolean>;
  btnTitle?: string;
  imgHost?: string;
  accept: string;
  multiple: boolean;
  children?: any;
  isImageDesc: boolean; // 是否开启右侧描述
  imageType?: string[];
  imageLocationDesc?: string;
  imageSizeDesc?: string;
  imgVolumeDesc?: string;
  tenantid?: string;
  appid?: string;
  action?: string; // 自定义上传地址
  listType?: UploadListType;
  /** 是否单图预览 */
  singlePreview?: boolean;
  disabled?: boolean;
  /** 自定义上传参数 */
  data?: BaseObj;
  /** 桶名 */
  bucketName?: string;
  /** 环境变量 */
  env?: "test" | "pre" | "dev" | "prod";
  /** 自定义上传头部参数 */
  headers?: BaseObj;
  /** 自定义上传 */
  customRequest?: ((options: any) => void) | undefined;
  /** 自定义上传开始上传回调 */
  onStart?: (file: FileListItem) => void;
  /** 自定义上传成功回调 */
  onSuccess?: (res: any, file: FileListItem) => void;
  /** 自定义上传失败回调 */
  onError?: (err: Error) => void;
  /** 自定义上传进度回调 */
  onProgress?: (data: any, file: FileListItem) => void;
  /** 使用宽高比上传，如果传入该属性，则上传的图片都是按照imageSize传入的宽高比计算的 */
  useAspectRatio?: boolean
}

// 图片大小限制、描述
export interface FileVolumeType {
  type: 'M' | 'kb';
  fileSize: number;
}

export interface Alupload {
  OSSAccessKeyId: string;
  policy: string;
  Signature: string;
}
