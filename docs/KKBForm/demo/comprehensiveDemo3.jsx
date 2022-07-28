import React, { useEffect, useState } from 'react';
import { ConfigProvider } from 'antd';
import { KKBForm, KKBFORM_TYPE } from '@base/kkb-design';
import zhCN from 'antd/lib/locale/zh_CN';
import axios from 'axios';

const App = () => {
  const [boxData, setBoxData] = useState([]);

  useEffect(() => {
    const initVgeForm = async () => {

      const boxDataType = [
        {
          type: KKBFORM_TYPE.uploadFile,
          label: '分享缩略图',
          name: 'comprehensiveDemo3_fileNamedragger',
          options: {
            bucketName: 'kkb-cybertron-prod',
            env: 'prod',
            accept: 'audio/*', // 上传文件类型限制 image audio video
            btnType: 'dragger', // 拖拽按钮
            // 自定义按钮区域，注释内容
            // btnTitle: <span style={{ color: 'red' }}>内容</span>,
          },
        },
      ];
      setBoxData(boxDataType);
    };
    initVgeForm();
  }, []);

  const saveBtn = (values) => {
    console.log('保存', values);
  };

  const cancelBtn = () => {
    console.log('点击了取消按钮');
  };

  return (
    <ConfigProvider locale={zhCN}>
      <KKBForm
        title="课程信息"
        boxData={boxData}
        saveFn={saveBtn}
        cancelFn={cancelBtn}
        pageType="page"
        defaultValue={{
          basicname2: '正价课',
          checkbox2: 'other',
        }}
        onValuesChange={(v) => {}}
      />
    </ConfigProvider>
  );
};
export default App;
