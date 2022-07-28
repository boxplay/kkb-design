import React, { useEffect, useState } from 'react';
import { KKBMenuDataDriven, KKBLayout } from '@base/kkb-design';
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

const { Sider, Header,Content } = KKBLayout

const menuList = [
  {
    title: "开课吧App",
    key: 'item0',
    icon: <GlobalOutlined/>
  },
  {
    title: '课程',
    inlineCollapsed: false,
    key: 'sub1',
    icon: <CalendarOutlined />,
    children: [
      {
        title: '学情数据',
        key: 'item1'
      },
      {
        title: '课程数据',
        key: 'sub1-1',
        children: [
          {
            key: "item1-1-1",
            title: "认知课完成率"
          }
        ]
      }
    ]
  },
  {
    title: '数据',
    inlineCollapsed: false,
    key: 'sub2',
    icon: <BarChartOutlined />,
    children: [
      {
        title: '学情数据',
        key: 'item2'
      },
      {
        title: '课程统计',
        key: 'item3'
      },
      {
        title: '学情日报',
        key: 'item4'
      },
      {
        title: '课程数据',
        key: 'sub2-1',
        children: [
          {
            key: "item2-1",
            title: "认知课完成率"
          }
        ]
      },
      {
        title: '实时内存',
        key: 'item5'
      },
      {
        title: '考生数据',
        key: 'item6'
      },
    ]
  },
  {
    title: '工具',
    inlineCollapsed: false,
    key: 'tools',
    icon: <SettingOutlined />,
    children: [
      {
        title: '微信',
        key: 'wx'
      },
      {
        title: '微博',
        key: 'weibo'
      },
      {
        title: '营销工具',
        key: 'sub3-1',
        children: [
          {
            key: "item3-1",
            title: "小A平台"
          },
          {
            key: "item3-2",
            title: "营销平台",
            children: [
              {
                key: "item3-3",
                title: "短信平台"
              },
              {
                key: "item3-4",
                title: "钉钉消息"
              }
            ]
          },
        ]
      }
    ]
  },
  {
    title: "商品",
    key: "goods_1",
    icon: <TabletOutlined/>
  },
  {
    title: "客诉",
    key: "customer_service_complaints",
    icon: <CustomerServiceOutlined/>
  }
]

const Index = () => {
  const [menus, setMenus] = useState(menuList)
  
  return (
    <div style={{width: 'auto', height: '800px'}}>
      <Header
          className="header">
        <div className="logo" />
      </Header>
      <KKBLayout>
        <KKBMenuDataDriven
          hasSider
          onChangeCollapsed={(collapsed: boolean) => {
            setMenus(menus.map((item) => {
              item.inlineCollapsed = collapsed
              return item;
            }))
          }}
          siderProps={{}}
          menuStyle={{ width: "100%"}}
          defaultSelectedKeys={['item0']}
          menus={menus}
          topSlot={<div>前缀节点</div>}
          bottomSlot={<div>后缀节点</div>}
          mode='inline'/>
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
      </KKBLayout>
    </div>
  )
}
export default Index
