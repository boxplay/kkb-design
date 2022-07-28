import React from 'react'
import { KKBHeader } from '@base/kkb-design'

const Index = () => {
  return (
    <KKBHeader 
      breadcrumbList={[
        {
          label: 'home',
          path: '/'
        },
        {
          label: 'KKBHeader',
          path: '/KKBHeader'
        },
      ]}
      title={'KKBHeader'}
      description={
        'KKBHeader描述'
      }
    />
  )
}

export default Index
