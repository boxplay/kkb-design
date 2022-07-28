import React, {
  useCallback,
  useRef,
  useState,
  useEffect,
  forwardRef,
  useImperativeHandle,
} from 'react';
import ReactCrop, { Crop } from 'react-image-crop';
import {
  TransformWrapper,
  TransformComponent,
  ReactZoomPanPinchRef,
} from 'react-zoom-pan-pinch';
import { getPrefixCls } from '../../utils';
import 'react-image-crop/dist/ReactCrop.css';
import './index.less';
import { KKBImgCropRef, ImgCropProps, CropFileInfo } from './index.d';

/**
 * 图片剪裁组件
 */
const KKBImgCrop = forwardRef<KKBImgCropRef, ImgCropProps>((props, ref) => {
  const {
    src,
    crop = {
      unit: 'px',
      width: 100,
      height: 100,
    },
    maxHeight,
    minHeight,
    maxWidth,
    minWidth,
    locked,
    disabled,
    rotate = 0,
    scale,
    circularCrop,
    transformOpts,
    fileInfo: propsFileInfo,
    scaleFlag,
    ...allProps
  } = props;
  const zoomRef = useRef<ReactZoomPanPinchRef>(null);
  const imgRef = useRef(null);
  const preImgRef = useRef<any>(null);
  const [newCrop, setCrop] = useState(crop);
  const [imgSrc, setImgSrc] = useState('');
  const [completedCrop, setCompletedCrop] = useState<Crop>();
  // 文件信息
  const fileInfo: CropFileInfo = {
    rotate: rotate || 0,
    width: 0,
    height: 0,
    scale,
    ...propsFileInfo,
  };

  useImperativeHandle(ref, () => ({
    getReviewImg: () => {
      return preImgRef.current;
    },
  }));

  // file转换src
  const readerFile = (f: File) => {
    const reader = new FileReader();
    reader.addEventListener('load', () => {
      setImgSrc(reader.result as string);
    });
    reader.readAsDataURL(f);
  };

  useEffect(() => {
    if (typeof src !== 'string') {
      readerFile(src);
    } else {
      setImgSrc(src);
    }
  }, [src]);

  const onLoad = useCallback((img: any) => {
    imgRef.current = img;
    allProps.onImageLoaded?.(img);
  }, []);

  useEffect(() => {
    if (!completedCrop || !preImgRef.current || !imgRef.current) {
      return;
    }

    const image = imgRef.current as any;
    const canvas = preImgRef.current as any;
    const scaleX = image.naturalWidth / image.width;
    const scaleY = image.naturalHeight / image.height;
    const ctx = canvas.getContext('2d');
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
  }, [completedCrop]);

  // 剪裁组件
  const reactCropCom = () => {
    return (
      <ReactCrop
        className={getPrefixCls('crop-imgWrap')}
        src={imgSrc}
        crop={newCrop}
        minWidth={minWidth}
        minHeight={minHeight}
        maxWidth={maxWidth}
        maxHeight={maxHeight}
        locked={locked}
        disabled={disabled}
        circularCrop={circularCrop}
        rotate={fileInfo.rotate}
        // keepSelection
        {...allProps}
        onImageLoaded={onLoad}
        onComplete={(c, percentageCrop) => {
          setCompletedCrop(c);
          allProps.onComplete?.(c, percentageCrop);
        }}
        onChange={(c, percentageCrop) => {
          setCrop(c);
          allProps.onChange?.(c, percentageCrop);
        }}
      />
    );
  };

  return (
    <div className={getPrefixCls('crop-modal')}>
      {scaleFlag ? (
        <TransformWrapper
          initialScale={fileInfo.scale}
          initialPositionX={newCrop.x}
          initialPositionY={newCrop.y}
          minScale={0.5}
          maxScale={8}
          {...transformOpts}
          ref={zoomRef}
          onZoomStop={(zRef, e) => {
            transformOpts?.onZoomStop?.(zRef, e);
          }}
        >
          <TransformComponent>{reactCropCom()}</TransformComponent>
        </TransformWrapper>
      ) : (
        reactCropCom()
      )}

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
    </div>
  );
});

export default KKBImgCrop;
