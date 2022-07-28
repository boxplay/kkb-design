import React, { useRef, useEffect, useState } from 'react';
import { ConfigProvider, Input } from 'antd';
import { KKBForm, KKBFORM_TYPE } from '@base/kkb-design';
import zhCN from 'antd/lib/locale/zh_CN';

/**
 * 自定义组件中，会透传vlaue和onChange二个属性，实时与form绑定
 * props.value 这是form实时返回的value值
 * props.onChange 这是form更新时触发的函数事件，传入需要更新视图表单的值
 * props.options 接收到的是boxData.options中所有参数
 * props.data 接收到的是boxData.data中所有参数
 * props.formRef 组件form的完整实例，可以设置表单、验证表单方法！同antd form
 * props.type 当前组件type名称
 * props.name 当前组件form的key值
 * props.label 当前组件左侧label名称
 */
const CustomBox = ({
  value,
  onChange,
  options,
  data,
  formRef,
  type,
  name,
  label,
}) => {
  useEffect(() => {
    // 设置其它表单内容
    formRef?.setFieldsValue({
      custom_customname: 'hello word',
    });
    return () => {};
  }, []);

  return (
    <div>
      <Input
        placeholder="请输入内容"
        value={value}
        onChange={(e) => {
          onChange?.(e.target.value);
        }}
      />
      <p style={{ color: 'red' }}>扩展任意区域</p>
    </div>
  );
};

const App = () => {
  const KKBRef = useRef(null);
  const [boxData, setBoxData] = useState([]);

  useEffect(() => {
    const initVgeForm = async () => {
      const boxDataType = [
        // 自动触发更新form表单
        {
          type: KKBFORM_TYPE.custom,
          label: '用户名',
          name: 'custom_customname',
          rules: [{ required: true, message: '参数必填' }],
          // 自定义组件
          custom: ({ options, data, formRef, type, name, label }) => {
            // 返回的组件必须是antd组件，不能有任何包裹，才能自动更新
            return <Input placeholder="请输入" />;
          },
        },
        // 手动触发更新form表单
        {
          type: KKBFORM_TYPE.custom,
          label: '自定义组件',
          name: 'custom_customBox',
          options: {
            size: 'middle',
          },
          data: [
            { value: '1', label: '男生' },
            { value: '2', label: '女生' },
          ],
          rules: [{ required: true, message: '参数必填' }],
          custom: (configData) => {
            return <CustomBox {...configData} />;
          },
        },
        {
          type: KKBFORM_TYPE.custom,
          label: '自定义组件',
          name: 'custom_customExhibition',
          custom: () => {
            return (
              <Input placeholder="请输入" defaultValue="这是无form的展示组件" />
            );
          },
          noForm: true, // 关闭form集成，纯展示组件
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

  const cancelBtn = () => {
    console.log('点击了取消按钮');
  };

  return (
    <ConfigProvider locale={zhCN}>
      <KKBForm
        ref={KKBRef}
        boxData={boxData}
        saveFn={saveBtn}
        cancelFn={cancelBtn}
      />
    </ConfigProvider>
  );
};
export default App;
