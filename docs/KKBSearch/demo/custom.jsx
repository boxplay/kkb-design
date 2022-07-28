import React, { useRef, useEffect, useState } from 'react';
import { Input, Radio } from '@base/kkb-design';
import { KKBSearch, SEARCH_TYPE } from '@base/kkb-design';

const Custom = () => {
  const boxRef = useRef(null); // 暴露方法底部介绍
  const [boxData, setBoxKeyData] = useState([]);
  const [city, setCity] = useState('beijing');

  const initVgeForm = async () => {
    const boxDataType = [
      {
        type: SEARCH_TYPE.custom,
        label: '自定义输入框',
        name: 'custom',
        data: [],
        span: 16,
        custom: ({ options, data, formRef, type, name, label }) => {
          return (
            <>
              <Input
                placeholder="请输入"
                onChange={(e) => {
                  boxRef?.current?.setValue({
                    custom: e.target.value,
                  });
                }}
              />
              <p style={{ color: 'red' }}>提示信息</p>
            </>
          );
        },
        noForm: true,
      },
      {
        type: SEARCH_TYPE.custom,
        label: '自定义下拉框',
        name: 'custom2',
        data: [],
        span: 16,
        custom: (configData) => {
          console.log('configData', configData);
          return (
            <>
              <Radio.Group
                defaultValue="beijing"
                buttonStyle="solid"
                onChange={(e) => setCity(e.target.value)}
              >
                <Radio.Button value="hangzhou">杭州</Radio.Button>
                <Radio.Button value="shanghai">上海</Radio.Button>
                <Radio.Button value="beijing">北京</Radio.Button>
                <Radio.Button value="chengdu">成都</Radio.Button>
              </Radio.Group>
            </>
          );
        },
        noForm: true,
      },
    ];
    setBoxKeyData(boxDataType);
  };

  useEffect(() => {
    initVgeForm();
  }, []);

  useEffect(() => {
    boxRef?.current?.setValue({
      custom2: city,
    });
  }, [city]);

  return (
    <div>
      <KKBSearch
        ref={boxRef} // 暴露内部组件方法，有formRef对象
        boxData={boxData} // 动态组件定义
        searchFn={(values) => console.log(values)} // 保存按钮回调
        searchResetFn={(values) => console.log(values)} // 重置按钮回调
      />
    </div>
  );
};
export default Custom;
