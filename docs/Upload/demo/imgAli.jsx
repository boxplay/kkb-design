import React, { useEffect, useState } from 'react';
import { KKBUploadImg, KKBConfig } from '@base/kkb-design';

const Index = () => {
  const [value, setVlaue] = useState();
  const [mulValue, setMulValue] = useState();

  return (
    <div >
      <div style={{
        display: 'flex',
        margin: '50px',
        alignItems: 'center'
      }}>
        {/*<span style={{marginRight: 10}}>单图上传:</span>*/}
        <KKBUploadImg
          bucketName='kkb-file-web'
          env='prod'
          totalNum={1}
          showUploadList={false}
          value={value}
          onChange={file => {
            setVlaue(file);
          }}
          singlePreview
        />
      </div>
      <div style={{
        display: 'flex',
        margin: '50px',
        alignItems: 'center'
      }}>
      </div>
    </div>
  );
};

export default Index;
