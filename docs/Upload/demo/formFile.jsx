import React, { useEffect, useState } from 'react';
import { notification } from 'antd';
import { KKBForm, KKBFORM_TYPE, KKBConfig } from '@base/kkb-design';
import { upload } from '@base/kkb-utils'
import { docCookies } from './index'

const App = () => {
  const [boxData, setBoxData] = useState([]);
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
          type: KKBFORM_TYPE.uploadFile,
          label: '拖拽文件上传',
          name: 'uploadFile_fileNamedragger0',
          options: {
            bucketName: 'kkb-cybertron-prod',
            env: 'prod',
            btnType: 'dragger', // 拖拽按钮
            // 自定义按钮区域，注释内容
            // btnTitle: <span style={{ color: 'red' }}>内容</span>,
          },
        },
        {
          type: KKBFORM_TYPE.uploadFile,
          label: '文件上传',
          name: 'uploadFile_fileName1',
          options: {
            bucketName: 'kkb-cybertron-prod',
            env: 'prod',
          },
        },
        {
          type: KKBFORM_TYPE.uploadFile,
          label: '禁止文件上传',
          name: 'uploadFile_fileName2',
          options: {
            bucketName: 'kkb-cybertron-prod',
            env: 'prod',
            btnDisabled: true,
          },
        },
        {
          type: KKBFORM_TYPE.uploadFile,
          label: '文件上传2',
          name: 'uploadFile_fileNameNoRemove3',
          options: {
            bucketName: 'kkb-cybertron-prod',
            env: 'prod',
            hideDelIcon: true,
            btnTitle: '上传，但不支持删除',
            accept: 'image', // 文件类型限制 image audio video
            onRemove: file => {
              if (file.name === 'noRemove.mp4') {
                notification.error({
                  message: `禁止删除${file.name}文件`,
                });
                return false;
              }
              return true;
            },
          },
        },
        {
          type: KKBFORM_TYPE.uploadFile,
          label: '自定义上传',
          name: 'custom_uploadFile_fileName4',
          options: {
            btnTitle: '自定义上传',
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
              onSuccess(a, file);
            },
          },
        },
        {
          type: KKBFORM_TYPE.uploadFile,
          label: '限制上传大小',
          name: 'uploadFile_fileLimitSize5',
          options: {
            bucketName: 'kkb-cybertron-prod',
            env: 'prod',
            // 限制文件大小
            fileVolume: {
              type: 'kb',
              fileSize: 10,
            },
          },
        },
        {
          type: KKBFORM_TYPE.uploadFile,
          label: '替换文件',
          name: 'uploadFile_fileLimitOne6',
          options: {
            bucketName: 'kkb-cybertron-prod',
            env: 'prod',
            maxCount: 1, // 单文件替换
          },
        },
      ];
      setBoxData(boxDataType);
    };
    initVgeForm();
  }, []);

  const saveBtn = values => {
    console.log('保存', values);
  };

  return (
    <KKBForm
      boxData={boxData}
      saveFn={saveBtn}
      cancelBtnText={null}
      // 默认参数
      defaultValue={{
        uploadFile_fileLimitOne: [
          {
            uid: 'fileLimitOne1', // key唯一性
            name: 'demo.mp4',
            status: 'done',
            // 文件下载地址
            url: 'https://video.kaikeba.com/51520241800202zqyy.mp4',
          },
        ],
        uploadFile_fileNameNoRemove: [
          {
            uid: '1',
            name: 'xxx.mp4',
            status: 'done',
            url: 'https://video.kaikeba.com/51520241800202zqyy.mp4',
          },
          {
            uid: '2',
            name: 'noRemove.mp4',
            status: 'done',
            url: 'https://video.kaikeba.com/51520241800202zqyy.mp4',
          },
        ],
      }}
    />
  );
};
export default App;
