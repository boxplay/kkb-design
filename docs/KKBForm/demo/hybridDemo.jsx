import React, { useEffect, useState, useRef } from 'react';
import { KKBForm, KKBFORM_TYPE } from '@base/kkb-design';
import { Button, Divider } from 'antd';

const App = () => {
  const KKBRef = useRef(null);
  const [boxData, setBoxData] = useState([]);

  useEffect(() => {
    const initVgeForm = async () => {
      const boxDataType = [
        {
          type: KKBFORM_TYPE.input,
          label: '应用名称',
          name: 'hybridDemo_appName',
        },
        {
          type: KKBFORM_TYPE.radio,
          label: '客户端类型',
          name: 'hybridDemo_appType',
          // 选项数据
          data: [
            { value: '1', label: 'pc端' },
            { value: '2', label: 'h5' },
            { value: '3', label: '小程序' },
          ],
        },
        {
          type: KKBFORM_TYPE.radio,
          label: '数据类型',
          name: 'hybridDemo_dataType',
          options: {
            optionType: 'button',
          },
          data: [
            { value: '1', label: 'dev环境' },
            { value: '2', label: 'test环境' },
            { value: '3', label: 'pre环境' },
            { value: '4', label: 'prod环境' },
          ],
        },
        {
          type: KKBFORM_TYPE.searchSelect,
          label: '体验课名称',
          name: 'hybridDemo_experienceCourse',
          data: [
            { value: '032lk9', label: '体验课直接' },
            { value: '11e3dw', label: '少时诵诗书' },
            { value: 'angel888', label: 'angel课程' },
          ],
          options: {
            // 搜索回调
            onSearch: (value) => {},
          },
        },
        {
          type: KKBFORM_TYPE.checkbox,
          label: '人数区间',
          name: 'hybridDemo_checkbox',
          data: [
            { value: 'simple', label: '0-3000' },
            { value: 'general', label: '3001-1W' },
            { value: 'difficult', label: '1W-10W' },
            { value: 'other', label: '未知', disabled: true },
          ],
          options: {
            direction: 'column', // row: 水平 column: 垂直
            allBtn: false,
          },
        },
        {
          type: KKBFORM_TYPE.checkbox,
          label: '人才类型',
          name: 'hybridDemo_rowCheckbox',
          data: [
            { value: '1d', label: '数据应用型' },
            { value: '2d', label: '产品运营型' },
            { value: '3d', label: '产品运营型' },
            { value: '4d', label: '人工智能型' },
            { value: '5d', label: '技术研发型' },
          ],
        },
        {
          type: KKBFORM_TYPE.switch,
          label: '是否启用',
          name: 'hybridDemo_enable',
          options: {
            checkedChildren: '开启', // 选中时的内容
            unCheckedChildren: '关闭', // 非选中时的内容
          },
        },
      ];
      setBoxData(boxDataType);
    };
    initVgeForm();
  }, []);

  // 保存按钮
  const saveBtn = () => {
    KKBRef.current?.validateFields().then((values) => {
      console.log('保存', values);
    });
  };

  const cancelBtn = () => {
    KKBRef.current?.resetFields();
  };

  const setCheckbox = () => {
    KKBRef.current.setValue({ hybridDemo_rowCheckbox: ['2d', '3d'] });
  };

  return (
    <KKBForm
      ref={KKBRef}
      boxData={boxData}
      defaultValue={{
        hybridDemo_appType: '1',
        hybridDemo_dataType: '2',
        hybridDemo_enable: true,
      }}
      customBottomBtn={
        <div>
          <Button onClick={saveBtn} type="primary">
            提交
          </Button>
          <Divider type="vertical" />
          <Button onClick={cancelBtn}>重置</Button>
          <Divider type="vertical" />
          <Button onClick={setCheckbox}>自定义Checkbox勾选</Button>
        </div>
      }
    />
  );
};
export default App;
