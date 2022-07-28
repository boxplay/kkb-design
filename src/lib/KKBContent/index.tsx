import React from 'react'
import './index.less'
import {getPrefixCls} from '../../utils'

interface KKBContentProps {
  children?: React.ReactDOM | string | any;
  style?: React.CSSProperties;
}

const KKBContent = (props: KKBContentProps) => {
  return (
    <div className={getPrefixCls('kkb-content')} style={{...props.style}}>
      <div  className={getPrefixCls('kkb-content-box')}>
        {props.children}
      </div>
    </div>
  )
}

export default KKBContent
