import React, { useEffect, useState } from 'react';
import { KKBForm, KKBFORM_TYPE } from '@base/kkb-design';

const App = () => {
  const [boxData, setBoxData] = useState([]);

  useEffect(() => {
    const initVgeForm = async () => {
      const boxDataType = [
        {
          type: KKBFORM_TYPE.dyOperateList,
          label: '',
          name: 'comprehensiveDemo1_dyOperateList',
          options: {
            desc: '最多添加3个',
            addText: '添加价格',
            formlist: [
              {
                type: KKBFORM_TYPE.input,
                name: 'comprehensiveDemo1_price1',
                label: '',
                options: {
                  addonAfter: '天',
                },
              },
              {
                type: KKBFORM_TYPE.input,
                label: '内价格',
                name: 'comprehensiveDemo1_price2',
                options: {
                  prefix: '¥',
                  suffix: 'RMB',
                  placeholder: '',
                },
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
