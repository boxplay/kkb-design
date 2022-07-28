import React, { useEffect, useState } from 'react';
import { ConfigProvider, TreeSelect , KKBSearch, SEARCH_TYPE } from '@base/kkb-design';
import zhCN from 'antd/lib/locale/zh_CN';


const App = () => {
  const [boxData, setBoxKeyData] = useState([]);

  const initVgeForm = async () => {
    const boxDataType = [
      {
        type: SEARCH_TYPE.input,
        label: '输入框',
        span: 8,
        name: 'basicName', // 只参数唯一值不可重复
        span: 16,
        options: {
          span: 8,
          placeholder: '请输入hhh',
          allowClear: true,
          isClearSearch : false,
        },
      },
      {
        type: SEARCH_TYPE.input,
        label: 'test',
        span: 8,
        name: 'testName', // 只参数唯一值不可重复
        span: 16,
        options: {
          span: 8,
          placeholder: '请输入',
          allowClear: true,
        },
      },
    ];
    setBoxKeyData(boxDataType);
  };

  useEffect(() => {
    initVgeForm();
  }, []);

  return (
    <div>
      <ConfigProvider locale={zhCN}>
        <KKBSearch
          boxData={boxData} // 动态组件定义
          searchFn={(values) => console.log(values)} // 保存按钮回调
          searchResetFn={(values) => console.log(values)} // 重置按钮回调
          defaultValue={{
            basicName: 'asdfghj',
          }}
          isPasteSearch={false}
        />
      </ConfigProvider>
    </div>
  );
};
export default App;
