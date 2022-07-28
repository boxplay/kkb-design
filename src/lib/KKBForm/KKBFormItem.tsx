import React from 'react';
import {
  Select,
  FormInstance,
  Radio,
  Switch,
  InputNumber,
  DatePicker,
  Input,
} from 'antd';
import KKBUploadFile from '../KKBUploadFile';
import KKBUploadImg from '../KKBUploadImg';
import { KKBFORM_TYPE } from './boxType';
import { BoxDataItem, KKBBoxType, RadioItem } from './typeData';
import { KKBFormSwapData } from '../../consts/KKBForm.swap';
import { getPrefixCls } from '../../utils';
import { globalData } from '../../consts';
import DyInputFormList from '../../components/DyInputFormList';
import DyOperateItem from '../../components/DyOperateItem';
import DyOperateList from '../../components/DyOperateList';
import MultiCom from './components/MultiCom';
import TextArea from '../../components/TextArea';
import CheckBox from '../../components/CheckBox';
import DyAddComList from '../../components/DyAddComList';
import InputGroup from '../../components/InputGroup';
import Operate from '../../components/Operate';
import Preview from '../../components/Preview';

// 通用过滤多于options参数，谨慎操作，请查看多个组件是否会有影响
const filterDefaultValue = (options: any) => {
  const {
    defaultValue: defaultValueScope,
    defaultChecked,
    shortcontrol,
    ...newOpts
  } = options || {};

  return newOpts;
};

/**
 * 动态生成gmFormItem组件
 * @boxType 声明组件类型及配置
 * @formRef form相关方法ref对象
 * @data 透传数据或方法等参数
 */
