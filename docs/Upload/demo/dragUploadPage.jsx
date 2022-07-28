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
          page
          bucketName='kkb-file-web'
          env='prod'
          multiple
          value={mulValue}
          btnType='dragger'
          // desc='选择或拖拽文件上传',
          accept='.xls,.xlsx,.doc,.docx'
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
