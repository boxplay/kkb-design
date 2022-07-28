import React, { useEffect, useState, useRef } from 'react';
import { KKBForm, KKBFORM_TYPE } from '@base/kkb-design';
const App = () => {
  const boxRef = useRef(null);
  const [boxData, setBoxData] = useState([]);
  const [type, setType] = useState('1');

  useEffect(() => {
    const initVgeForm = async () => {
      const boxDataType = [
        type === '1' && {
          type: KKBFORM_TYPE.input,
          label: '用户名',
          name: 'refDemo1_userName',
        },
        {
          type: KKBFORM_TYPE.radio,
          label: '切换组件',
          name: 'refDemo1_module',
          options: {
            size: 'middle',
            optionType: 'button',
            onChange: (value) => {
              setType(value.target.value);
            },
          },
          // 选项数据
          data: [
            { value: '1', label: '模式一' },
            { value: '2', label: '模式二' },
          ],
        },
        type === '1' && {
          type: KKBFORM_TYPE.select,
          label: '下拉菜单',
          name: 'refDemo1_select',
          data: [
            { value: '1', label: '赋值input' },
            { value: '2', label: '赋值textArea' },
          ],
          options: {
            onChange: (value) => {
              if (value === '1') {
                boxRef.current.setValue({
                  refDemo1_userName: 'hello input',
                  refDemo1_textArea: '',
                });
                return;
              }
              boxRef.current.setValue({
                refDemo1_userName: '',
                refDemo1_textArea: 'hello textArea',
              });
            },
          },
        },
        {
          type: KKBFORM_TYPE.textArea,
          label: '内容',
          name: 'refDemo1_textArea',
          options: {
            onChange: (value) => {
              boxRef.current.setValue({
                refDemo1_userName: value,
              });
            },
          },
        },
      ].filter(Boolean);
      setBoxData(boxDataType);
    };

    initVgeForm();
  }, [type]);

  // 保存按钮
  const saveBtn = (values) => {
    console.log('保存', values);
  };

  const cancelBtn = () => {
    boxRef.current.resetFields();
  };

  return (
    <KKBForm
      ref={boxRef}
      boxData={boxData}
      saveFn={saveBtn}
      cancelFn={cancelBtn}
      cancelBtnText="重置"
      defaultValue={{
        refDemo1_module: '1',
      }}
    />
  );
};
export default App;
