import React, { useCallback, useRef, useState, useEffect } from 'react';
import { Modal, InputNumber } from 'antd';
import { debounce } from 'lodash';
import { getPrefixCls } from '../../../utils';
import KKBImgCrop from '../../KKBImgCrop';
import './index.less';

interface CropProps {
  unit?: 'px' | '%';
  width?: number;
  height?: number;
  aspect?: number;
  x?: number;
  y?: number;
}

export interface CropViewProps {
  visible: boolean;
  onSuccess: (file: File) => void;
  onCancel: () => void;
  file: File;
  crop?: CropProps;
  maxHeight?: number;
  minHeight?: number;
  maxWidth?: number;
  minWidth?: number;
  locked?: boolean;
  disabled?: boolean;
  /** 保持选择，true点击选中区域外不会取消选中剪裁框 */
  keepSelection?: boolean;
  /** 是否显示剪裁信息，以及信息想显示哪些内容 */
  cropInfo?: boolean | CropInfo;
  /** 旋转角度 -180到180 */
  rotate?: number;
  /** 缩放 */
  scale?: number;
  /** 是否圆形剪裁 */
  circularCrop?: boolean;
  /** 是否开启缩放图片 */
  scaleFlag?: boolean;
}

export interface CropInfo {}

export interface CropFileInfo {
  rotate?: number;
  width?: number;
  height?: number;
  scale?: number;
}

// 更新图片文件信息
export const UPINFO_KEYS = {
  /** 剪裁宽度 */
  width: 'width',
  /** 剪裁高度 */
  height: 'height',
  /** 旋转角度 */
  rotate: 'rotate',
  /** 缩放 */
  scale: 'scale',
};

