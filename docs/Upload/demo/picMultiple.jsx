import React, { useEffect, useState } from 'react';
import { KKBUploadImg, KKBConfig } from '@base/kkb-design';
import { getUploadToken } from '@base/kkb-utils'
import { docCookies } from './index'
import zhCN from 'antd/lib/locale/zh_CN';
import { ConfigProvider } from 'antd';

const Index = () => {
  const [token, setToken] = useState();
  const [value, setVlaue] = useState();
  const [imgHost, setimgHost] = useState()
  const [mulValue, setMulValue] = useState();
  const [action, setAction] = useState('https://upload-z1.qiniup.com/')
  const [corgitoken, setCorToken] = useState(docCookies.getItem("corgi-token-prod-data"))
  useEffect(()=>{
    if (docCookies.getItem("corgi-token-prod-data")) {
      setCorToken(docCookies.getItem("corgi-token-prod-data"))
    } else {
      alert('请登录staff获取token')
    }
  }, [])

  useEffect(() => {
    const init = async () => {
      const data = await getUploadToken({
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
      })
      setToken(data?.data?.token)
      setimgHost(data?.data?.domain)
      KKBConfig({
        uploadOpts: {
          imgHost: data?.data?.domain
        }
      })
    }
    init()
  }, []);

  return (
    <ConfigProvider locale={zhCN}>
      <div style={{
        display: 'flex',
        margin: '50px',
        alignItems: 'center'
      }}>
        <KKBUploadImg
          bucketName='kkb-file-web'
          env='prod'
          multiple
          totalNum={6}
          // showUploadList={true}
          value={value}
          action={action}
          imgHost={imgHost}
          onChange={file => {
            setVlaue(file);
          }}
        />
      </div>
    </ConfigProvider>
  );
};

export default Index;
