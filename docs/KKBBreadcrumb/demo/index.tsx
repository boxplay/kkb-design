import React from 'react'
import { KKBBreadcrumb } from '@base/kkb-design'

const Index = () => {

  const list = [
    {
      id: 0,
      label: '首页',
      path:'/' ,
    },
    {
      id: 1,
      label: '组件',
    },
    {
      id: 3,
      label: '自定义点击事件',
      path: '/kkbBreadcrumb',
      onClick:(item: any) => console.log('自定义点击事件')
    },
    {
      id: 2,
      label: '面包屑',
      path: '/kkbBreadcrumb'
    }
  ]
  return (
    <KKBBreadcrumb list={list}/>
  )
}

export default Index
