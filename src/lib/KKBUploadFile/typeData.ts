import React from 'react';
import { ShowUploadListInterface, UploadFile, UploadListType } from 'antd/lib/upload/interface';
import { FileVolumeType } from '../KKBUploadImg/typeData';

// 单个file文件类型
export interface FileListItem extends UploadFile<any> {
  // url: string;
  // uid?: string;
  // status?: string;
  // preview?: string;
  // name?: string;
}

export interface RenderStatusNodeType {
  uploadNode: (props: any) => React.ReactNode,
  status: 'start' | 'success' | 'fail' | 'loading' | undefined
}

// files文件类型
export type UploadValueData = UploadFile<any>[];
export type BaseObj = Record<string, any>;
// 组件props参数
export interface UploadFileProps<T = any> {
  totalNum: number;
  value?: UploadValueData;
  onChange: (data: UploadValueData | undefined) => void;
  token?: string;
  /** 上传按钮图片 */
  btnTitle?: string | React.ReactNode;
  /** 上传按钮展示方式, dragger拖拽上传，button点击上传 */
  btnType?: 'dragger' | 'button';
  /** 说明文本 */
  desc?: 'string';
  /** 图片返回拼接地址 */
  imgHost?: string;
  /** 上传文件类型限制 */
  accept: string;
  /** 自定义上传地址 */
  action?: string;
  /** 是否支持多选文件 */
  multiple?: boolean;
  /** 是否禁用按钮 */
  btnDisabled?: boolean;
  /** 支持上传文件夹 */
  directory?: boolean;
  /** 限制上传数量 */
  maxCount?: number;
  /** 当超出限制上传数量时，是否替换当前文件。只有当maxCount为 1 时才生效，始终用最新上传的文件代替当前文件 */
  replaceFile?: boolean;
  /** 文件限制大小 */
  fileVolume: FileVolumeType;
  /** 移除文件时回调 */
  onRemove: (file: FileListItem) => Promise<boolean> | boolean;
  /** 点击文件链接或预览图标时的回调 */
  onPreview: (file: FileListItem) => void;
  /** 点击下载文件时的回调 */
  onDownload: (file: FileListItem) => void;
  /** 文件上传完成后的回调 */
  doneCb: (file: FileListItem[]) => void;
  /** 自定义上传参数 */
  data?: BaseObj;
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
  /** 是否隐藏删除icon按钮 */
  hideDelIcon?: boolean;
  /** 是否隐藏查看icon按钮 */
  hideViewIcon?: boolean;
  /** 自定义显示 icon */
  iconRender?:(file: UploadFile<T>, listType?: UploadListType) => React.ReactNode;
  /**
   * 是否展示文件列表, 可设为一个对象，用于单独设定 
   * showPreviewIcon,
   * showRemoveIcon,
   * showDownloadIcon, 
   * removeIcon,
   * downloadIcon
   */
  showUploadList?: boolean | ShowUploadListInterface;
  // 是否是页面级的上传
  page?: boolean;
  // react upload 状态组件
  renderStatusNode?: (props: RenderStatusNodeType) => React.ReactNode,
  disabled?: boolean,
  // 文件导入状态，拖入文件上传方式有效
  fileImportStatus: 'start' | 'success' | 'fail' | 'loading' | undefined
  /** 桶名 */
  bucketName?: string;
  /** 环境变量 */
  env?: 'dev' | 'test' | 'pre' | 'prod';
  tenantid?: string;
  appid?: string;
}
