import React from 'react'
import { Pagination, PaginationProps } from 'antd';
import { getPrefixCls } from '../../utils/index'
import './index.less';


const Index = (props: PaginationProps & { hideTotal ?: boolean | undefined }) => {
  return (
    <div className={getPrefixCls('kkb-pagination')} style={{display: (Number(props.total) === 0) ? 'none' : 'flex'}}>
      {
       !props.hideTotal && <div>共 {props.total || 0} 条记录</div>

      }
      <Pagination
        {...props}
        total={
          Number(props.total)
        }
        />
    </div>
  )
}

export default Index;