export const KKBFormItem = (
  boxType: KKBBoxType,
  formRef?: FormInstance<any>,
  igmpProxy?: object,
): React.ReactNode => {
  let formBoxEle: any;
  const comOptionsData = boxType?.data || [];
  const handleOpts = filterDefaultValue(boxType.options);
  const handleIgmpProxy = igmpProxy || {};
  const { custom, onChange, ...restBoxType } = boxType;
  const handleCustomConfig = {
    ...restBoxType,
    formRef,
    ...handleIgmpProxy,
  };

  const mapping = boxType.mapping || { label: 'label', value: 'value' };
  switch (boxType.type) {
    case KKBFORM_TYPE.input:
      // formBoxEle = <InputExt options={handleOpts} {...handleIgmpProxy} />;
      formBoxEle = <Input {...handleOpts} {...handleIgmpProxy} />;
      break;
    case KKBFORM_TYPE.inputNum:
      formBoxEle = (
        <InputNumber
          placeholder="请输入"
          style={{
            width: '100%',
          }}
          {...handleOpts}
          {...handleIgmpProxy}
        />
      );
      break;
    case KKBFORM_TYPE.inputGroup:
      formBoxEle = (
        <InputGroup
          placeholder="请输入"
          style={{
            width: '100%',
          }}
          {...handleOpts}
          {...handleIgmpProxy}
        />
      );
      break;
    case KKBFORM_TYPE.select:
      formBoxEle = (
        <Select
          placeholder="请选择"
          allowClear
          showArrow
          {...handleOpts}
          {...handleIgmpProxy}
          // options={comOptionsData}
          options={comOptionsData?.map((item: BoxDataItem, index: number) => {
            if (boxType.renderBoxDataItem) {
              return boxType.renderBoxDataItem(item, index);
            }
            return {
              label: `${item[mapping.label]}`,
              value: item[mapping.value],
              disabled: item.disabled,
            };
          })}
        />
      );
      break;
    case KKBFORM_TYPE.searchSelect: // 搜索下拉组件
      formBoxEle = (
        <Select
          placeholder="请选择"
          allowClear
          showSearch
          showArrow
          filterOption={(input, option: any) =>
            option?.label?.toLowerCase().indexOf(input?.toLowerCase()) >= 0
          }
          {...handleOpts}
          {...handleIgmpProxy}
          options={comOptionsData?.map((item: BoxDataItem, index: number) => {
            if (boxType.renderBoxDataItem) {
              return boxType.renderBoxDataItem(item, index);
            }
            return {
              label: `${item[mapping.label]}`,
              value: item[mapping.value],
              disabled: item.disabled,
            };
          })}
        />
      );
      break;
    case KKBFORM_TYPE.tagsSelect: // tags标签组件
      formBoxEle = (
        <Select
          mode="tags"
          dropdownStyle={{ display: 'none' }} // 隐藏下拉菜单
          placeholder="请选择"
          allowClear
          tokenSeparators={[',', ' ']}
          options={comOptionsData}
          {...handleOpts}
          {...handleIgmpProxy}
        />
      );
      break;
    case KKBFORM_TYPE.uploadImg: // 单图片上传
      formBoxEle = (
        <KKBUploadImg
          token={globalData?.uploadOpts?.token}
          {...boxType.options}
          {...handleIgmpProxy}
          totalNum={1}
          showUploadList={false}
          singlePreview
        />
      );
      break;
    case KKBFORM_TYPE.uploadImgMultiple: // 多图片上传
      formBoxEle = (
        <KKBUploadImg
          token={globalData?.uploadOpts?.token}
          {...boxType.options}
          {...handleIgmpProxy}
        />
      );
      break;
    case KKBFORM_TYPE.uploadFile:
      formBoxEle = (
        <KKBUploadFile
          token={globalData?.uploadOpts?.token}
          {...boxType.options}
          {...handleIgmpProxy}
        />
      );
      break;
    case KKBFORM_TYPE.textArea: // 多行文本
      formBoxEle = <TextArea {...handleOpts} {...handleIgmpProxy} />;
      break;
    case KKBFORM_TYPE.radio: // 单选框
      formBoxEle = (
        <Radio.Group
          buttonStyle="solid"
          {...handleOpts}
          {...handleIgmpProxy}
          options={comOptionsData?.map((item: RadioItem) => {
            return {
              label: item[mapping.label],
              value: item[mapping.value],
            };
          })}
        />
      );
      break;
    case KKBFORM_TYPE.checkbox: // 复选框
      formBoxEle = (
        <CheckBox
          direction="row"
          {...handleOpts}
          {...handleIgmpProxy}
          name={boxType.name}
          options={comOptionsData}
        />
      );
      break;
    case KKBFORM_TYPE.switch: // Switch组件
      formBoxEle = (
        <Switch
          checkedChildren="开启"
          unCheckedChildren="关闭"
          {...handleOpts}
          {...handleIgmpProxy}
        />
      );
      break;
    case KKBFORM_TYPE.datePicker: // 日期选择框
      formBoxEle = (
        <DatePicker
          className={boxType?.className}
          {...handleOpts}
          {...handleIgmpProxy}
        />
      );
      break;
    case KKBFORM_TYPE.rangePicker: // 日期选择框
      formBoxEle = (
        <DatePicker.RangePicker
          className={boxType?.className}
          {...handleOpts}
          {...handleIgmpProxy}
        />
      );
      break;
    case KKBFORM_TYPE.dyInputs:
      formBoxEle = (
        <DyInputFormList
          className={boxType?.className}
          {...boxType.options}
          {...handleIgmpProxy}
          name={boxType.name}
          rules={boxType.rules}
          textAreaRules={boxType.options?.textAreaRules}
        />
      );
      break;
    case KKBFORM_TYPE.dyAddComList:
      formBoxEle = (
        <DyAddComList
          className={boxType?.className}
          {...boxType.options}
          {...handleIgmpProxy}
          name={boxType.name}
          rules={boxType.rules}
          formRef={formRef}
        />
      );
      break;
    case KKBFORM_TYPE.dyOperateItem:
      formBoxEle = (
        <DyOperateItem
          className={boxType?.className}
          {...boxType.options}
          {...handleIgmpProxy}
          name={boxType.name}
          label={boxType.label}
          rules={boxType.rules}
          formRef={formRef}
        />
      );
      break;
    case KKBFORM_TYPE.dyOperateList:
      formBoxEle = (
        <DyOperateList
          className={boxType?.className}
          {...boxType.options}
          {...handleIgmpProxy}
          name={boxType.name}
          label={boxType.label}
          rules={boxType.rules}
          formRef={formRef}
        />
      );
      break;
    case KKBFORM_TYPE.multiCom:
      formBoxEle = (
        <MultiCom
          className={boxType?.className}
          {...boxType.options}
          {...handleIgmpProxy}
          name={boxType.name}
          noForm={boxType.noForm}
          rules={boxType.rules}
          formRef={formRef}
        />
      );
      break;
    case KKBFORM_TYPE.operate:
      formBoxEle = (
        <Operate
          className={boxType?.className}
          {...boxType.options}
          {...handleIgmpProxy}
          lists={boxType.children}
          name={boxType.name}
          rules={boxType.rules}
          formRef={formRef}
        />
      );
      break;
    case KKBFORM_TYPE.preview:
      formBoxEle = (
        <Preview
          className={boxType?.className}
          {...boxType.options}
          {...handleIgmpProxy}
          lists={boxType.children}
          name={boxType.name}
          rules={boxType.rules}
          formRef={formRef}
        />
      );
      break;
    case KKBFORM_TYPE.custom:
      // 过滤部份参数
      formBoxEle = boxType.custom?.(handleCustomConfig);
      break;
    default:
      break;
  }

  if (!formBoxEle && KKBFormSwapData.has(`${boxType.type}`)) {
    const DyComponent = KKBFormSwapData.get(`${boxType.type}`);
    formBoxEle = DyComponent && (
      <DyComponent
        className={boxType.className || getPrefixCls('formItemWrap')}
        {...handleCustomConfig}
        {...handleIgmpProxy}
      />
    );
  }
  return formBoxEle;
};
