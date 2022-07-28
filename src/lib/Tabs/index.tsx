import React from 'react'
import { Tabs, TabsProps } from 'antd'

interface NewTabsProps extends TabsProps {
  commonstyle?: boolean ;
}

const Index = (props: NewTabsProps) => {
  const tabStyle = props.commonstyle ? {paddingLeft: '32px',background: '#fff', margin: '-12px 0 0 0', } : {}
  return (
    <Tabs 
    {...props}
    tabBarStyle={
      {
        ...tabStyle,
        ...props.tabBarStyle
      }
    }>
      {props.children}
    </Tabs>
  )
}
Index.TabPane =  Tabs.TabPane
export default Index
