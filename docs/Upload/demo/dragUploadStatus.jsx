import React, { useEffect, useState } from 'react';
import { KKBUploadFile, KKBConfig, KKBForm, KKBFORM_TYPE } from '@base/kkb-design';
import { getUploadToken } from '@base/kkb-utils';
import {docCookies} from './index'
import { Button } from 'antd';

const { StatusCom } = KKBUploadFile

const Index = () => {
  const [status, setStatus] = useState(null)
  const [mulValue, setMulValue] = useState([]);

  const renderStatusCom = ({uploadNode}) => {
    const com = {
      fail: <StatusCom.Fail title='导入失败4条' desc={<div>可<a href="#">下载错误报告</a>,修改数据后<a>重新上传</a></div>} />,
      success: <StatusCom.Success title='导入完成' desc='成功导入100条，0条失败'/>,
      loading: <StatusCom.Loading tips={['导入中，请稍后...', '导入结果在导入列表中查看']} />,
      start: <StatusCom.Start
        title={mulValue[0]?.name}
        button={uploadNode(<a>重新上传</a>)}
        desc={`${Math.floor(mulValue[0]?.size / 1024)}kb`} />
    }
    return com[status] || null
  }
  
  const boxType = [
    {
      type: KKBFORM_TYPE.uploadFile,
      label: '',
      name: 'uploadFile_file',
      options: {
        bucketName:'kkb-file-web',
        env:'prod',
        btnType: 'dragger', // 拖拽按钮
        value:{mulValue},
        maxCount: 1,
        disabled: status === 'init',
        fileImportStatus: status,
        renderStatusNode: renderStatusCom,
        showUploadList: false,
        accept:'.xls,.xlsx,.doc,.docx',
        onChange: file => {
          console.log(file)
          setMulValue(file);
          setStatus('start')
        }
      },
    },
  ]
  //

  const saveBtn = values => {
    setStatus('loading')
    setTimeout(() => {
      setStatus('success')
    }, 3000)
  };
  
  return (
    <div>
      <div>
        <KKBForm
          boxData={boxType}
          saveFn={saveBtn}
          cancelBtnText={null}/>
      </div>
      <span>样式:</span>
      <div style={{ marginBottom: '10px'}}>
        <KKBUploadFile
          bucketName='kkb-file-web'
          env='prod'
          value={mulValue}
          btnType='dragger'
          disabled
          fileImportStatus='success'
          showUploadList={false}
          accept='.xls,.xlsx,.doc,.docx'
          renderStatusNode={({uploadNode}) => {
            return <StatusCom.Success title='导入完成' desc='成功导入100条，0条失败'/>
          }}
          onChange={file => {
            console.log(file);
            setMulValue(file);
          }}
        />
      </div>
    <div style={{ marginBottom: '10px'}}>
      <KKBUploadFile
        bucketName='kkb-file-web'
        env='prod'
        value={mulValue}
        btnType='dragger'
        disabled
        fileImportStatus='fail'
        showUploadList={false}
        // desc='选择或拖拽文件上传',
        accept='.xls,.xlsx,.doc,.docx'
        renderStatusNode={({uploadNode}) => {
          return <StatusCom.Fail title='导入失败4条' desc={<div style={{ display: 'flex'}}>可<a href="#">下载错误报告</a>,修改数据后{uploadNode(<a style={{ fontSize: '12px', lineHeight: '12px', display: 'block'}}>重新上传</a>)}</div>} />
        }}
        onChange={file => {
          console.log(file);
          setMulValue(file);
        }}
      />
    </div>
    <div>
      <KKBUploadFile
        bucketName='kkb-file-web'
        env='prod'
        value={mulValue}
        btnType='dragger'
        disabled
        fileImportStatus='loading'
        showUploadList={false}
        // desc='选择或拖拽文件上传',
        accept='.xls,.xlsx,.doc,.docx'
        renderStatusNode={() => <StatusCom.Loading tips={['导入中，请稍后...', '导入结果在导入列表中查看']} />}
        onChange={file => {
          console.log(file);
          setMulValue(file);
        }}
      />
    </div>
    </div>
  );
};

export default Index;
