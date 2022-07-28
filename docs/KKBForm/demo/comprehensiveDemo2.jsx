import React, { useEffect, useState } from 'react';
import { KKBForm, KKBFORM_TYPE } from '@base/kkb-design';

const App = () => {
  const [boxData, setBoxData] = useState([]);

  useEffect(() => {
    const initVgeForm = async () => {
      const boxDataType = [
        {
          type: KKBFORM_TYPE.dyOperateItem,
          name: 'comprehensiveDemo2_dyOperateItem',
          options: {
            addText: '添加课程',
            formlist: [
              {
                name: 'comprehensiveDemo2_dyadd1',
                label: '绑定课程',
                type: KKBFORM_TYPE.input,
                rules: [{ required: true }],
              },
              {
                name: 'comprehensiveDemo2_dyadd2',
                type: KKBFORM_TYPE.input,
                rules: [{ required: true, message: '第二个参数必填' }],
              },
            ],
            maxNum: 3, // 最多添加上限3个
            minNum: 1,
            hiddenAdd: true, // 超出上限隐藏按钮
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
    <KKBForm
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
  );
};
export default App;
