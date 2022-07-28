import React from 'react';
import { Menu } from 'antd';
import { getPrefixCls } from '../../utils'
import './subItem.less'
import { NewSubMenuProps } from './types';

const Index = (props: NewSubMenuProps) => {
  const { SubMenu, Item } = Menu
  const  { inlineCollapsed, children, ...rest} = props

  return (
    <SubMenu {...rest} popupClassName={getPrefixCls('menu-submenu-popup-box')} popupOffset={[12, 0]} >
      {inlineCollapsed && <Item key={(rest?.key || 'key') + (rest.title || 'title')} className={`${getPrefixCls('menu-item-popup-tile')} ${getPrefixCls('menu-item')} ${getPrefixCls('menu-item-only-child')}`}>
        <div className={getPrefixCls('menu-item-popup-tile-content')} >{rest.title}</div>
      </Item>}
      {children}
    </SubMenu>
  )
}
export default Index
