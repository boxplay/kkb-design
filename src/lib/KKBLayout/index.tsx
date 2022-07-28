import React, { useEffect } from 'react'
import { LayoutProps, Layout } from 'antd'
import { getPrefixCls } from '../../utils'
import './index.less'

const {Header, Sider, Footer, Content} = Layout


export interface HeaderTheme{
  '--header-bg-color'?: string;
  '--header-color-color'?: string;
}
export interface BasicProps extends React.HTMLAttributes<HTMLDivElement> {
  prefixCls?: string;
  hasSider?: boolean;
  kkbTheme?: 'dark' | 'light'
}

export declare type CollapseType = 'clickTrigger' | 'responsive';
export declare type SiderTheme = 'light' | 'dark';

export interface SiderProps extends React.HTMLAttributes<HTMLDivElement> {
    prefixCls?: string;
    collapsible?: boolean;
    collapsed?: boolean;
    defaultCollapsed?: boolean;
    reverseArrow?: boolean;
    onCollapse?: (collapsed: boolean, type: CollapseType) => void;
    zeroWidthTriggerStyle?: React.CSSProperties;
    trigger?: React.ReactNode;
    width?: number | string;
    collapsedWidth?: number | string;
    breakpoint?: 'xs' | 'sm' | 'md' | 'lg' | 'xl' | 'xxl';
    theme?: SiderTheme;
    onBreakpoint?: (broken: boolean) => void;
}

const NewHeader = (props: BasicProps) => {
  useEffect( () => {

    let type: string | undefined;

    if (typeof props.kkbTheme === 'string') {
      type = props.kkbTheme
    } else if (Object.prototype.toString.call(props.kkbTheme) === '[object Object]') {
      type = 'other'
    }

    switch (type) {
      case 'dark':
        document.documentElement.style.setProperty('--header-bg-color', '#42445E')
        break;
      case 'light':
        document.documentElement.style.setProperty('--header-bg-color', '')
        break;
      case 'other':
        Object.entries(props.kkbTheme || {}).forEach(([key, value]) => {
          document.documentElement.style.setProperty(key, value)
        })
        break;
      default:
        break;
    }
    
  }, [props.kkbTheme])
  return (
    <Header 
      {...props}
      className={`${props.className} ${getPrefixCls('layout-kkbheader')}`}>
      {props.children}
    </Header>
  )
}

const NewSider = (props:SiderProps) => {
  return (
    <Sider 
      collapsible 
      collapsedWidth={52}
      width={220}
      theme="light"
      {...props}
      className={`${props.className} ${getPrefixCls('kkb-layout-sider')}`}>
      {props.children}
    </Sider>
  )
}

class Index extends React.Component<LayoutProps, {}> {

  static Header = NewHeader;

  static Sider = NewSider;

  static Footer = Footer;

  static Content = Content;
    
  render() {
    return (
        <Layout {...this.props}>
          {this.props.children}
        </Layout>
    );
  }
}

export default Index;
