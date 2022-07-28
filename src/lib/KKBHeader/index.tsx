import React from 'react'
import KKBBreadcrumb from '../KKBBreadcrumb'
import { getPrefixCls } from '../../utils'
import './index.less'
import { KKBBreadListProps } from '../..'

export interface KKBHeaderProps {
  breadcrumbList: Array<KKBBreadListProps>;
  title?: string | undefined;
  description?: string | undefined;
  isHaveTabs?: boolean | undefined;
  style?: React.CSSProperties;
}

const KKBHeader = (props: KKBHeaderProps) => {
  return (
    <div className={getPrefixCls('kkb-header')} style={{paddingBottom: props.isHaveTabs ? '4px' : '16px', ...props.style}}>
      <KKBBreadcrumb list={props.breadcrumbList}/>
      <h2 className={getPrefixCls('kkb-header-title')}>{props.title}</h2>
      {props.description && <p className={getPrefixCls('kkb-header-description')}>{props.description}</p>}
    </div>
  )
}

export default KKBHeader
