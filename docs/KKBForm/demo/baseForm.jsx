import React, { useEffect, useState } from 'react';
import { KKBForm, KKBHeader, KKBContent, KKBFORM_TYPE } from '@base/kkb-design';
import axios from 'axios';

const App = () => {
  const [boxData, setBoxData] = useState([]);

  useEffect(() => {
    const initVgeForm = async () => {
      const boxDataType = [
        {
          type: KKBFORM_TYPE.searchSelect,
          label: '下拉选择',
          name: 'baseForm_basicname1',
          option: {},
          data: [
            { label: '平台', value: 1, disabled: true },
            { label: 'KMOS', value: 2 },
          ],
        },
        {
          type: KKBFORM_TYPE.select,
          label: '带默认值',
          name: 'baseForm_basicname2',
          labelTips:['hello'],
          option: {},
          rules: [{ required: true, message: '必填' }],
          data: [
            { label: '正价课', value: 1 },
            { label: 'KMOS', value: 2 },
          ],
        },
        {
          type: KKBFORM_TYPE.input,
          label: '基本文本框',
          name: 'baseForm_basicname4',
          options: {
            shortcontrol: true,
            placeholder: '建议30字以内(用于官网小程序等）',
          },
        },
        {
          type: KKBFORM_TYPE.input,
          label: '价格类文本框',
          name: 'baseForm_basicprice1',
          rules: [{ required: true, message: '必填' }],
          options: {
            style: { width: 224 },
          },
        },
        {
          type: KKBFORM_TYPE.datePicker,
          label: '时间',
          name: 'baseForm_basicdate1',
          options: {
            format: 'YYYY-MM-DD', // 设置日期格式 默认 YYYY-MM-DD
            allowClear: true, // 是否展示清除按钮
            disabled: true,
            style: { width: 224 },
          },
        },
        {
          type: KKBFORM_TYPE.checkbox,
          label: '复选框',
          name: 'baseForm_checkbox1',
          // hasFeedback: true,
          // validateStatus: 'success',
          data: [
            { value: 'simple', label: '微信', disabled: true },
            { value: 'general', label: '支付宝', disabled: true },
            { value: 'difficult', label: 'KK币', disabled: true },
            { value: 'difficult1', label: '芝麻分期', disabled: true },
            { value: 'difficult2', label: '信用卡分期', disabled: true },
            { value: 'other2', label: '京东支付' },
          ],
          options: {
            direction: 'column', // row: 水平 column: 垂直
            allBtn: false,
          },
          bottom: (
            <span
              style={{
                display: 'inline-block',
                marginTop: '8px',
                color: 'rgba(0, 0, 0, 0.25)',
              }}
            >
              芝士分期最低支持500, 信用卡分期最低支持600
            </span>
          ),
        },
        {
          type: KKBFORM_TYPE.radio,
          label: '单选',
          name: 'baseForm_appType1',
          // 选项数据
          data: [
            { value: '1', label: 'pc端' },
            { value: '2', label: 'h5' },
            { value: '3', label: '小程序' },
          ],
        },
        {
          type: KKBFORM_TYPE.uploadImg,
          label: '上传图片',
          name: 'baseForm_imgRule1',
          options: {
            bucketName: 'kkb-cybertron-prod',
            env: 'prod',
            btnTitle: '上传icon', // 按钮文字
            accept: 'image/*', // 上传文件类型限制 image audio video
            isImageDesc: true, // 是否开启描述
            imageSize: [4000, 3500], // img 尺寸 [宽，高]
            fixedSize: true,
            imageLocationDesc: '用于官网、小程序等位置',
            // 限制图片大小，及显示描述
            imageVolume: {
              type: 'M',
              fileSize: 10,
            },
            imageType: ['jpg', 'png', 'jpeg'], // 图片格式描述
            imageSizeDesc: '最优宽高比  16：9', // 图片尺寸描述
          },
          rules: [{ required: true, message: '图片不能为空' }],
        },
        {
          type: KKBFORM_TYPE.inputNum,
          label: '有前缀的价格',
          name: 'baseForm_basicmonthMoney2',
          hasFeedback: true,
          rules: [{ required: true, message: '必填' }],
          options: {
            min: 0,
            max: 10000,
            formatter: (value) =>
              `￥ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ','),
            parser: (value) => value.replace(/￥\s?|(,*)/g, ''),
            style: {
              width: 224,
            },
          },
        },
        {
          type: KKBFORM_TYPE.uploadFile,
          label: '上传文件',
          name: 'baseForm_fileNamedragger3',
          options: {
            bucketName: 'kkb-cybertron-prod',
            env: 'prod',
            accept: 'audio/*', // 上传文件类型限制 image audio video
            btnType: 'dragger', // 拖拽按钮
            desc: '支持扩展名：.docx',
            // 自定义按钮区域，注释内容
            // btnTitle: <span style={{ color: 'red' }}>内容</span>,
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
  const breadcrumbList = [
    {
      label: '表单',
      // path: '/group',
    },
    {
      label: '基础表单',
      path: '/baseForm',
    },
  ];
  return (
    <>
      <KKBHeader
        title="复杂表单"
        description="页面内容简介，用来解释当前页面的内容（可无）"
        breadcrumbList={breadcrumbList}
      />
      <KKBContent>
        <KKBForm
          boxData={boxData}
          saveFn={saveBtn}
          cancelFn={cancelBtn}
          defaultValue={{
            baseForm_basicname2: '正价课',
          }}
          onValuesChange={(v) => {}}
        />
      </KKBContent>
    </>
  );
};
export default App;