const CropView = (props: CropViewProps) => {
  const {
    visible,
    onSuccess,
    onCancel,
    file,
    crop = {
      unit: 'px',
      width: 100,
      height: 100,
    },
    cropInfo,
    scaleFlag,
    rotate = 0,
    scale = 1,
    ...allProps
  } = props;
  const imgRef = useRef(null);
  const preImgRef = useRef<any>(null);
  const [newCrop, setCrop] = useState(crop);
  const [completedCrop, setCompletedCrop] = useState<any>();
  // 文件信息
  const [fileInfo, setFileInfo] = useState<CropFileInfo>({
    rotate: rotate || 0,
    width: 0,
    height: 0,
    scale: scale || 0,
  });

  const onLoad = useCallback((img) => {
    imgRef.current = img;
    return false; // Return false if you set crop state in here.
  }, []);

  const dataURLtoFile = (dataurl: string, filename: string) => {
    const arr = dataurl.split(',');
    const mime = arr[0]?.match(/:(.*?);/)?.[1];
    const bstr = atob(arr[1]);
    let n = bstr.length;
    const u8arr = new Uint8Array(n);
    while (n) {
      n -= 1;
      u8arr[n] = bstr.charCodeAt(n);
    }
    return new File([u8arr], filename, { type: mime });
  };

  const getPicFile = (canvas: any, filename: string) => {
    const suffix = filename.split('.').pop();
    let mimeType = 'image/png';
    if (suffix === 'gif') {
      mimeType = 'image/gif';
    }
    const imgBase64 = canvas.toDataURL(mimeType);
    return dataURLtoFile(imgBase64, filename);
  };

  // 确认剪裁
  const submit = () => {
    const f = getPicFile(preImgRef.current, file?.name || '');
    onSuccess?.(f);
  };

  const upFileInfo = debounce((f: any) => {
    if (!f) return;
    const image = imgRef.current as any;
    const scaleX = image.naturalWidth / image.width;
    const scaleY = image.naturalHeight / image.height;
    const pixelRatio = window.devicePixelRatio;
    const width = f.width * scaleX * pixelRatio;
    const height = f.height * scaleY * pixelRatio;

    setFileInfo({
      ...fileInfo,
      width: +width.toFixed(2),
      height: +height.toFixed(2),
    });
  }, 30);

  useEffect(() => {
    if (!completedCrop || !preImgRef.current || !imgRef.current) {
      return;
    }

    const image = imgRef.current as any;
    image.setAttribute('crossOrigin', 'Anonymous');
    const canvas = preImgRef.current as any;
    const scaleX = image.naturalWidth / image.width;
    const scaleY = image.naturalHeight / image.height;
    const ctx = canvas.getContext('2d');
    // const pixelRatio = window.devicePixelRatio;
    canvas.width = completedCrop.width * scaleX;
    canvas.height = completedCrop.height * scaleY;
    ctx.setTransform(scaleX, 0, 0, scaleY, 0, 0);
    ctx.imageSmoothingQuality = 'high';

    ctx.drawImage(
      image,
      completedCrop.x * scaleX,
      completedCrop.y * scaleY,
      completedCrop.width * scaleX,
      completedCrop.height * scaleY,
      0,
      0,
      completedCrop.width,
      completedCrop.height,
    );
    upFileInfo(completedCrop);
  }, [completedCrop]);

  // 更新指定文件内容
  const setFileInfoKey = (key: string, value: any) => {
    setFileInfo({
      ...fileInfo,
      [key]: value,
    });

    // 更新剪裁选中框 位置及大小
    if (key in newCrop) {
      setCrop({
        ...newCrop,
        [key]: value,
      });
    }
    if (key === UPINFO_KEYS.scale) {
      // upScalData(value);
    }
  };

  return (
    <Modal
      visible={visible}
      onOk={submit}
      onCancel={onCancel}
      cancelText="取消"
      okText="确认"
      width={800}
    >
      <div className={getPrefixCls('crop-modal')}>
        <KKBImgCrop
          scaleFlag={scaleFlag}
          crop={crop}
          {...allProps}
          src={file}
          onImageLoaded={onLoad}
          onComplete={(c) => setCompletedCrop(c)}
          onChange={(c) => {
            setCrop(c);
            upFileInfo(c);
          }}
          transformOpts={{
            initialScale: fileInfo.scale,
            initialPositionX: newCrop.x,
            initialPositionY: newCrop.y,
            minScale: 0.5,
            maxScale: 8,
            onZoomStop: (ref) => {
              setFileInfo({
                ...fileInfo,
                scale: ref.state.scale,
              });
            },
          }}
        />
        <div
          style={{
            display: 'none',
          }}
        >
          <canvas
            ref={preImgRef}
            style={{
              width: Math.round(completedCrop?.width ?? 0),
              height: Math.round(completedCrop?.height ?? 0),
            }}
          />
        </div>
        {cropInfo && (
          <div className={getPrefixCls('crop-info')}>
            <div className={getPrefixCls('info-item')}>
              <span className={getPrefixCls('info-label')}>宽度</span>
              <InputNumber
                className={getPrefixCls('info-usein')}
                value={fileInfo?.width}
                onChange={(v) => {
                  setFileInfoKey(UPINFO_KEYS.width, v);
                }}
              />
              <span className={getPrefixCls('info-suffix')}>
                {newCrop.unit}
              </span>
            </div>

            <div className={getPrefixCls('info-item')}>
              <span className={getPrefixCls('info-label')}>高度</span>
              <InputNumber
                className={getPrefixCls('info-usein')}
                value={fileInfo?.height}
                onChange={(v) => {
                  setFileInfoKey(UPINFO_KEYS.height, v);
                }}
              />
              <span className={getPrefixCls('info-suffix')}>
                {newCrop.unit}
              </span>
            </div>

            <div className={getPrefixCls('info-item')}>
              <span className={getPrefixCls('info-label')}>旋转</span>
              <InputNumber
                className={getPrefixCls('info-usein')}
                value={fileInfo?.rotate}
                max={180}
                min={-180}
                onChange={(v) => {
                  setFileInfoKey(UPINFO_KEYS.rotate, v);
                }}
              />
              <span className={getPrefixCls('info-suffix')}>度</span>
            </div>

            <div className={getPrefixCls('info-item')}>
              <span className={getPrefixCls('info-label')}>缩放</span>
              {fileInfo?.scale?.toFixed(2)}
              {/* <InputNumber
                className={getPrefixCls('info-usein')}
                value={fileInfo?.scale}
                min={1}
                max={8}
                step={0.5}
                onChange={(v) => {
                  setFileInfoKey(UPINFO_KEYS.scale, v);
                }}
              /> */}
              <span className={getPrefixCls('info-suffix')}> </span>
            </div>
          </div>
        )}
      </div>
    </Modal>
  );
};

export default CropView;
