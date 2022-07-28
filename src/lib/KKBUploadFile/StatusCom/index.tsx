import React from 'react'
import '../index.less'
import { Button } from 'antd';
import { getPrefixCls } from '../../../utils';
import FileIcon from '../fileType';
import Icons from '../../Icon';

export const Loading = ({ tips }: any) => {
  return (
    <div className={getPrefixCls('upload-status-box')}>
      <div className={`${getPrefixCls('upload-status-icon loading')}`}><Icons.Loading style={{ fontSize: '30px' }}/></div>
      <div className={getPrefixCls('upload-status-center')}>
        <div className={getPrefixCls('upload-status-center')}>
          {
            tips?.map((item: any, index: number) => 
              // eslint-disable-next-line react/no-array-index-key
              (<p key={index} className={getPrefixCls('upload-status-loading-text')}>{item}</p>))
          }
        </div>
      </div>
    </div>
  )
}

export const Success = ({ title, desc }: any) => {
  return (
    <div className={getPrefixCls('upload-status-box')}>
      <div className={`${getPrefixCls('upload-status-icon success')}`}>
        <Icons.CheckboxCircleFill style={{ fontSize: '35px', color: '#52C41A' }}/>
      </div>
      <div className={getPrefixCls('upload-status-center')}>
        <div className={getPrefixCls('upload-status-center')}>
          <h4>{title || ''}</h4>
          <span className={getPrefixCls('upload-status-desc')}>{desc || ''}</span>
        </div>
      </div>
    </div>
  )
}

export const Fail = ({ title, desc }: any) => {
  return (
    <div className={getPrefixCls('upload-status-box')}>
      <div className={`${getPrefixCls('upload-status-icon success')}`}>
        <Icons.CloseCircleFill style={{ fontSize: '35px', color: '#ff6051' }}/>
      </div>
      <div className={getPrefixCls('upload-status-center')}>
        <div className={getPrefixCls('upload-status-center')}>
          <h4>{title || ''}</h4>
          <span className={getPrefixCls('upload-status-desc')}>{desc || ''}</span>
        </div>
      </div>
    </div>
  )
}

export const Start = ({ title, desc, button }: any) => {
  const reg = /(\.\w*)$/g
  const suffix = String(title).match(reg)
  
  return (
    <div className={getPrefixCls('upload-status-box')}>
      <div className={`${getPrefixCls('upload-status-icon done')}`}>
        <FileIcon
          width={18}
          height={20}
          style={{ color: '#fff', fontSize: '20px' }}
          fileSuffix={suffix ? suffix[0] : ''}/>
      </div>
      <div className={getPrefixCls('upload-status-center')}>
        <div className={getPrefixCls('upload-status-center')}>
          <h4>{title || ''}</h4>
          <span className={getPrefixCls('upload-status-desc')}>{desc || ''}</span>
        </div>
      </div>
      {
        button
      }
    </div>
  )
}
  
export default { Loading, Success, Fail, Start }
