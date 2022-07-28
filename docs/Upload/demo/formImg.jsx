import React, { useEffect, useRef, useState } from 'react';
import { KKBForm, KKBFORM_TYPE, KKBConfig } from '@base/kkb-design';
import { getUploadToken, upload } from '@base/kkb-utils'
import { docCookies } from './index'

KKBConfig({
  // 上传文件配置
  uploadOpts: {
    prefix: 'vgeformDemo/', // 上传二级目录名，默认kkb/
  },
});

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
          type: KKBFORM_TYPE.uploadImg,
          label: '单图上传',
          name: 'upload_img0',
          options: {
            bucketName: 'kkb-cybertron-prod',
            env: 'prod',
          },
        },
        {
          type: KKBFORM_TYPE.uploadImg,
          label: '单图禁止上传',
          name: 'upload_img1',
          options: {
            bucketName: 'kkb-cybertron-prod',
            env: 'prod',
            disabled: true,
          },
        },
        {
          type: KKBFORM_TYPE.uploadImg,
          label: '单图上传',
          name: 'upload_imgRule2',
          options: {
            bucketName: 'kkb-cybertron-prod',
            env: 'prod',
            btnTitle: '上传单张', // 按钮文字
            accept: 'image/*', // 上传文件类型限制 image audio video
            isImageDesc: true, // 是否开启描述
            imageSize: [533, 300], // img 尺寸 [宽，高]
            imageType: ['jpg', 'png', 'jpeg'], // 图片格式描述
            fixedSize: true,
          },
          rules: [{ required: true, message: '图片不能为空' }],
        },
        {
          type: KKBFORM_TYPE.uploadImgMultiple,
          label: '单图带预览',
          name: 'upload_imgsOnePreview3',
          options: {
            bucketName: 'kkb-cybertron-prod',
            env: 'prod',
            multiple: false, // 是否支持多选图片
            totalNum: 1, // 上传数量限制
            limitShowBtn: false, // 超出数量限制是否显示上传按钮
          },
        },
        // {
        //   type: KKBFORM_TYPE.uploadImgMultiple,
        //   label: '多图上传',
        //   name: 'imgMultiple2',
        //   // 配置参数
        //   options: {
        //     bucketName: 'kkb-cybertron-prod',
        //     env: 'prod',
        //     accept: 'image/*', // 上传文件类型限制 image audio video
        //     hideViewIcon: false, // 是否隐藏查看icon按钮
        //     hideDelIcon: false, // 是否隐藏删除icon按钮
        //     multiple: true, // 是否支持多选图片
        //     totalNum: 10, // 上传数量限制
        //     limitShowBtn: false, // 超出数量限制是否显示上传按钮
        //     isImageDesc: true, // 是否开启描述
        //     imageSize: [, 300], // img 尺寸 [宽，高]
        //     imageVolume: {
        //       type: 'M',
        //       fileSize: 10, // 限制图片大小，及显示描述
        //     },
        //     imageType: ['jpg', 'png', 'jpeg'], // 图片格式描述
        //   },
        // },
        {
          type: KKBFORM_TYPE.uploadImg,
          label: '自定义上传',
          name: 'upload_img_custom4',
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
    <KKBForm
      ref={ref}
      boxData={boxData}
      saveFn={saveBtn}
      cancelFn={cancelBtn}
    />
  );
};
export default App;
