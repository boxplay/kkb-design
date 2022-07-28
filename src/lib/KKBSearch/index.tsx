import React, {
  useImperativeHandle,
  forwardRef,
  useState,
  useEffect,
} from 'react';
import { debounce } from 'lodash';
import { DownOutlined, UpOutlined } from '@ant-design/icons';
import {
  Form,
  Select,
  Input,
  Button,
  Spin,
  Row,
  Col,
  InputNumber,
  DatePicker,
  Cascader,
  TreeSelect,
  Radio,
} from 'antd';
import { KKBSearchSwapData } from '../../consts/KKBSearch.swap';
// 集成组件
import SEARCH_TYPE from './boxType';
import {
  KKBSearchProps,
  KKBSearchRef,
  ItemKKBSearch,
  DataItem,
  FormValues,
  RadioItem,
} from './typeData';
import { getPrefixCls } from '../../utils';
import './index.less';

const defaultSpan = 8;

const KKBSearch = forwardRef<KKBSearchRef, KKBSearchProps>(
  (
    {
      miniSearch=false, 
      boxData = [], // 动态表单数据，每个动态组件详细参数
      searchResetFn, // 重置事件回调
      searchFn, // 搜索事件回调
      defaultValue = {}, // 默认初始参数
      labelAlign = 'right', // 左侧文字对齐方式
      loading = false, // 是否显示加载中loading
      wrapperCol = { span: 24 },
      labelCol = { span: 4 },
      style,
      // btnTextAlign = 'left', // 底部按钮对其方式
      // btnSpan = 24, // 按钮栅格占位格数
      customBtn, // 自定义按钮
      saveBtnText = '查询', // 搜索按钮文案 fasle不显示
      resetBtnText = '重置', // 重置按钮文案 fasle不显示
      isCollapse = true, // 是否启动折叠面板,
      isPasteSearch = true, // 是否启动粘贴搜索,
      collapseChange = () => {},
      onValuesChange,
      defaultCollaps = false // 默认是否收起
    },
    ref,
  ) => {
    const [dySearchRef] = Form.useForm();
    const [hiddenNum, setHiddenNum] = useState(6)
    const [active, setActive] = useState<boolean>(defaultCollaps);

    useEffect(()=>{
      let defaultNum = 6
      boxData.forEach((item, index) => {
        if (index < 6 && (item.span / 8) > 1) {
          const num = (item.span / 8) - 1
          defaultNum -= num
        }
      })
      setHiddenNum(defaultNum)
    }, [boxData])

    // 通用过滤多于options参数，谨慎操作，请查看多个组件是否会有影响
    // 初始化值defaultValue和值value通过form设置，不通过配置项传入
    const filterDefaultValue = (options: any) => {
      const {
        defaultValue: defaultVal,
        value,
        defaultChecked,
        ...newOpts
      } = options || {};

      return newOpts;
    };

    // const enterDown = () => {
    //   dySearchRef?.getFieldsValue()
    //   searchFn && searchFn(dySearchRef?.getFieldsValue())
    // }
    useEffect(() => {
      if (collapseChange) {
        collapseChange(active);
      }
    }, [active]);

    const handlePaste = () => {
      if(isPasteSearch){
        setTimeout(()=>{
          dySearchRef?.submit()
        }, 0)
      }
    }
    // 监听输入框变化，是否支持清空搜索功能，isClearSearch默认为true即为支持
    const handleChange = (e:any, options:any) => {
      const { isClearSearch=true, onChange } = options
      if(isClearSearch &&!e.target.value && e.type !== 'change'){
        dySearchRef?.submit();
      }
      if(onChange) onChange(e);
    }

    // 生成formItem动态组件
    const generateFormBox = (v: ItemKKBSearch): React.ReactNode => {
      let formBoxEle = null;
      const { data = [], options, onChange, callback, custom, ...rest } = v;
      const mapping = v.mapping || { label: 'label', value: 'value' };
      const handleCustomConfig = {
        ...rest,
        options,
        data,
        formRef: dySearchRef,
      };
      const handleOpts = filterDefaultValue(options);

      switch (v.type) {
        case SEARCH_TYPE.input: // 输入框      
          formBoxEle = <Input {...handleOpts} onChange={(e) => handleChange(e, options)} onPaste={handlePaste}/>;
          break;
        case SEARCH_TYPE.inputNumber: // 数字输入框
          formBoxEle = <InputNumber {...handleOpts} onPaste={handlePaste}/>;
          break;
        case SEARCH_TYPE.datePicker: // 日期选择框
          formBoxEle = <DatePicker {...handleOpts} />;
          break;
        case SEARCH_TYPE.cascader: // 级联选择
          formBoxEle = <Cascader {...handleOpts} />;
          break;
        case SEARCH_TYPE.treeSelect: // 树选择
          formBoxEle = <TreeSelect {...handleOpts} />;
          break;
        case SEARCH_TYPE.rangePicker: // 日期范围选择框
          formBoxEle = <DatePicker.RangePicker {...handleOpts} />;
          break;
        case SEARCH_TYPE.select: // 下拉框
          formBoxEle = (
            <Select
              onChange={onChange}
              allowClear
              showArrow
              maxTagCount="responsive"
              {...handleOpts}
              options={data?.map((item: DataItem) => {
                return {
                  label: item[mapping.label],
                  value: item[mapping.value],
                  disabled: item.disabled,
                };
              })}
            />
          );
          break;
        case SEARCH_TYPE.searchSelect: // 搜索下拉组件
          formBoxEle = (
            <Select
              onChange={onChange}
              allowClear
              showSearch
              showArrow
              maxTagCount="responsive"
              onSearch={callback}
              filterOption={(input, option) =>
                typeof option?.label === 'string' &&
                option?.label?.toLowerCase().indexOf(input?.toLowerCase()) >= 0
              }
              {...handleOpts}
              options={data?.map((item: DataItem) => {
                return {
                  label: item[mapping.label],
                  value: item[mapping.value],
                  disabled: item.disabled,
                };
              })}
            />
          );
          break;
        case SEARCH_TYPE.tagsSelect: // 搜索下拉组件
          formBoxEle = (
            <Select
              mode="tags"
              dropdownStyle={{ display: 'none' }} // 隐藏下拉菜单
              onChange={onChange}
              allowClear
              onSearch={callback}
              tokenSeparators={[',', ' ']}
              options={data?.map((item: DataItem) => {
                return {
                  label: item[mapping.label],
                  value: item[mapping.value],
                  disabled: item.disabled,
                };
              })}
            />
          );
          break;
        case SEARCH_TYPE.custom: // 用户自定义组件
          formBoxEle = custom?.(handleCustomConfig);
          break;
        case SEARCH_TYPE.empty: // 占位
          formBoxEle = <div />;
          break;
        case SEARCH_TYPE.radio: // 单选
          formBoxEle = (
            <Radio.Group
              optionType="button"
              {...handleOpts}
              options={data?.map((item: RadioItem) => {
                return {
                  label: item[mapping.label],
                  value: item[mapping.value],
                };
              })}
            />
          );
          break;
        default:
          break;
      }

      if (!formBoxEle && KKBSearchSwapData.has(`${v.type}`)) {
        const Com = KKBSearchSwapData.get(`${v.type}`);
        formBoxEle = Com && <Com {...handleCustomConfig} />;
      }
      return v.type !== SEARCH_TYPE.empty ? (
        <Form.Item
          name={v.name}
          label={v.label}
          rules={v.rules}
          labelCol={{ span: (8 / (v.span || 8)) * 4 }}
        >
          {formBoxEle || <Input {...handleOpts} />}
        </Form.Item>
      ) : (
        formBoxEle || <Input {...handleOpts} />
      );
    };

    // 保存提交事件
    const onFinish = (values: FormValues) => {
      searchFn?.(values);
    };

    // 重置事件
    const onReset = () => {
      dySearchRef.resetFields();
      if (searchResetFn) {
        searchResetFn?.(dySearchRef?.getFieldsValue());
      } else {
        console.warn('请传入重置事件');
      }
    };

    useImperativeHandle(ref, () => ({
      formRef: dySearchRef,
      // 设置form参数
      setValue: (values: any) => dySearchRef?.setFieldsValue(values),
      // 获取form参数
      getValue: () => dySearchRef?.getFieldsValue(),
      // 重置form
      reset: () => dySearchRef?.resetFields(),
    }));
    const renderMiniSearchFormItem = () => {
      return (<>
        {boxData.slice(0, 1)?.map((v) => {
            const formBoxEle = generateFormBox(v);
            return (
              <Col span={24} key={v.name}>
                {formBoxEle}
              </Col>
            );
          })}
      </>)
    }
    const renderFormItem = () => {
      if (isCollapse && boxData.length > hiddenNum) {
        return (
          <>
            {boxData.slice(0, hiddenNum)?.map((v) => {
              const formBoxEle = generateFormBox(v);
              return (
                <Col span={v.span || defaultSpan} key={v.name}>
                  {formBoxEle}
                </Col>
              );
            })}
            {boxData.slice(hiddenNum, boxData.length)?.map((v) => {
              const formBoxEle = generateFormBox(v);
              return (
                <Col span={v.span || defaultSpan} key={v.name}>
                  <div className={active ? '' : 'hide-collapse'}>
                    {formBoxEle}
                  </div>
                </Col>
              );
            })}
          </>
        );
      }

      return (
        <>
          {boxData?.map((v) => {
            const formBoxEle = generateFormBox(v);
            return (
              <Col span={v.span || defaultSpan} key={v.name}>
                {formBoxEle}
              </Col>
            );
          })}
        </>
      );
    };
    const onInputValuesChange = debounce((changedValues: any, allValues) => {
      if (onValuesChange) {
        onValuesChange(changedValues, allValues);
      }
      const changeKey = Object.keys(changedValues)[0];
      const item = boxData.find((nitem: any) => {
        return nitem.name === changeKey;
      });
      if (
        item?.type !== SEARCH_TYPE.input &&
        item?.type !== SEARCH_TYPE.inputNumber
      ) {
        searchFn(dySearchRef?.getFieldsValue());
      }
    }, 300);

    return (
      <div
        className={!miniSearch ? getPrefixCls('KKBSearch-dyFormWrap') : `${getPrefixCls('KKBSearch-dyFormWrapOther')} ${getPrefixCls('KKBSearch-dyFormWrap')}`}
        style={!miniSearch ? { padding: '16px 0px 24px 0', ...style } : { padding: '16px 0px 0 0', ...style }}
      >
        <Form
          form={dySearchRef}
          onFinish={onFinish}
          initialValues={defaultValue}
          wrapperCol={wrapperCol}
          labelCol={labelCol}
          labelAlign={labelAlign}
          onValuesChange={onInputValuesChange}
        >
          <Spin tip="加载中..." spinning={loading}>
            <Row gutter={24} style={{margin: 0}}>
              {miniSearch ? renderMiniSearchFormItem() : renderFormItem()}
              {!miniSearch && <div style={{ width: '100%' }}>
                <Col
                  span={8}
                  style={{ display: 'flex', alignContent: 'center' }}
                >
                  <Col
                    span={4}
                    style={{
                      minWidth: '100px',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'flex-end',
                      padding: 0,
                    }}
                  >
                    {isCollapse && boxData.length > hiddenNum ? (
                      <div
                        className="collapse-btn "
                        onClick={() => {
                          setActive(!active);
                        }}
                      >
                        <span style={{ paddingRight: 4 }}>
                          {active ? '收起' : '展开'}
                        </span>
                        {active ? <UpOutlined /> : <DownOutlined />}
                      </div>
                    ) : (
                      <div style={{ width: 62 }} />
                    )}
                  </Col>
                  <Col span={24} style={{ padding: 0 }}>
                    {saveBtnText ? (
                      <Button
                        type="primary"
                        htmlType="submit"
                        style={{ marginRight: '8px' }}
                      >
                        {saveBtnText}
                      </Button>
                    ) : null}
                    {resetBtnText ? (
                      <Button onClick={onReset}>{resetBtnText}</Button>
                    ) : null}
                    {customBtn ? <> {customBtn} </> : null}
                  </Col>
                </Col>
              </div>}
            </Row>
          </Spin>
        </Form>
      </div>
    );
  },
);

export { KKBSearch, SEARCH_TYPE, KKBSearchProps };
