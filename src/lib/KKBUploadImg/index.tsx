import React, { useState, useCallback, useRef, useEffect } from 'react';
import { getUploadToken, getCorgiToken } from '@base/kkb-utils'
import { PlusOutlined, LoadingOutlined } from '@ant-design/icons';
import { cloneDeep, isEmpty, floor } from 'lodash';
import { RcFile, UploadChangeParam } from 'antd/lib/upload';
import { UploadFile } from 'antd/lib/upload/interface';
import { Subject } from 'rxjs';
import { take } from 'rxjs/operators';
import { Upload } from 'antd';
import ImgViewer, { ImgViewerRef } from './ImgViewer';
import { UploadImgProps, UploadValueData, FileListItem } from './typeData';
import { getPrefixCls } from '../../utils';
import {
  generateQiniuUrlKey,
  imageVolumeCheck,
  imgSizeCheck,
  imageMaxSizeCheck,
  getBase64,
} from '../../utils/upload_tool';
import ImgCropModal from './ImgCropModal';
import './index.less';
import { globalData } from '../../consts';

const fileInfoMapping: any = {}

const UploadImg = ({
  isCrop,
  imageSize = [], // img 尺寸 [宽，高]
  fixedSize = false,
  imageVolume, // 限制图片体积大小
  totalNum, // 上传数量限制
  value,
  onChange,
  hideDelIcon = false, // 是否隐藏删除icon按钮
  hideViewIcon = false, // 是否隐藏查看icon按钮
  showUploadList = true, // 是否多图list模式，或单图模式
  limitShowBtn = false, // 超出数量限制是否显示上传按钮
  allDoneCallback,
  percentCallback,
  btnTitle = '上传', // 上传按钮文字
  accept = 'image/*', // 上传文件类型限制 image audio video
  multiple = false, // 是否支持多选图片
  children,
  isImageDesc = false, // 是否开启右侧描述
  imageLocationDesc,
  imageType,
  imageSizeDesc,
  imgVolumeDesc,
  listType,
  singlePreview,
  bucketName = '',
  env = 'test',
  data,
  onRemove,
  disabled,
  customRequest,
  style,
  cropOpts,
  appid,
  tenantid,
  imgHost = globalData.uploadOpts?.imgHost,
  action = globalData.uploadOpts?.action,
  useAspectRatio
}: UploadImgProps): React.ReactElement => {
  const [fileListData, setFileListData] = useState<UploadValueData>([]);
  // const [loading, setLoading] = useState(false);
  const [defaultImgIndex, setDefaultImgIndex] = useState(0);
  const [desLeft, setDesLeft] = useState(0); // 右侧浮云值
  const imgViewerRef = useRef<ImgViewerRef>(null);
  const [cropVisible, setCropVisible] = useState(false);
  const [cropFile, setCropFile] = useState<File>();
  const blobFile = useRef<any>(null);
  const croppingSubject = useRef<Subject<boolean>>();
  // const [fileUrl, setFileUrl] = useState<string>()
  const [token, setToken] = useState<string>();
  const [newImgHost, setimgHost] = useState<string | undefined>(imgHost);
  const [newData, setData] = useState<any>(data);
  const [newAction, setAction] = useState<string | undefined>(action);
  
  useEffect(() => {
    croppingSubject.current = new Subject();
    return () => {
      croppingSubject.current?.unsubscribe();
    };
  }, []);

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

  // 检测是否可以剪裁
  const checkCropAllow = (): boolean => {
    // 非多图上传，并且开启剪裁功能
    if (!multiple && isCrop) return true;
    return false;
  };

  // 判断处理上传图片状态
  const diffFileListDone = useCallback(
    (filelist: UploadFile<any>[]) => {
      const flag = filelist.every((item) => {
        return item.status === 'done' || item.url;
      });
      if (flag) allDoneCallback?.(filelist);
    },
    [allDoneCallback],
  );

  // 添加上传后图片完整url字段
  const handleAddFileUrl = useCallback(
    (fileList: UploadFile<any>[]) => {
      const allLen = fileList?.length ?? 0;
      let doneLen = 0;
      let errorLen = 0;
      const fileData = fileList?.map((item) => {
        const newItem = item;
        if (item.status === 'done' && (item.url === undefined || item.url?.includes('undefined'))) {
          newItem.url = `${newImgHost}/${ item.response.key || fileInfoMapping[item.uid]}`;
        }
        // 进度处理
        if (item.status === 'done' || !item.status || item.url) {
          doneLen += 1;
        }
        if (item.status === 'error') errorLen += 1;
        return newItem;
      });
      const currentPercent = (doneLen / allLen) * 100;
      percentCallback?.(currentPercent, errorLen);
      return fileData;
    },
    [percentCallback, newImgHost],
  );

  // 上传事件
  const onFileChange = ({
    file,
    fileList,
  }: UploadChangeParam<UploadFile<any>>) => {
    if (!file.status) return;
    // if (file.status === 'uploading') setLoading(true);
    // if (file.status === 'error') setLoading(false);
    // eslint-disable-next-line no-param-reassign
    const newFileList = handleAddFileUrl(
      showUploadList ? [...fileList] : [file],
    );
    const cloneDeepFileList = cloneDeep(newFileList);
    //
    if (file.status === 'done') {
      if (allDoneCallback) diffFileListDone(newFileList);
      // setLoading(false);
    }
    onChange?.(cloneDeepFileList); // antd Form使用
    setFileListData(cloneDeepFileList);

  };

  // 移除事件
  const onRemoveFn = async (file: FileListItem) => {
    const files = value?.filter((v) => v.url !== file.url) || [];
    const isRemove = await onRemove?.(files, file);
    
    if(fileInfoMapping.hasOwnProperty(file.uid)) {
      delete fileInfoMapping[file.uid]
    }
    
    if (typeof onRemove === 'undefined' || isRemove === true) {
      if (onChange) onChange(files);
      setFileListData(files || []);
    }
  };

  const getExtraData = (file: FileListItem) => {
    const key = generateQiniuUrlKey(file)
    fileInfoMapping[file.uid] = key
    return {
      'x:funcId': 1,
      token,
      key,
      ...newData
    };
  };

  // 上传前处理
  const beforeUpload = async (
    inputFile: RcFile,
    fileList: RcFile[],
  ): Promise<any> => {
    let file = inputFile;
    // 剪裁处理
    if (checkCropAllow()) {
      if (blobFile.current) {
        blobFile.current = null;
      }

      setCropVisible(true);
      setCropFile(file);
      const cropOpening = await croppingSubject.current
        ?.pipe(take(1))
        .toPromise();

      if (!cropOpening) {
        // 关闭了截图弹窗
        if (blobFile.current) {
          blobFile.current.uid = inputFile.uid; // 需要给裁剪后的blob对象设置uid，否则会报错！！！
          file = blobFile.current;
        } else {
          return Upload.LIST_IGNORE;
        }
      }
    }

    const isImageSize = await imgSizeCheck(file, imageSize, fixedSize,useAspectRatio); // 文件尺寸宽高
    const isImageVolume = imageVolumeCheck(file, imageVolume); // 图片大小
    // 上传文件数量判断
    const isFileMaxSize = imageMaxSizeCheck({
      fileList: value || fileListData,
      upFileList: fileList,
      maxNum: singlePreview ? null : totalNum,
    });
    if (isImageSize && isImageVolume && isFileMaxSize) {
      
      return file;
    }
    return false;
  };

  // 图片切换--返回索引及分页变量
  const getCurrentImgIdx = (file: FileListItem) => {
    let currentIndex = 0;
    (value || fileListData)?.some((item, index) => {
      // 获取当前点击图片的索引值
      if (item.uid === file.uid && item.url === file.url) {
        currentIndex = index;
        return true;
      }
      return false;
    });

    return currentIndex;
  };

  // 图片查看事件
  const handlePreview = async (file: FileListItem) => {
    const currentImgIdx = getCurrentImgIdx(file);
    if (!file.url && !file.preview) {
      // eslint-disable-next-line no-param-reassign
      file.preview = await getBase64(file.originFileObj);
    }
    setDefaultImgIndex(currentImgIdx);
    imgViewerRef.current?.show?.(); // 显示预览
  };

  // 样式处理
  const uploadClass = () => {
    let cssName = ``;
    if (hideDelIcon) cssName += `${getPrefixCls('hideDelIcon')} `;
    if (hideViewIcon) cssName += `${getPrefixCls('hideViewIcon')} `;
    return cssName;
  };

  // 上传按钮组件
  const handleUploadImgList = () => {
    const fileData = value || fileListData;
    // 单图模式
    if (!showUploadList && fileData.length === 1) {
      return (
        <div className={getPrefixCls('imgWrap')}>
          <img src={fileData[0]?.url || fileData[0]?.preview} alt="" />
        </div>
      );
    }
    // 限制数量，显示上传组件
    const flag = (fileData?.length || 0) < (totalNum || 9999);
    // {loading ? <LoadingOutlined /> : <PlusOutlined style={{
    //   color: '#8C8D96'
    // }}/>}
    return flag || limitShowBtn ? (
      <div style={{ position: 'relative' }}>
        <PlusOutlined style={{
          color: '#8C8D96'
        }}/>
        <div style={{
          color: 'rgba(0,0,0,0.45)',
          marginTop: '15px',
          lineHeight: '14px'
        }}>{btnTitle}</div>
      </div>
    ) : null;
  };

  // 图片尺寸描述
  const handleImgSizeDesc = () => {
    let descInfo = imageSizeDesc;
    if (descInfo) return descInfo;
    if (imageSize?.length >= 2) {
      descInfo = `${imageSize[0] || ''} * ${imageSize[1] || ''} 像素`;
    }

    if (imageSize?.length === 1) {
      descInfo = `${imageSize[0] || ''} * 像素`;
    }
    return descInfo;
  };

  // 图片大小描述
  const handleImgVolumeDesc = () => {
    const descInfo =
      imgVolumeDesc || `${imageVolume?.fileSize}${imageVolume?.type}以内`;
    return descInfo;
  };

  // 动态改动描述位置
  useEffect(() => {
    if (totalNum !== 1) {
      const handleDesLeft = (fList: UploadValueData) => {
        const clientW =
          document.getElementById(getPrefixCls('containerWrap'))?.clientWidth ||
          0;
        const baseImgWidth = 104; // 图片基础宽度
        const lintMaxNum = Math.round(clientW / baseImgWidth); // 单行最大个数
        const imgAllWidth =
          fList.length >= lintMaxNum ? lintMaxNum : fList.length;
        setDesLeft(imgAllWidth * baseImgWidth);
      };
      handleDesLeft(value || []);
    }
  }, [totalNum, value]);

  return (
    <div
      className={getPrefixCls('containerWrap')}
      id={getPrefixCls('containerWrap')}
      style={{ display: 'flex', ...style }}
    >
      <Upload
        action={newAction} // 上传url
        listType={listType || 'picture-card'}
        accept={accept || 'image/*'} // 文件选择类型
        multiple={multiple} // 是否多选
        fileList={value || fileListData}
        data={getExtraData}
        onChange={onFileChange}
        onPreview={handlePreview} // 查看
        onRemove={onRemoveFn}
        beforeUpload={beforeUpload}
        className={uploadClass()}
        showUploadList={showUploadList}
        disabled={disabled}
        customRequest={customRequest}
        // {...loadProps}
        // onStart={onStart}
        // onSuccess={onSuccess}
        // onError={onError}
        // onProgress={onProgress}
      >
        {children || handleUploadImgList()}
      </Upload>
      {checkCropAllow() && (
        <ImgCropModal
          {...cropOpts}
          visible={cropVisible}
          onCancel={() => {
            setCropVisible(false);
            croppingSubject.current?.next(false);
          }}
          // 裁剪完成
          onSuccess={(f) => {
            // setCropFile(f);
            setCropVisible(false);
            blobFile.current = f;
            croppingSubject.current?.next(false);
          }}
          file={cropFile as File}
        />
      )}

      {/* 提示描述 */}
      {isImageDesc && (
        <ul
          className={getPrefixCls('imgDescUl')}
          style={{ left: 115 + desLeft }}
        >
          {!isEmpty(imageLocationDesc) && <li>{imageLocationDesc}</li>}
          {!isEmpty(imageSizeDesc || imageSize) && (
            <li>图片尺寸: {handleImgSizeDesc()}</li>
          )}
          {!isEmpty(imageType) && <li>图片格式: {imageType?.join('/')}</li>}
          {!isEmpty(imageVolume) && <li>图片大小: {handleImgVolumeDesc()}</li>}
        </ul>
      )}

      {/* 查看图片弹层 */}
      <ImgViewer
        ref={imgViewerRef} // ref对象，暴露显示隐藏预览方法
        fileList={value} // 显示的图片数据
        defaultImgIndex={defaultImgIndex} // 默认显示图的索引
      />
    </div>
  );
};

export default UploadImg;
