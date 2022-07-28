import { ReactCropProps } from 'react-image-crop';
import { ReactZoomPanPinchProps } from 'react-zoom-pan-pinch';

export interface ImgCropProps extends Omit<ReactCropProps, 'src'> {
  src: string | File;
  transformOpts: Omit<ReactZoomPanPinchProps, 'ref'>;
  /** 文件信息 */
  fileInfo?: CropFileInfo;
  /** 是否开启缩放 */
  scaleFlag?: boolean;
}

export interface CropFileInfo {
  rotate?: number;
  width?: number;
  height?: number;
  scale?: number;
}

export interface KKBImgCropRef {
  /** 获取剪裁后图片ref对象 */
  getReviewImg: () => any;
}
