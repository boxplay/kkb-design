import React, { useEffect, useState } from 'react';
import { ConfigProvider } from 'antd';
import { KKBForm, KKBFORM_TYPE } from '@base/kkb-design';
import moment from 'moment';
import zhCN from 'antd/lib/locale/zh_CN';

const App = () => {
  const [boxData, setBoxData] = useState([]);

  useEffect(() => {
    const initVgeForm = async () => {
      const boxDataType = [
        {
          type: KKBFORM_TYPE.datePicker,
          label: '单日期',
          name: 'datePicker_dateOne',
        },
        {
          type: KKBFORM_TYPE.datePicker,
          label: '单日期-时分秒',
          name: 'datePicker_dateOneSeconds',
          options: {
            showTime: true,
            allowClear: true, // 是否展示清除按钮
          },
        },
        {
          type: KKBFORM_TYPE.datePicker,
          label: '单日期-禁选',
          name: 'datePicker_dateDisable',
          rules: [{ required: true, message: '不能为空' }],
          options: {
            format: 'YYYY-MM-DD',
            disabledDate(current) {
              return current && current < moment().endOf('day').add(-1, 'days');
            },
          },
        },
        {
          type: KKBFORM_TYPE.datePicker,
          label: '年',
          name: 'datePicker_datekYear',
          options: {
            format: 'YYYY',
            picker: 'year',
            allowClear: true,
          },
        },
        {
          type: KKBFORM_TYPE.datePicker,
          label: '月',
          name: 'datePicker_datekMonth',
          options: {
            format: 'YYYY-MM',
            picker: 'month',
            allowClear: true,
          },
        },
        {
          type: KKBFORM_TYPE.datePicker,
          label: '周',
          name: 'datePicker_datekWeek',
          options: {
            picker: 'week',
            allowClear: true,
          },
        },
        {
          type: KKBFORM_TYPE.rangePicker,
          label: '双日期',
          name: 'datePicker_dateDouble',
          options: {
            // 样式
            style: {
              width: '480px',
            },
          },
        },
        {
          type: KKBFORM_TYPE.rangePicker,
          label: '禁用范围日期',
          name: 'datePicker_dateDoubleDisable',
          options: {
            format: 'YYYY-MM-DD',
            disabledDate(current) {
              // 禁止选择部分日期
              return current && current < moment().endOf('day').add(-1, 'days');
            },
            allowClear: true,
          },
        },
        {
          type: KKBFORM_TYPE.rangePicker,
          label: '区间范围日期',
          name: 'datePicker_dateDoubleInterval',
          options: {
            format: 'YYYY-MM-DD',
            allowClear: true,
            ranges: {
              今天: [moment(), moment()],
              本周: [
                moment(
                  moment()
                    .week(moment().week())
                    .startOf('week')
                    .format('YYYY-MM-DD'),
                ),
                moment(
                  moment()
                    .week(moment().week())
                    .endOf('week')
                    .format('YYYY-MM-DD'),
                ),
              ],
              本月: [
                moment(moment().startOf('month').format('YYYY-MM-DD')),
                moment(moment().endOf('month').format('YYYY-MM-DD')),
              ],
              全年: [
                moment(
                  moment().year(moment().year()).startOf('year').valueOf(),
                ),
                moment(moment().year(moment().year()).endOf('year').valueOf()),
              ],
              '昨天 ~ 今天': [
                moment().add(-1, 'days'),
                moment().add(0, 'days'),
              ],
              '今天 ~ 下一年今天': [
                moment().add(0, 'days'),
                moment().add(1, 'years'),
              ],
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
