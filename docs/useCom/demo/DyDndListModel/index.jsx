import React, { useEffect, useState, useRef } from 'react';
import {
  KKBConfig,
  KKBForm,
  KKBFORM_TYPE,
  UseDyDndListModel,
} from '@base/kkb-design';

const useMyCustomName = 'dyDndListModel';

KKBConfig({
  // KKBForm热插拨配置
  KKBFormUse: [
    {
      type: useMyCustomName, // 声明自定义组件type名称
      component: UseDyDndListModel, // 传入自定义组件
    },
  ],
});

const App = () => {
  const gmRef = useRef(null);
  const [boxData, setBoxData] = useState([]);
  const dyDndDefault = [
    {
      myName: '自定义标题',
      color: 'red',
    },
    {
      myName: '标题哇',
      color: 'yellow',
    },
  ];

  useEffect(() => {
    const initVgeForm = async () => {
      const boxDataType = [
        {
          type: useMyCustomName, // 使用自定义key名
          label: '动态列表1',
          name: 'dyDnd1', // form key
          options: {
            // 嵌套组件定义参数同KKBForm.boxdata
            formlist: [
              {
                name: 'myName',
                type: KKBFORM_TYPE.input,
                label: '组件1',
              },
              {
                name: 'age',
                type: KKBFORM_TYPE.inputNum,
                label: '组件2',
              },
            ],
          },
        },
        {
          type: useMyCustomName,
          label: '动态列表2',
          name: 'dyDnd2',
          options: {
            formlist: [
              {
                name: 'age',
                type: KKBFORM_TYPE.input,
                label: '组件1',
              },
              {
                type: KKBFORM_TYPE.datePicker,
                label: '出生年月日',
                name: 'mydate',
                options: {
                  format: 'YYYY-MM-DD', // 设置日期格式 默认 YYYY-MM-DD
                  allowClear: true, // 是否展示清除按钮
                },
              },
            ],
            customTitle: (text, i) => `标题 ${i}`,
            customDesc: (text, i) => '内容',
            minNum: 1, // 最少1个
            maxNum: 3, // 最多3个
            hiddenAdd: true, // 超出隐藏隐藏添加按钮
            modalTitle: '自定义标题',
          },
        },
        {
          type: useMyCustomName,
          label: '动态列表3',
          name: 'dyDnd3',
          options: {
            formlist: [
              {
                name: 'myName',
                type: KKBFORM_TYPE.input,
                label: '组件1',
              },
              {
                name: 'color',
                type: KKBFORM_TYPE.textArea,
                label: '组件2',
              },
            ],
            // 添加组件时，默认参数
            addValue: {
              myName: '哈哈', // key需要和formlist中name绑定，value为值
              color: 'black',
            },
            // 映射formlist中的name关键字
            mapping: {
              title: 'myName', // 标题，根据form表单值显示内容
              desc: 'color', // 描述
            },
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

  return (
    <KKBForm
      ref={gmRef}
      boxData={boxData}
      saveFn={saveBtn}
      cancelBtnText={null}
      defaultValue={{ dyDnd3: dyDndDefault }}
    />
  );
};
export default App;
