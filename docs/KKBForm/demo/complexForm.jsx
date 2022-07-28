import React, { useEffect, useState, useRef } from 'react';
import {
  KKBHeader,
  KKBForm,
  KKBContent,
  KKBFORM_TYPE,
  Button,
} from '@base/kkb-design';
import Phone from './phone';

const App = () => {
  const [boxData, setBoxData] = useState([]);
  const [extraValue, setExtraValue] = useState('');

  useEffect(() => {
    const initVgeForm = async () => {
      const boxDataType = [
        {
          name: 'complexForm_previewCom',
          type: KKBFORM_TYPE.textArea,
          label: '预览组件',
          rules: [{ required: true }],
          options: {
            showCount: false,
            maxLength:'300',
            onChange: (value) => {
              setExtraValue(value);
            },

            customBottom: (v) => (
              <div style={{ fontSize: '12px' }}>
                已输入
                <span
                  style={{
                    display: 'inline-block',
                    color: '#f00',
                  }}
                >
                  {v.length}
                </span>
                字,还剩
                <span
                  style={{
                    display: 'inline-block',
                    color: '#f00',
                  }}
                >
                  {300 - v.length}
                </span>
                字,最多
                <span
                  style={{
                    display: 'inline-block',
                    color: '#f00',
                  }}
                >
                  300
                </span>
                字
              </div>
            ),
          },
        },
        {
          type: KKBFORM_TYPE.dyOperateList,
          label: '',
          name: 'complexForm_dyOperateList',
          options: {
            desc: '最多添加3个',
            addText: '添加价格',
            // defalutItem: true,
            formlist: [
              {
                type: KKBFORM_TYPE.input,
                name: 'complexForm_price1',
                label: '文本一',
                // rules: [{ required: true, message: '请输入直播后售价' }],
                options: {
                  addonAfter: '天',
                },
              },
              {
                type: KKBFORM_TYPE.input,
                label: '文本二',
                name: 'complexForm_price2',
                options: {
                  prefix: '¥',
                  suffix: 'RMB',
                  placeholder: '',
                },
              },
            ],
            maxNum: 3, // 最多添加上限3个
            minNum: 1,
            hiddenAdd: true, // 超出上限隐藏按钮
          },
        },
        {
          type: KKBFORM_TYPE.multiCom,
          name: 'complexForm_customSencond',
          label: '组合组件',
          options: {
            formlist: [
              {
                name: 'complexForm_course111',
                label: '',
                type: KKBFORM_TYPE.input,
                rules: [{ required: true }],
                options: {
                  placehoder: '请选择',
                  onChange: (e) => {
                    console.log('course111', e.target.value);
                  },
                },
              },
              {
                type: KKBFORM_TYPE.custom,
                name: 'complexForm_setting',
                label: '',
                noForm: true,
                options: {
                  style: { position: 'relative', left: '-10px' },
                },
                custom: ({ options, data, formRef, type, name, label }) => {
                  // 返回的组件必须是antd组件，不能有任何包裹，才能自动更新
                  return (
                    <div>
                      还没有接量组 ? <a>去设置</a>
                    </div>
                  );
                },
              },
            ],
          },
        },
        {
          type: KKBFORM_TYPE.datePicker,
          label: '底部说明',
          name: 'complexForm_sendTime',
          options: {
            placeholder: '请选择日期',
            onChange: (e) => {},
            format: 'YYYY-MM-DD HH:mm:ss',
          },
          bottom: (
            <span
              style={{
                display: 'inline-block',
                fontSize: 12,
                color: 'rgba(0, 0, 0, 0.65)',
                marginTop: 8,
              }}
            >
              若为空，则表示立即发送
            </span>
          ),
        },
        {
          type: KKBFORM_TYPE.dyOperateItem,
          name: 'complexForm_dyOperateItem',
          options: {
            addText: '动态组件1',
            // defalutItem: true,
            formlist: [
              {
                name: 'complexForm_dyadd1',
                label: '绑定课程',
                type: KKBFORM_TYPE.input,
                rules: [{ required: true }],
              },
              {
                name: 'complexForm_dyadd2',
                type: KKBFORM_TYPE.input,
                rules: [{ required: true, message: '第二个参数必填' }],
              },
            ],
            maxNum: 3, // 最多添加上限3个
            minNum: 1,
            hiddenAdd: true, // 超出上限隐藏按钮
          },
        },
        {
          type: KKBFORM_TYPE.textArea,
          label: '手机号',
          name: 'complexForm_ctextArea3',
          showCount: true,
          rules: [
            {
              required: true,
              pattern: new RegExp(/^[1-9]\d*$/, 'g'),
              message: '请输入正确的手机号',
            },
          ],
          options: {
            placeholder: '请输入手机号码，每行一条手机号',
            // disabled: true,
          },
          bottom: (
            <div>
              <Button
                type="default"
                style={{ marginRight: '24px' }}
                onClick={(values) => {
                  console.log('bottom', values);
                }}
              >
                过滤错号
              </Button>
              <Button
                type="default"
                onClick={(values) => {
                  console.log('bottom', values);
                }}
              >
                过滤重号
              </Button>
              <div style={{ fontSize: '12px' }}>
                共计号码
                <span
                  style={{
                    display: 'inline-block',
                    color: '#f00',
                    marginTop: 8,
                  }}
                >
                  1
                </span>
                个号码
              </div>
            </div>
          ),
        },
        {
          type: KKBFORM_TYPE.input,
          label: '通知人(选填）',
          name: 'complexForm_phonenumber',
          showCount: true,
          options: {
            placeholder: '请直接填写手机号，用英文逗号隔开，将发送联系人至钉钉',
          },
          bottom: (
            <div style={{ marginTop: 24 }}>
              <Button
                type="primary"
                style={{ marginRight: '24px' }}
                onClick={(values) => {
                  console.log('bottom', values);
                }}
              >
                发送短信
              </Button>
              <Button
                type="default"
                style={{ marginRight: '24px' }}
                onClick={(values) => {
                  console.log('bottom', values);
                }}
              >
                清除内容
              </Button>
              <Button
                type="default"
                onClick={(values) => {
                  console.log('bottom', values);
                }}
              >
                清除手机号
              </Button>
            </div>
          ),
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
      label: '复杂表单',
      // path: '/group',
    },
  ];
  return (
    <div>
      <KKBHeader
        title="复杂表单"
        description="页面内容简介，用来解释当前页面的内容（可无）"
        breadcrumbList={breadcrumbList}
      />
      <KKBContent>
        <KKBForm
          title="课程信息"
          boxData={boxData}
          saveFn={saveBtn}
          cancelFn={cancelBtn}
          pageType="page"
          extraCustom={
            <div>
              <Phone message={extraValue} msgType={1} messageType={0} />
            </div>
          }
          onValuesChange={(v) => {
            console.log('valuesChange', v);
          }}
        />
      </KKBContent>
    </div>
  );
};
export default App;
