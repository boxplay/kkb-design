import React, { useEffect, useState, useRef } from 'react';
import { ConfigProvider } from 'antd';
import { KKBForm, KKBFORM_TYPE } from '@base/kkb-design';
import zhCN from 'antd/lib/locale/zh_CN';

const App = () => {
  const [boxData, setBoxData] = useState([]);
  const Formref = useRef(null)
  useEffect(() => {
    const initVgeForm = async () => {
      const boxDataType = [
        {
          type: KKBFORM_TYPE.input,
          label: '用户名',
          name: 'basic_name',
        },
        {
          type: KKBFORM_TYPE.searchSelect,
          label: '性别',
          name: 'basic_gender',
          options: {
            size: 'middle', // 大小 large | middle | small
            optionType: 'button', // 风格样式 default | button
            onChange: () => {
              Formref.current.setValue({'basic_name': ''})
            },
          },
          // 选项数据
          data: [
            { value: '1', label: '男生1' },
            { value: '2', label: '女生2' },
            { value: '3', label: '未知', disabled: true },
          ],
          rules: [{ required: true, message: '性别不能为空' }],
        },
        {
          type: KKBFORM_TYPE.switch,
          label: '成年',
          name: 'basic_age',
        },
        {
          type: KKBFORM_TYPE.datePicker,
          label: '出生年月日出生年月日出生年月日',
          name: 'basic_date',
          options: {
            format: 'YYYY-MM-DD', // 设置日期格式 默认 YYYY-MM-DD
            allowClear: true, // 是否展示清除按钮
          },
        },
        {
          type: KKBFORM_TYPE.inputNum,
          label: '月开销',
          name: 'basic_monthMoney',
          options: {
            min: 0,
            max: 10000,
            formatter: (value) =>
              `￥ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ','),
            parser: (value) => value.replace(/￥\s?|(,*)/g, ''),
          },
        },
        {
          type: KKBFORM_TYPE.textArea,
          label: '备注',
          name: 'basic_textArea',
          options: {
            height: 200,
            maxLength: 100,
            triggerType: 'onChange', // 使用onChange事件触发
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
        defaultValue={
          {
            basic_age: true
          }
        }
        ref={Formref}
        boxData={boxData}
        saveFn={saveBtn}
        cancelFn={cancelBtn}
        onValuesChange={(v) => {}}
      />
    </ConfigProvider>
  );
};
export default App;
