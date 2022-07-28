import React, {useState} from 'react'
import { KKBMenu,KKBLayout, Button } from '@base/kkb-design';
import {
  BarChartOutlined,
  CalendarOutlined,
  CustomerServiceOutlined,
  GlobalOutlined,
  TabletOutlined,
  SettingOutlined,
} from '@ant-design/icons';
import 'antd/dist/antd.css';
import 'antd/dist/antd.less';
import './index.less'

const { SubMenu, Item } = KKBMenu;

const { Sider, Header,Content } = KKBLayout

const Index = () => {
  const [collapsed, setcollapsed] = useState(false)
  const [theme, setTheme] = useState(true)

  const changecollapsed = () => {
    setcollapsed(!collapsed)
  }
  return (
   
    <KKBLayout>
      <Sider
        style={{
          boxShadow: '6px 0px 14px 0px #F0F2F5'
        }}
        onCollapse={changecollapsed}
        collapsed={collapsed}>
      <KKBMenu
        style={{width: '100%'}}
        defaultSelectedKeys={['1']}
        kkbTheme={theme ? 'dark' : 'light'}
        topSlot={
          <div style={{
            width: '100%',
            margin: '0 auto'
          }}>
            <Button 
              style={{
                width: '100',
                margin: '0 auto'
              }}
              onClick={()=>{
                setTheme(!theme)
              }}>
              主题
            </Button>
          </div>
        }
        mode='inline'>
        <Item key="1" icon={<GlobalOutlined />}>
          <a>官网&APP官网&APP官网&APP官网&APP官网&APP官网&APP</a>
        </Item>
        <Item key="2" icon={<CalendarOutlined />}>
          课程
        </Item>
        <SubMenu inlineCollapsed={collapsed} key="sub1" icon={<BarChartOutlined />} title="数据">
          <Item key="3"><a>学情数据</a></Item>
          <Item key="4">课程统计</Item>
          <Item key="6">学情日报</Item>
          <SubMenu key="sub1-2" title="课程数据">
            <Item key="5">认知课完成率</Item>
          </SubMenu>
          <Item key="6-1">实时内存</Item>
          <Item key="6-2">考生数据</Item>
        </SubMenu>
        <SubMenu inlineCollapsed={collapsed}  key="sub2" icon={<SettingOutlined />} title="工具">
          <Item key="7"><a>微博</a></Item>
          <Item key="8"><a>微信</a></Item>
          <SubMenu key="sub2-2" title="营销工具">
            <Item key="2-2-2-2">小A平台</Item>
            <SubMenu key="sub2-2-1" title="营销工具">
              <Item key="11"><a>短信平台</a></Item>
              <Item key="12"><a>钉钉消息</a></Item>
            </SubMenu>
          </SubMenu>
          <SubMenu key="sub2-3" title="营销工具">
            <Item key="2-2-2-3"><a>小A平台</a></Item>
            <SubMenu key="sub3-2-1" title="营销工具">
              <Item key="121"><a>短信平台</a></Item>
              <Item key="123"><a>钉钉消息</a></Item>
            </SubMenu>
          </SubMenu>
        </SubMenu>
        <Item key="13" icon={<TabletOutlined />}>商品</Item>
        <Item key="14" icon={<CustomerServiceOutlined />}>客诉</Item>
      </KKBMenu>
      </Sider>
       <div style={{width: '100%', height: '800px'}}>
       <Header
          className="header">
        <div className="logo" />
      </Header>
      <KKBLayout style={{ padding: '0 24px 24px' }}>
        <Content
          className="site-layout-background"
          style={{
            padding: 24,
            margin: 0,
            minHeight: 280,
          }}
        >
          Content
        </Content>
      </KKBLayout>
      </div>
    </KKBLayout>
  )
}
export default Index
