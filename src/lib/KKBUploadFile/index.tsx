import React, { useState, useEffect } from 'react';
import { UploadOutlined } from '@ant-design/icons';
import { getUploadToken, getCorgiToken } from '@base/kkb-utils'
import { RcFile, UploadChangeParam } from 'antd/lib/upload';
import { UploadFile } from 'antd/lib/upload/interface';
import { cloneDeep, isEmpty, isFunction } from 'lodash';
import { Upload, Button } from 'antd';
import {
  generateQiniuUrlKey,
  imageVolumeCheck,
  imageMaxSizeCheck,
} from '../../utils/upload_tool';
import { FileListItem, UploadFileProps, UploadValueData } from './typeData';
import './index.less';
import { getPrefixCls } from '../../utils';
import { globalData } from '../../consts';
import FileIcon from './fileType';
import Icons  from '../Icon';
import StatusCom from './StatusCom';

const fileInfoMapping: any = {}

// 文件上传组件
const UploadFileQN = ({
  value,
  onChange,
  multiple,
  btnTitle,
  desc,
  btnType,
  btnDisabled,
  fileVolume,
  accept = '*',
  onRemove,
  onPreview,
  onDownload,
  directory = false,
  maxCount,
  replaceFile = true,
  doneCb,
  data,
  bucketName = '',
  env = 'test',
  tenantid,
  appid,
  action = globalData.uploadOpts?.action, // 自定义上传地址
  imgHost = globalData.uploadOpts?.imgHost, // 自定义上传地址
  hideDelIcon = false, // 是否隐藏删除icon按钮
  hideViewIcon = false, // 是否隐藏查看icon按钮
  customRequest,
  iconRender,
  showUploadList,
  page,
  renderStatusNode,
  disabled,
  fileImportStatus
}: 
UploadFileProps) => {
  const [fileListData, setFileListData] = useState<UploadValueData>([]);
  const [token, setToken] = useState<string>();
  const [newImgHost, setimgHost] = useState<string | undefined>(imgHost);
  const [newData, setData] = useState<any>(data);
  const [newAction, setAction] = useState<string | undefined>(action);

   useEffect(()=>{
    const init = async () => {
      const res = await getUploadToken({
        isStaff: true,
        headers: {
          token: getCorgiToken(env) as string,
          tenantid: tenantid || '6XWFVymtaB68REyRBuf',
          appid: appid || '1001',
        },
        tokenParams: {
          bucketName,
          uploadPolicy: true
        },
        env
      })
      const { token: uploadToken, domain, aliPolicy, aliAccessId, aliSignature, aliHost } = res?.data || {}
      setToken(uploadToken)
      setimgHost(domain)
      if (aliHost) setAction(aliHost)
      setData({
        OSSAccessKeyId: aliAccessId,
        policy: aliPolicy,
        Signature: aliSignature,
        ...data
      })
    }
    if (bucketName && !customRequest) {
      init()
    } else if (!customRequest){
      console.warn('kkb-design: 请传入bucketName' )
    }
  }, [])

  // 判断是否替换
  const isReplaceFile = () => {
    return maxCount === 1 && replaceFile;
  };

  // 添加上传后图片完整url字段
  const handleAddFileUrl = (fileList: UploadFile<any>[]) => {
    const filedata = fileList?.map((item) => {
      const newItem = item;
        if (item.status === 'done' && (item.url === undefined || item.url?.includes('undefined'))) {
          newItem.url = `${newImgHost}/${ item.response.key || fileInfoMapping[item.uid]}`;
        }
      return newItem;
    });
    return filedata;
  };

  // 上传中、完成、失败都会调用这个函数。
  const onFileChange = ({
    file,
    fileList,
  }: UploadChangeParam<UploadFile<any>>) => {
    const isReplace = isReplaceFile();
    let handleFile = isReplace ? [file] : [...fileList];
    // 单文件可覆盖时
    if (
      file.status === 'removed' &&
      maxCount === 1 &&
      handleFile.length === 1
    ) {
      handleFile = [];
    }

    // setFileListD`````````````````````````````````````````ata(handleFile);
    // if (file.status !== 'uploading') {}

    const newFileList = handleAddFileUrl(handleFile);
    const cloneDeepFileList = cloneDeep(newFileList);

    onChange?.(cloneDeepFileList); // antd Form使用
    setFileListData(cloneDeepFileList);
    if (file.status === 'done') {
      doneCb?.(handleFile);
    }
  };

  // 上传前处理
  const beforeUpload = async (
    file: RcFile,
    fileList: RcFile[],
  ): Promise<any> => {
    const isFileVolume = imageVolumeCheck(file, fileVolume); // 大小
    // 上传文件数量判断
    let isFileMaxSize: boolean;
    if (isReplaceFile()) {
      isFileMaxSize = true;
    } else {
      isFileMaxSize = imageMaxSizeCheck({
        fileList: value || fileListData,
        upFileList: fileList,
        maxNum: maxCount,
      });
    }
    return new Promise((resolve, reject) => {
      if (isFileVolume && isFileMaxSize) {
        resolve(true);
      }
      // eslint-disable-next-line prefer-promise-reject-errors
      reject(false);
    });
  };

  // 移除时回调
  const onRemoveFile = async (file: FileListItem): Promise<boolean> => {
    const flag = await onRemove?.(file);
    
    if(fileInfoMapping.hasOwnProperty(file.uid)) {
      delete fileInfoMapping[file.uid]
    }
    
    return new Promise((resolve) => {
      if (typeof onRemove !== 'undefined') resolve(flag || false);
      resolve(true);
    });
  };

  const getExtraData = (file: FileListItem) => {
    const key = generateQiniuUrlKey(file)
    // setFileUrl(key)
    fileInfoMapping[file.uid] = key
    return {
      'x:funcId': 1,
      token,
      key,
      ...newData
    };
  };
  // 样式处理
  const uploadClass = () => {
    let cssName = ``;
    if (hideDelIcon) cssName += `${getPrefixCls('hideDelIcon')} `;
    if (hideViewIcon) cssName += `${getPrefixCls('hideViewIcon')} `;
    return cssName;
  };
  const handleShowUploadList = () => {
    // @ts-ignore
    return showUploadList === undefined || showUploadList ? { removeIcon: <Icons.DeleteLinear style={{ fontSize: '16px' }} />,...showUploadList } : false
  }
  const handleDesc: () => ("string" | undefined | string) = () => {
    if (!isEmpty(desc)) return desc
    return `选择或拖拽文件上传，支持格式：${accept.replace(/\,/g,'、')}`
  }
  const handleUpload = () => {
    const optsData = {
      action: newAction,
      fileList: value || fileListData,
      data: getExtraData,
      onChange: onFileChange,
      beforeUpload,
      multiple,
      onRemove: onRemoveFile,
      onPreview,
      onDownload,
      directory,
      accept,
      customRequest,
      disabled,
      iconRender: (file: UploadFile) => {
        const reg = /(\.\w*)$/g
        const fileName = file.name
        const suffix = fileName.match(reg)
        // @ts-ignore
        return <FileIcon className={getPrefixCls('file-list-icon')} style={{color: ''}} fileSuffix={suffix ? suffix[0] : ''}/>
      },
      showUploadList: handleShowUploadList()
    };
    if(iconRender) {
      // @ts-ignore
      optsData.iconRender = iconRender
    }
    if (btnType === 'dragger') {
      return (
        <div className={getPrefixCls(`uploadBox dragBox ${page ? 'page' : ''}`)}>
          {
            fileImportStatus && renderStatusNode && isFunction(renderStatusNode) ?
              renderStatusNode({ uploadNode: (children: any) => (
                <div className={getPrefixCls('uploadNode')}>
                  <Upload {...optsData}>{children}</Upload>
                </div>
                ), status: fileImportStatus}) :
              (
              <>
                <Upload.Dragger {...optsData}>
                  <p className={getPrefixCls('upload-drag-icon')}>
                    <Icons.Upload
                      style={{
                        fontSize: '40px',
                        color: 'rgba(0,0,0,0.45)'
                      }}/>
                  </p>
                  <Button className={getPrefixCls('uploadExt-btn')} type='default'>选择文件</Button>
                  <div className={getPrefixCls('upload-text-ext')}>{handleDesc()}</div>
                </Upload.Dragger>
              </>
            )
          }
        </div>
      );
    }

    return (
      <div className={getPrefixCls('uploadBox')}>
        <Upload {...optsData} className={uploadClass()}>
          <Button icon={<UploadOutlined />} type="primary" disabled={btnDisabled}>
            {btnTitle || '点击上传'}
          </Button>
        </Upload>
      </div>
    );
  };

  return handleUpload();
};
UploadFileQN.StatusCom = StatusCom
export default UploadFileQN;
