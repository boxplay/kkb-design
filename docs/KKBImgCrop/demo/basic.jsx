import React, { useEffect, useState, useCallback, useRef } from 'react';
import { KKBImgCrop, Button } from '@base/kkb-design';

const imgSrc =
  'https://img.kaikeba.com/vgeformDemo/2022_02_08_4704_cjqgiuzpneli.jpg';

const App = () => {
  const imgRef = useRef(null);
  const preImgRef = useRef(null);
  const [completedCrop, setCompletedCrop] = useState();

  const onLoad = useCallback((img) => {
    imgRef.current = img;
    return false; // Return false if you set crop state in here.
  }, []);

  useEffect(() => {
    if (!completedCrop || !preImgRef.current || !imgRef.current) {
      return;
    }

    const image = imgRef.current;
    image.setAttribute('crossOrigin', 'Anonymous');
    const canvas = preImgRef.current;
    const scaleX = image.naturalWidth / image.width;
    const scaleY = image.naturalHeight / image.height;
    const ctx = canvas.getContext('2d');
    const pixelRatio = window.devicePixelRatio;
    canvas.width = completedCrop.width * scaleX * pixelRatio;
    canvas.height = completedCrop.height * scaleY * pixelRatio;
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

  const dataURLtoFile = (dataurl, filename) => {
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

  const getPicFile = (canvas, filename) => {
    const suffix = filename.split('.').pop();
    let mimeType = 'image/png';
    if (suffix === 'gif') {
      mimeType = 'image/gif';
    }
    const imgBase64 = canvas.toDataURL(mimeType);
    return dataURLtoFile(imgBase64, filename);
  };

  // 获取剪裁图片
  const submit = () => {
    const f = getPicFile(preImgRef.current, 'filename');
    console.log(f);
  };

  return (
    <div>
      <div style={{width: 800}}>
      <KKBImgCrop
        src={imgSrc}
        onImageLoaded={onLoad}
        onComplete={(c) => setCompletedCrop(c)}
      />
      </div>
      <Button onClick={submit}>获取剪裁file</Button>

      <div style={{display: 'none'}}>
        <canvas ref={preImgRef} />
      </div>
    </div>
  );
};

export default App;
