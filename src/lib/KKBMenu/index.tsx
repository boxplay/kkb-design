import React from 'react'
import { MenuProps, Menu } from 'antd'
import SubMenu from './subItem'
import { getPrefixCls } from '../../utils'
import './index.less'

const { Item } = Menu

export interface CssVars {
  '--menu-bg-color'?: string;
  '--menu-bg-hover-color'?: string;
  '--menu-bg-selected-color'?: string;
  '--menu-font-color'?: string;
  '--menu-font-selected-color'?: string;
  '--submenu-font-selected-color'?: string;
}

interface newMenuPros extends MenuProps {
  kkbTheme?: 'light' | 'dark' | CssVars;
  topSlot?: React.ReactNode;
  bottomSlot?: React.ReactNode;
}
class Index extends React.Component<newMenuPros, {}> {

  state = {}

  static Item = Item;

  static SubMenu = SubMenu;

  static getDerivedStateFromProps(props: newMenuPros) {

    let type: string | undefined;

    if (typeof props.kkbTheme === 'string') {
      type = props.kkbTheme
    } else if (Object.prototype.toString.call(props.kkbTheme) === '[object Object]') {
      type = 'other'
    }

    switch (type) {
      case 'dark':
        document.documentElement.style.setProperty('--menu-bg-color', '#42445E')
        document.documentElement.style.setProperty('--menu-bg-hover-color', '#015DFF')
        document.documentElement.style.setProperty('--menu-bg-selected-color', '#015DFF')
        document.documentElement.style.setProperty('--menu-font-color', 'rgba(255,255,255,0.59)')
        document.documentElement.style.setProperty('--menu-font-selected-color', 'rgba(255,255,255,1)')
        document.documentElement.style.setProperty('--submenu-font-selected-color', 'rgba(255,255,255,1)')
        break;
      case 'light':
        document.documentElement.style.setProperty('--menu-bg-color', '')
        document.documentElement.style.setProperty('--menu-bg-hover-color', '')
        document.documentElement.style.setProperty('--menu-bg-selected-color', '')
        document.documentElement.style.setProperty('--menu-font-color', '')
        document.documentElement.style.setProperty('--menu-font-selected-color', '')
        document.documentElement.style.setProperty('--submenu-font-selected-color', '')
        break;
      case 'other':
        Object.entries(props.kkbTheme || {}).forEach(([key, value]) => {
           document.documentElement.style.setProperty(key, value)
        })
        break
      default:
        document.documentElement.style.setProperty('--menu-bg-color', '')
        document.documentElement.style.setProperty('--menu-bg-hover-color', '')
        document.documentElement.style.setProperty('--menu-bg-selected-color', '')
        document.documentElement.style.setProperty('--menu-font-color', '')
        document.documentElement.style.setProperty('--menu-font-selected-color', '')
        document.documentElement.style.setProperty('--submenu-font-selected-color', '')
        break;
    }
    return null
  }

  render() {
    const {topSlot, bottomSlot,kkbTheme, ...rest} = this.props
    return (
      <div
        className={getPrefixCls('menu-box')}
        style={{width: 'auto'}}>
          {
            topSlot
          }
        <Menu {...rest} inlineIndent={12}>
          {this.props.children}
        </Menu>
          {
            bottomSlot
          }
      </div>
    );
  }
}

export default Index;
