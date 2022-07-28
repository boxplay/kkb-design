import React, { useEffect, useState } from 'react';
import { KKBUploadImg, KKBConfig } from '@base/kkb-design';

const Index = () => {
  const [value, setVlaue] = useState();
  const [mulValue, setMulValue] = useState();
  const [action] = useState('https://upload-z1.qiniup.com/')

  return (
    <div >
      <div style={{
        display: 'flex',
        margin: '50px',
        alignItems: 'center'
      }}>
        {/*<span style={{marginRight: 10}}>单图上传:</span>*/}
        <KKBUploadImg
          bucketName='kkb-cybertron-prod'
          env='prod'
          totalNum={1}
          showUploadList={false}
          value={value}
          action={action}
          imageSize={[400, 100]}
          useAspectRatio={true}
          onChange={file => {
            setVlaue(file);
          }}
          singlePreview
        />
      </div>
    </div>
  );
};

export default Index;
