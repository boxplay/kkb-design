import React, { useEffect, useState } from 'react';
import { Radio } from 'antd';
import { KKBForm, KKBFORM_TYPE } from '@base/kkb-design';

const App = () => {
  const [boxData, setBoxData] = useState([]);
  const [formLayout, setFormLayout] = useState('horizontal');
  const [wrapperCol, setWrapperCol] = useState({ span: 24 });
  const [labelCol, setLabelCol] = useState({ span: 4 });

  useEffect(() => {
    const initVgeForm = async () => {
      const boxDataType = [
        {
          type: KKBFORM_TYPE.input,
          label: 'Field A',
          name: 'basicLayout_nameLayout',
        },
        {
          type: KKBFORM_TYPE.input,
          label: 'Field B',
          name: 'basicLayout_nameBLayout',
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

  const onChangeLayout = (e) => {
    const valueData = e.target.value;
    setFormLayout(valueData);
    switch (valueData) {
      case 'horizontal':
        setWrapperCol({ span: 24 });
        setLabelCol({ span: 4 });
        break;
      case 'vertical':
        setWrapperCol(null);
        setLabelCol(null);
        break;
      default:
        break;
    }
  };

  return (
    <>
      <Radio.Group onChange={onChangeLayout} defaultValue={formLayout}>
        <Radio.Button value="horizontal">Horizontal</Radio.Button>
        <Radio.Button value="vertical">Vertical</Radio.Button>
      </Radio.Group>

      <KKBForm
        boxData={boxData}
        saveFn={saveBtn}
        cancelFn={cancelBtn}
        wrapperCol={wrapperCol}
        labelCol={labelCol}
        layout={formLayout}
      />
    </>
  );
};
export default App;
