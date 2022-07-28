import React, { useEffect, useState } from 'react';
import { KKBForm, KKBFORM_TYPE } from '@base/kkb-design';

const App = () => {
  const [boxData, setBoxData] = useState([]);

  useEffect(() => {
    const initVgeForm = async () => {
      const boxDataType = [
        {
          type: KKBFORM_TYPE.dyInputs, // 动态插入框，支持二种选项
          label: '动态输入框',
          name: 'dyAddInput_dyinput',
          options: {
            inputKey: 'inputKey', // 定义input输入框key
            textAreaKey: 'textAreaKey', // 定义多行输入框key，为空不显示
          },
        },
        {
          type: KKBFORM_TYPE.dyInputs,
          label: '单个必填',
          name: 'dyAddInput_dyinput2',
          rules: [{ required: true, message: '名称不能为空' }],
          options: {
            inputKey: 'inputKey', // 定义input输入框key
            inputPlaceholder: '请输入',
            textAreaKey: 'textAreaKey', // 定义多行输入框key，为空不显示
            textAreaRules: [{ required: false }], // 多行输入框验证规则，为空者使用rules规则
            textAreaMaxLen: 130,
            textAreaPlaceholder: '请输入',
          },
        },
        {
          type: KKBFORM_TYPE.dyInputs,
          label: '添加初始值',
          name: 'dyAddInput_dyinputAdd',
          rules: [{ required: true, message: '名称不能为空' }],
          options: {
            inputKey: 'inputKey',
            inputDefalutValue: 'The head item',
            textAreaKey: 'textAreaKey',
            textAreaDefalutValue: 'textArea默认值',
          },
        },
        {
          type: KKBFORM_TYPE.dyInputs,
          label: '动态单组件',
          name: 'dyAddInput_dyinputAddOne',
          options: {
            inputKey: 'inputKeyOne',
          },
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

  return <KKBForm boxData={boxData} saveFn={saveBtn} cancelBtnText={null} />;
};
export default App;
