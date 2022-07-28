import React, { useEffect, useState } from 'react';
import { ConfigProvider } from '@base/kkb-design';
import moment from 'moment';
import zhCN from 'antd/lib/locale/zh_CN';
import { KKBSearch, SEARCH_TYPE } from '@base/kkb-design';

const Picker = () => {
  const [boxData, setBoxKeyData] = useState([]);

  const initVgeForm = async () => {
    const boxDataType = [
      {
        type: SEARCH_TYPE.datePicker,
        label: '日期',
        name: 'date',
        span: 12,
        options: {
          placeholder: '请选择日期',
          picker: 'date', // date | week | month | quarter | year
          disabledDate: (current) => {
            return current && current < moment().endOf('day');
          },
        },
      },
      {
        type: SEARCH_TYPE.empty,
        label: '',
        name: 'empty',
        span: 12,
      },
      {
        type: SEARCH_TYPE.datePicker,
        label: '时间',
        name: 'time',
        span: 12,
        options: {
          placeholder: '请选择时间',
          picker: 'date', // date | week | month | quarter | year
          showTime: true,
        },
      },
      {
        type: SEARCH_TYPE.empty,
        label: '',
        name: 'empty1',
        span: 12,
      },
      {
        type: SEARCH_TYPE.datePicker,
        label: '年份',
        name: 'year',
        span: 12,
        options: {
          placeholder: '请选择年份',
          picker: 'year', // date | week | month | quarter | year
        },
      },
      {
        type: SEARCH_TYPE.empty,
        label: '',
        name: 'empty2',
        span: 12,
      },
      {
        type: SEARCH_TYPE.datePicker,
        label: '季度',
        name: 'quarter',
        span: 12,
        options: {
          placeholder: '请选择季度',
          picker: 'quarter', // date | week | month | quarter | year
        },
      },
      {
        type: SEARCH_TYPE.empty,
        label: '',
        name: 'empty3',
        span: 12,
      },
      {
        type: SEARCH_TYPE.datePicker,
        label: '月份',
        name: 'month',
        span: 12,
        options: {
          placeholder: '请选择月份',
          picker: 'month', // date | week | month | quarter | year
        },
      },
      {
        type: SEARCH_TYPE.empty,
        label: '',
        name: 'empty4',
        span: 12,
      },
      {
        type: SEARCH_TYPE.rangePicker,
        label: '日期范围',
        name: 'rangetime',
        span: 12,
        pickerType: 'month', // date | week | month | quarter | year
        options: {
          placeholder: ['开始日期', '结束日期'],
          picker: 'date', // week month quarter year
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
              moment(moment().year(moment().year()).startOf('year').valueOf()),
              moment(moment().year(moment().year()).endOf('year').valueOf()),
            ],
            '昨天 ~ 今天': [moment().add(-1, 'days'), moment().add(0, 'days')],
            '今天 ~ 下一年今天': [
              moment().add(0, 'days'),
              moment().add(1, 'years'),
            ],
          },
        },
      },
      {
        type: SEARCH_TYPE.empty,
        label: '',
        name: 'empty5',
        span: 12,
      },
      {
        type: SEARCH_TYPE.rangePicker,
        label: '禁用日期范围',
        name: 'disabledRangetime',
        span: 12,
        pickerType: 'month', // date | week | month | quarter | year
        options: {
          placeholder: ['开始日期', '结束日期'],
          picker: 'date', // week month quarter year
          disabledDate: (current) => {
            return current && current < moment().endOf('day');
          },
        },
      },
    ];
    setBoxKeyData(boxDataType);
  };

  const handleCallback = (values) => {
    const newValue = {
      ...Object.keys(values).reduce((lastRes, item) => {
        // 过滤占位元素对应的key
        const res = lastRes;
        if (item.indexOf(SEARCH_TYPE.empty) === -1) {
          res[item] = values[item];
        }
        return res;
      }, {}),
      date: values.date?.format('YYYY-MM-DD'),
      time: values.time?.format('YYYY-MM-DD HH:mm:ss'),
      year: values.year?.format('YYYY'),
      quarter: values.quarter?.format('YYYY-Q'),
      month: values.month?.format('YYYY-MM'),
      rangetime: values.rangetime?.map((item) => item.format('YYYY-MM-DD')),
      disabledRangetime: values.disabledRangetime?.map((item) =>
        item.format('YYYY-MM-DD'),
      ),
    };
    console.log(newValue);

    // // 过滤占位元素对应的key & 日期格式化
    // const newValue = Object.keys(value).reduce((lastRes, item) => {
    //   const res = lastRes;
    //   if (item.indexOf(SEARCH_TYPE.empty) === -1) {
    //     const ret = Array.isArray(value[item])
    //       ? value[item].map((v) => moment(v).format('YYYY-MM-DD'))
    //       : moment(value[item]).format('YYYY-MM-DD');

    //     res[item] = value[item] ? ret : value[item];
    //   }
    //   return res;
    // }, {});
  };

  useEffect(() => {
    initVgeForm();
  }, []);

  return (
    <div>
      <ConfigProvider locale={zhCN}>
        <KKBSearch
          boxData={boxData} // 动态组件定义
          searchFn={handleCallback} // 保存按钮回调
          searchResetFn={handleCallback} // 重置按钮回调
          btnSpan={24}
          labelAlign="right" // 将label对齐方式改为右对齐
        />
      </ConfigProvider>
    </div>
  );
};
export default Picker;
