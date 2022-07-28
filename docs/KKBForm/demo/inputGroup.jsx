import React, { useEffect, useState } from 'react';
import { ConfigProvider } from 'antd';
import { KKBForm, KKBFORM_TYPE } from '@base/kkb-design';
import zhCN from 'antd/lib/locale/zh_CN';

const App = () => {
  const [boxData, setBoxData] = useState([]);

  useEffect(() => {
    const initVgeForm = async () => {
      const boxDataType = [
        {
          type: KKBFORM_TYPE.inputGroup,
          label: '邀请文案',
          name: 'inputGroup_composition1',
          options: {
            // compact: true,
            formlist: [
              {
                type: KKBFORM_TYPE.custom,
                label: '自定义组件',
                name: 'complexForm_customBox1',
                options: {
                  size: 'middle',
                  style: {
                    width: '82px',
                  },
                },
                data: [
                  { value: '1', label: '男生' },
                  { value: '2', label: '女生' },
                ],
                custom: (configData) => {
                  return (
                    <span
                      style={{
                        width: '82px',
                        height: '32px',
                        lineHeight: '32px',
                        textAlign: 'center',
                        display: 'inline-block',
                        border: '1px solid rgba(0, 0, 0, 0.15)',
                        borderRight: '0',
                      }}
                    >
                      微信昵称
                    </span>
                  );
                },
              },
              {
                type: KKBFORM_TYPE.input,
                label: '内价格',
                name: 'complexForm_com2',
                options: {
                  placeholder: '建议10字以内',
                  style: {
                    width: 224,
                  },
                },
              },
            ],
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
        boxData={boxData}
        saveFn={saveBtn}
        cancelFn={cancelBtn}
        pageType="page"
        onValuesChange={(v) => {}}
      />
    </ConfigProvider>
  );
};
export default App;
