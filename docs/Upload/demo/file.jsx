import React, { useState } from 'react';
import { KKBUploadFile } from '@base/kkb-design';

const Index = () => {
  const [mulValue, setMulValue] = useState();
  
  return (
    <div>
      <div style={{
        display: 'flex',
        margin: '50px',
        alignItems: 'center'
      }}>
        <KKBUploadFile
          bucketName='kkb-cybertron-prod'
          env='prod'
          value={mulValue}
          onChange={file => {
            console.log(file);
            setMulValue(file);
          }}
        />
      </div>
    </div>
  );
};

export default Index;
