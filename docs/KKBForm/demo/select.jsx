import React, { useEffect, useState, useRef } from 'react';
import { KKBForm, KKBFORM_TYPE } from '@base/kkb-design';

const App = () => {
  const [boxData, setBoxData] = useState([]);
  const boxRef = useRef(null);

  useEffect(() => {
    const initVgeForm = async () => {
      const boxDataType = [
        {
          type: KKBFORM_TYPE.input,
          label: '用户名',
          name: 'select_userNameSelect',
        },
        {
          type: KKBFORM_TYPE.select,
          label: '下拉组件',
          name: 'select_selectkey',
          data: [
            { value: '内容1 demo', label: '内容1' },
            { value: '内容2 demo', label: '内容2' },
          ],
          // 选择改变回调
          onChange: (value) => {
            boxRef.current.setValue({
              select_userNameSelect: value,
            });
          },
        },
        {
          type: KKBFORM_TYPE.searchSelect,
          label: '搜索组件',
          name: 'select_searchSelect',
          data: [
            { value: 'maleValue', label: 'male' },
            { value: 'femaleValue', label: 'female' },
          ],
          options: {
            // 搜索回调
            onSearch: (value) => {},
          },
        },
        {
          type: KKBFORM_TYPE.searchSelect,
          label: '搜索多选',
          name: 'select_multiple',
          data: [
            { value: '1', label: '红' },
            { value: '2', label: '黑' },
            { value: '3', label: '蓝' },
          ],
          options: {
            allowClear: true,
            mode: 'multiple',
          },
        },
        {
          type: KKBFORM_TYPE.tagsSelect,
          label: 'tag标签',
          name: 'select_tag',
          options: {
            placeholder: '每个标签输入完成后按enter键添加',
            allowClear: true,
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

  const cancelBtn = () => {
    console.log('点击了取消按钮');
  };

  return (
    <KKBForm
      ref={boxRef}
      boxData={boxData}
      saveFn={saveBtn}
      cancelFn={cancelBtn}
    />
  );
};
export default App;
