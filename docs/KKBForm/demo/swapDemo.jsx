import React, { useEffect, useState, useRef } from 'react';
import { KKBConfig, KKBForm, KKBFORM_TYPE } from '@base/kkb-design';
import CodeEdit from './CodeEdit';

KKBConfig({
  // KKBForm热插拨配置
  KKBFormUse: [
    {
      type: 'codeEdit', // 声明自定义组件type名称
      component: CodeEdit, // 传入自定义组件
    },
  ],
});

const App = () => {
  const KKBRef = useRef(null);
  const [boxData, setBoxData] = useState([]);

  useEffect(() => {
    const initVgeForm = async () => {
      const boxDataType = [
        {
          type: KKBFORM_TYPE.input,
          label: '标题',
          name: 'codeTitle',
        },
        {
          type: 'codeEdit', // 使用自定义key名
          label: '编辑器',
          name: 'codeJs', // form key
          options: {
            lan: 'javascript',
          },
          rules: [{ required: true, message: '不能为空' }], // 自定义验证规则
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
    // KKBRef.current.setValue({
    //   codeTitle: null,
    //   codeJs: null,
    // });
    KKBRef.current.resetFields();
  };

  return (
    <KKBForm
      ref={KKBRef}
      boxData={boxData}
      saveFn={saveBtn}
      cancelBtnText="重置"
      cancelFn={cancelBtn}
    />
  );
};
export default App;
