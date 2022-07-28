import React, { useEffect, useState } from 'react';
import { KKBUploadImg, KKBConfig } from '@base/kkb-design';

const Index = () => {
  const [value1, setVlaue1] = useState();
  const [value2, setVlaue2] = useState();
  const [value3, setVlaue3] = useState();


  return (
    <div>
      <div
        style={{
          display: 'flex',
          margin: '50px',
          alignItems: 'center',
        }}
      >
        <span style={{ marginRight: 10 }}>剪裁上传:</span>
        <KKBUploadImg
          bucketName='kkb-cybertron-prod'
          env='prod'
          totalNum={1}
          showUploadList={false}
          value={value1}
          onChange={(file) => {
            console.log(file);
            setVlaue1(file);
          }}
          singlePreview
          isCrop
        />
      </div>
      
      {/*<div*/}
      {/*  style={{*/}
      {/*    display: 'flex',*/}
      {/*    margin: '50px',*/}
      {/*    alignItems: 'center',*/}
      {/*  }}*/}
      {/*>*/}
      {/*  <span style={{ marginRight: 10 }}>剪裁缩放:</span>*/}
      {/*  <KKBUploadImg*/}
      {/*    bucketName='kkb-cybertron-prod'*/}
      {/*    env="test"*/}
      {/*    totalNum={1}*/}
      {/*    showUploadList={false}*/}
      {/*    value={value2}*/}
      {/*    onChange={(file) => {*/}
      {/*      console.log(file);*/}
      {/*      setVlaue2(file);*/}
      {/*    }}*/}
      {/*    singlePreview*/}
      {/*    isCrop*/}
      {/*    cropOpts={{*/}
      {/*      scaleFlag: true,*/}
      {/*      cropInfo: true,*/}
      {/*      // 初始剪裁参数*/}
      {/*      crop: {*/}
      {/*        unit: 'px',*/}
      {/*        width: 300,*/}
      {/*        height: 300,*/}
      {/*      },*/}
      {/*    }}*/}
      {/*  />*/}
      {/*</div>*/}
      
      {/*<div*/}
      {/*  style={{*/}
      {/*    display: 'flex',*/}
      {/*    margin: '50px',*/}
      {/*    alignItems: 'center',*/}
      {/*  }}*/}
      {/*>*/}
      {/*  <span style={{ marginRight: 10 }}>比例剪裁:</span>*/}
      {/*  <KKBUploadImg*/}
      {/*    bucketName='kkb-cybertron-prod'*/}
      {/*    env="test"*/}
      {/*    totalNum={1}*/}
      {/*    showUploadList={false}*/}
      {/*    value={value3}*/}
      {/*    onChange={(file) => {*/}
      {/*      console.log(file);*/}
      {/*      setVlaue3(file);*/}
      {/*    }}*/}
      {/*    singlePreview*/}
      {/*    isCrop*/}
      {/*    cropOpts={{*/}
      {/*      scaleFlag: true,*/}
      {/*      // 初始剪裁参数*/}
      {/*      crop: {*/}
      {/*        unit: 'px',*/}
      {/*        x: 0,*/}
      {/*        y: 0,*/}
      {/*        width: 300,*/}
      {/*        height: 300,*/}
      {/*        aspect: 16 / 9, // 按16:9比例剪裁*/}
      {/*      },*/}
      {/*    }}*/}
      {/*  />*/}
      {/*</div>*/}
    </div>
  );
};

export default Index;
