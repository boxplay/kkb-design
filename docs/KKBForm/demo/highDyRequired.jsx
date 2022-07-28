import React, { useEffect, useState } from 'react';
import { KKBForm, KKBFORM_TYPE } from '@base/kkb-design';
import { Button, Divider } from 'antd';

const App = () => {
  const [boxData, setBoxData] = useState([]);
  const [allRequired, setAllRequired] = useState(false);

  useEffect(() => {
    const initVgeForm = async () => {
      const boxDataType = [
        {
          type: KKBFORM_TYPE.input,
          label: '姓名',
          name: 'highDyRequired_highNameR',
          rules: [{ required: allRequired, message: '用户名不能为空' }],
        },
        {
          type: KKBFORM_TYPE.radio,
          label: '性别',
          name: 'highDyRequired_highGender',
          options: {
            optionType: 'button',
          },
          // 选项数据
          data: [
            { value: '1', label: '男生' },
            { value: '2', label: '女生' },
          ],
          rules: [{ required: allRequired, message: '性别不能为空' }],
        },
        {
          type: KKBFORM_TYPE.select,
          label: '兴趣',
          name: 'highDyRequired_interest',
          data: [
            { value: 'sea', label: '看海' },
            { value: 'climbing', label: '爬山' },
          ],
          rules: [{ required: allRequired, message: '兴趣不能为空' }],
        },
      ];
      setBoxData(boxDataType);
    };
    initVgeForm();
  }, [allRequired]);

  const saveBtn = (values) => {
    console.log('保存', values);
  };

  return (
    <div>
      <Button onClick={() => setAllRequired(true)}>全部必填</Button>
      <Divider type="vertical" />
      <Button onClick={() => setAllRequired(false)}>全部非必填</Button>
      <KKBForm boxData={boxData} saveFn={saveBtn} cancelBtnText={null} />
    </div>
  );
};
export default App;
