import React, { useEffect, useState } from 'react';
import { KKBSearch, SEARCH_TYPE, vgeConfig } from '@base/kkb-design';

// vgeConfig({
//   // KKBSearch 热插拨配置
//   KKBSearchUse: [
//     {
//       name: 'citycode', // 声明自定义组件type名称
//       component: Linkage, // 传入自定义组件
//     },
//   ],
// });

const HotSwap = () => {
  const [boxData, setBoxKeyData] = useState([]);

  const initVgeForm = async () => {
    const boxDataType = [
      {
        type: SEARCH_TYPE.input,
        label: '请输入邮箱',
        name: 'hotSwapEmail',
        span: 24,
        options: {
          placeholder: '请输入',
          allowClear: true,
        },
      },
      {
        type: 'citycode', // 使用自定义key名
        label: '请选择城市',
        name: 'hotSwapCitys',
        span: 24,
        options: {
          placeholder: '请输入',
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
      <KKBSearch
        boxData={boxData} // 动态组件定义
        searchFn={(values) => console.log(values)} // 保存按钮回调
        searchResetFn={(values) => console.log(values)} // 重置按钮回调
        btnSpan={24}
        btnTextAlign="center"
      />
    </div>
  );
};
export default HotSwap;
