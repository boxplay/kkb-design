import React, { useEffect, useState } from 'react';
import { ConfigProvider, Button } from 'antd';
import { KKBForm, KKBFORM_TYPE } from '@base/kkb-design';
import zhCN from 'antd/lib/locale/zh_CN';

const App = () => {
  const [boxData, setBoxData] = useState([]);

  useEffect(() => {
    const initVgeForm = async () => {
      const boxDataType = [
        {
          type: KKBFORM_TYPE.input,
          label: '底部扩展',
          labelTips: [
            '1、自定义扩展底部区域组件',
            '2、支持任意组件类型或是纯string类型',
          ],
          name: 'formExtrabottom_input',
          bottom: (
            <Button
              type="primary"
              onClick={(values) => {
                console.log('bottom', values);
              }}
            >
              自定元素
            </Button>
          ),
        },
        {
          type: KKBFORM_TYPE.textArea,
          label: '备注',
          labelTips: ['自定义提示内容'],
          name: 'formExtrabottom_ctextArea2',
          bottom: '扩展内容',
        },
        {
          type: KKBFORM_TYPE.textArea,
          label: '手机号',
          labelTips: ['自定义提示内容'],
          name: 'formExtrabottom_ctextArea3',
          rules: [{ required: true, message: '手机号不能为空' }],
          bottom: (
            <>
              <Button
                type="primary"
                style={{ marginRight: '24px' }}
                onClick={(values) => {
                  console.log('bottom', values);
                }}
              >
                过滤错号
              </Button>
              <Button
                type="primary"
                onClick={(values) => {
                  console.log('bottom', values);
                }}
              >
                过滤重号
              </Button>
              <div>
                使用回车键换行，一行视为一个号码，最多可输入5000个；共输入了
                <span
                  style={{
                    display: 'inline-block',
                    color: '#f00',
                    marginTop: 8,
                  }}
                >
                  1
                </span>
                个号码
              </div>
            </>
          ),
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
        onValuesChange={(changedValues, allValues) => {
          console.log('内容改变时触发》》》', changedValues, allValues);
        }}
      />
    </ConfigProvider>
  );
};
export default App;
