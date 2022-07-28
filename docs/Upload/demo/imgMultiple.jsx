import React, { useEffect, useRef, useState } from 'react';
import { KKBForm, KKBFORM_TYPE, KKBConfig } from '@base/kkb-design';
import { getUploadToken, upload } from '@base/kkb-utils'
import { Modal } from 'antd';
import { docCookies } from './index'

const App = () => {
  const [boxData, setBoxData] = useState([]);
  const ref = useRef();
  const [corgitoken, setCorToken] = useState(docCookies.getItem("corgi-token-prod-data"))
  useEffect(() => {
    const initVgeForm = async () => {
      KKBConfig({
        // 上传文件配置
        uploadOpts: {
          action: 'https://upload-z1.qiniup.com/'
        },
      });
      const boxDataType = [
        {
          type: KKBFORM_TYPE.uploadImgMultiple,
          label: '多图上传12',
          name: 'imgMultiple1',
          options: {
            bucketName: 'kkb-cybertron-prod',
            env: 'prod',
          },
        },
        {
          type: KKBFORM_TYPE.uploadImgMultiple,
          label: '多图上传2',
          name: 'imgMultiple2',
          // 配置参数
          options: {
            bucketName: 'kkb-cybertron-prod',
            env: 'prod',
            accept: 'image/*', // 上传文件类型限制 image audio video
            hideViewIcon: false, // 是否隐藏查看icon按钮
            hideDelIcon: false, // 是否隐藏删除icon按钮
            multiple: true, // 是否支持多选图片
            totalNum: 10, // 上传数量限制
            limitShowBtn: false, // 超出数量限制是否显示上传按钮
            isImageDesc: true, // 是否开启描述
            imageSize: [, 300], // img 尺寸 [宽，高]
            imageVolume: {
              type: 'M',
              fileSize: 10, // 限制图片大小，及显示描述
            },
            imageType: ['jpg', 'png', 'jpeg'], // 图片格式描述
          },
        },
        {
          type: KKBFORM_TYPE.uploadImgMultiple,
          label: '多图上传3',
          labelTips: ['移除图片验证功能'],
          name: 'imgMultiple3',
          options: {
            bucketName: 'kkb-cybertron-prod',
            env: 'prod',
            onRemove: (files, file) => {
              return new Promise((reslove) => {
                Modal.confirm({
                  title: '删除确认',
                  content: `确定删除当前图片么？ 图片地址：${file.url}`,
                  okText: '确认',
                  cancelText: '取消',
                  onOk: () => {
                    reslove(true); // 返回true可移除
                  },
                });
              });
            },
          },
        },
        {
          type: KKBFORM_TYPE.uploadImgMultiple,
          label: '多图禁止上传',
          name: 'imgMultiple4',
          disabled: true,
          // 配置参数
          options: {
            bucketName: 'kkb-cybertron-prod',
            env: 'prod',
            isImageDesc: true, // 是否开启描述
            imageSize: [4000, 3500], // img 尺寸 [宽，高]
            imageType: ['jpg', 'png', 'jpeg'], // 图片格式描述
            imageSizeDesc: '最优宽高比  16：9', // 图片尺寸描述，不写默认展示imageSize参数
            disabled: true,
          },
        },
        {
          type: KKBFORM_TYPE.multiCom,
          name: 'imgMultiple5',
          label: '组合组件',
          options: {
            formlist: [
              {
                type: KKBFORM_TYPE.uploadImgMultiple,
                name: 'upload_imgsAll1',
                disabled: true,
                // 配置参数
                options: {
                  style: {
                    marginRight: 100,
                  },
                 bucketName: 'kkb-cybertron-prod',
                 env: 'prod',
                  accept: 'image/*', // 上传文件类型限制 image audio video
                  hideViewIcon: false, // 是否隐藏查看icon按钮
                  hideDelIcon: false, // 是否隐藏删除icon按钮
                  multiple: true, // 是否支持多选图片
                  totalNum: 10, // 上传数量限制
                  limitShowBtn: false, // 超出数量限制是否显示上传按钮
                  isImageDesc: true, // 是否开启描述
                  imageSize: [4000, 3500], // img 尺寸 [宽，高]
                  imageVolume: {
                    type: 'M',
                    fileSize: 10, // 限制图片大小，及显示描述
                  },
                  imageType: ['jpg', 'png', 'jpeg'], // 图片格式描述
                  disabled: true,
                },
              },
              {
                type: KKBFORM_TYPE.uploadImgMultiple,
                labelTips: ['移除图片验证功能'],
                name: 'upload_imgsRemove2',
                options: {
                  bucketName: 'kkb-cybertron-prod',
                  env: 'prod',
                  onRemove: (files, file) => {
                    return new Promise((reslove) => {
                      Modal.confirm({
                        title: '删除确认',
                        content: `确定删除当前图片么？ 图片地址：${file.url}`,
                        okText: '确认',
                        cancelText: '取消',
                        onOk: () => {
                          reslove(true); // 返回true可移除
                        },
                      });
                    });
                  },
                },
              },
            ],
          },
        },
        {
          type: KKBFORM_TYPE.uploadImgMultiple,
          label: '自定义多图上传',
          name: 'imgMultiple6',
          options: {
            action: 'https://upload-z1.qiniup.com/',
            imgHost: 'https://cybertron.kaikeba.com/',
            customRequest: async (options) => {
              const { file, onSuccess } = options;
              const a = await upload({
                file,
                isStaff: true,
                headers: {
                  token: corgitoken,
                  tenantid: '6XWFVymtaB68REyRBuf',
                  appid: '1001',
                },
                tokenParams: {
                  bucketName: 'kkb-cybertron-prod',
                },
                env: 'prod'
              });
              console.log(a)
              onSuccess(a, file);
            },
          },
        }
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
    <KKBForm
      ref={ref}
      boxData={boxData}
      saveFn={saveBtn}
      cancelFn={cancelBtn}
    />
  );
};
export default App;
