import React, { useEffect, useState, useRef } from 'react';
import { Modal, Button } from 'antd';
import { KKBForm, KKBFORM_TYPE } from '@base/kkb-design';
import axios from 'axios';

const App = () => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [boxData, setBoxData] = useState([]);
  const KKBFormRef = useRef(null);

  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleOk = async () => {
    const formValues = await KKBFormRef.current.validateFields();
    // 验证表单未通过
    if (formValues.errorFields?.length > 0) {
      return;
    }
    setIsModalVisible(false);
    console.log('表单内容>>>>', formValues);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  useEffect(() => {
    const initVgeForm = async () => {

      const boxDataType = [
        {
          type: KKBFORM_TYPE.select,
          label: '下拉选择',
          name: 'basicModal_name1',
          option: {},
          data: [
            { label: '平台', value: 1 },
            { label: 'KMOS', value: 2 },
          ],
        },
        {
          type: KKBFORM_TYPE.searchSelect,
          label: '带默认值',
          name: 'basicModal_name2',
          option: {},
          rules: [{ required: true, message: '必填' }],
          data: [
            { label: '正价课', value: 1 },
            { label: 'KMOS', value: 2 },
            { label: '废弃', value: 3, disabled: true },
          ],
        },
        {
          type: KKBFORM_TYPE.input,
          label: '基本文本框',
          name: 'basicModal_name4',
          options: {
            placeholder: '建议30字以内(用于官网小程序等）',
          },
        },
        {
          type: KKBFORM_TYPE.input,
          label: '价格类文本框',
          name: 'basicModal_price1',
          rules: [{ required: true, message: '必填' }],
          options: {
            shortcontrol: true,
            // style: { width: 200 },
          },
        },
        {
          type: KKBFORM_TYPE.datePicker,
          label: '时间',
          name: 'basicModal_date1',
          options: {
            format: 'YYYY-MM-DD', // 设置日期格式 默认 YYYY-MM-DD
            allowClear: true, // 是否展示清除按钮
            // disabled: true,
          },
        },
        {
          type: KKBFORM_TYPE.checkbox,
          label: '复选框',
          name: 'basicModal_checkbox1',
          // hasFeedback: true,
          // validateStatus: 'success',
          data: [
            { value: 'simple', label: '微信' },
            { value: 'general', label: '支付宝' },
            { value: 'difficult', label: 'KK币' },
          ],
          options: {
            direction: 'column', // row: 水平 column: 垂直
            allBtn: false,
          },
        },
        {
          type: KKBFORM_TYPE.radio,
          label: '单选',
          name: 'basicModal_appType1',
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
          name: 'basicModal_imgRule1',
          options: {
            bucketName: 'kkb-cybertron-prod',
            env: 'prod',
            btnTitle: '上传icon', // 按钮文字
            accept: 'image/*', // 上传文件类型限制 image audio video
            isImageDesc: true, // 是否开启描述
            imageSize: [4000, 3500], // img 尺寸 [宽，高]
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
          name: 'basicModal_monthMoney2',
          hasFeedback: true,
          rules: [{ required: true, message: '必填' }],
          options: {
            shortcontrol: true,
            min: 0,
            max: 10000,
            formatter: (value) =>
              `￥ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ','),
            parser: (value) => value.replace(/￥\s?|(,*)/g, ''),
            // style: {
            //   width: 200,
            // },
          },
        },
      ];
      setBoxData(boxDataType);
    };
    initVgeForm();
  }, []);

  return (
    <div>
      <Button type="primary" onClick={showModal}>
        打开弹窗
      </Button>
      <Modal
        title="弹框表单"
        width={510}
        visible={isModalVisible}
        onOk={handleOk}
        onCancel={handleCancel}
        cancelText="取消"
        destroyOnClose
      >
        <KKBForm
          ref={KKBFormRef}
          boxData={boxData}
          pageType="form"
          saveBtnText={null}
          cancelBtnText={null}
        />
      </Modal>
    </div>
  );
};
export default App;
