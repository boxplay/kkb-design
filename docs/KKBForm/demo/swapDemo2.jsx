import React, { useEffect, useState, useRef } from 'react';
import { KKBConfig, KKBForm, KKBFORM_TYPE } from '@base/kkb-design';
import CustomInput from './CustomInput';

KKBConfig({
  // KKBForm热插拨配置
  KKBFormUse: [
    {
      type: 'userInput', // 声明自定义组件type名称
      component: CustomInput, // 传入自定义组件
    },
  ],
});

const App = () => {
  const formRef = useRef(null);
  const [boxData, setBoxData] = useState([]);

  useEffect(() => {
    const initVgeForm = async () => {
      const boxDataType = [
        {
          type: KKBFORM_TYPE.input,
          label: '普通标题',
          name: 'swapTitle',
        },
        {
          type: 'userInput', // 使用自定义key名
          label: '自定义组件',
          name: 'swapDemo2_userInput', // form key
          rules: [{ required: true, message: '不能为空' }],
        },
      ];
      setBoxData(boxDataType);
    };
    initVgeForm();
  }, []);

  // 保存按钮
  const saveBtn = (values) => {
    console.log('保存', values);
  };

  const cancelBtn = () => {
    formRef.current.resetFields();
  };

  return (
    <KKBForm
      ref={formRef}
      boxData={boxData}
      saveFn={saveBtn}
      cancelBtnText="重置"
      cancelFn={cancelBtn}
    />
  );
};
export default App;
