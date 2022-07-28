import React, { useEffect, useState } from 'react';
import { ConfigProvider } from 'antd';
import { KKBForm, KKBFORM_TYPE } from '@base/kkb-design';
import zhCN from 'antd/lib/locale/zh_CN';
import styles from './basicClass.less';

const App = () => {
  const [boxData, setBoxData] = useState([]);

  useEffect(() => {
    const initVgeForm = async () => {
      const boxDataType = [
        {
          type: KKBFORM_TYPE.input,
          label: '全称',
          name: 'basicClass_cname',
          className: styles.basicBoxWrap,
        },
        {
          type: KKBFORM_TYPE.textArea,
          label: '备注',
          name: 'basicClass_ctextArea',
          className: styles.basicBoxWrap,
          options: {
            tipsFormatter: (count, maxLength) => {
              return `还有${count}个字，最多${maxLength}字数`;
            },
          },
        },
        {
          type: KKBFORM_TYPE.rangePicker,
          label: '双日期',
          name: 'basicClass_dateDoubleBasic',
          className: styles.basicBoxWrap,
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
      <KKBForm boxData={boxData} saveFn={saveBtn} cancelFn={cancelBtn} />
    </ConfigProvider>
  );
};
export default App;
