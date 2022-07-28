import React, { useEffect, useState } from 'react';
import { KKBForm, KKBFORM_TYPE } from '@base/kkb-design';
import axios from 'axios';

const App = () => {
  const [boxData, setBoxData] = useState([]);

  useEffect(() => {
    const initVgeForm = async () => {

      const boxDataType = [
        {
          type: KKBFORM_TYPE.dyAddComList,
          label: '动态组件1',
          name: 'dyAddComList_dyAddComList1',
          options: {
            formlist: [
              {
                name: 'dyAddComList_dyadd1', // 当前子组件Key
                type: KKBFORM_TYPE.switch, // 组件类型
              },
              {
                name: 'dyadd2',
                type: KKBFORM_TYPE.textArea,
                rules: [{ required: true, message: '内容不能为空' }],
              },
              {
                name: 'dyadd3',
                type: KKBFORM_TYPE.uploadImKKBultiple,
                options: {
                  multiple: false,
                  totalNum: 1,
                  limitShowBtn: false,
                  bucketName: 'kkb-cybertron-prod',
                  env: 'prod',
                },
              },
            ],
            style: {
              marginLeft: '0',
            },
          },
        },
        {
          type: KKBFORM_TYPE.dyAddComList,
          label: '动态组件2',
          name: 'dyAddComList_dyAddComList2',
          options: {
            title: '标题',
            style: {
              marginLeft: '0',
            },
            formlist: [
              {
                name: 'dyadd1', // 当前子组件Key
                type: KKBFORM_TYPE.input, // 组件类型
                label: 'item名',
              },
              {
                type: KKBFORM_TYPE.radio,
                name: 'dyadd2',
                options: {
                  size: 'middle',
                },
                data: [
                  { value: '1', label: '男生' },
                  { value: '2', label: '女生' },
                ],
                rules: [{ required: true, message: '性别不能为空' }],
              },
            ],
            // 追加默认参数
            addValue: {
              dyadd1: 'hello',
              dyadd2: '1',
            },
          },
        },
        {
          type: KKBFORM_TYPE.dyAddComList,
          label: '动态组件3',
          name: 'dyAddComList_dyAddComList3',
          options: {
            style: {
              marginLeft: '0',
            },
            formlist: [
              {
                name: 'dyAddComList_dyadd1',
                type: KKBFORM_TYPE.inputNum,
              },
              {
                name: 'dyAddComList_dyadd2',
                type: KKBFORM_TYPE.textArea,
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

  // 保存按钮
  const saveBtn = (values) => {
    console.log('保存', values);
  };

  return <KKBForm boxData={boxData} saveFn={saveBtn} cancelBtnText={null} />;
};
export default App;
