import React from 'react';
import { Menu, SubMenuProps } from 'antd'
import { getPrefixCls } from '../../utils'
import './subItem.less'

export interface newSubMenuprops extends  SubMenuProps {
  inlineCollapsed?: boolean;
  key?: string;
}

const Index = (props:newSubMenuprops) => {

  const {inlineCollapsed, ...rest} = props

  const { SubMenu, Item } = Menu

  return (
    <SubMenu {...rest}  popupClassName={getPrefixCls('menu-submenu-popup-box')} popupOffset={[12, 0]} >
      {inlineCollapsed && <Item key={(props?.key || 'key') + (props.title || 'title')} className={`${getPrefixCls('menu-item-popup-tile')} ${getPrefixCls('menu-item')} ${getPrefixCls('menu-item-only-child')}`}>
        <div className={getPrefixCls('menu-item-popup-tile-content')} >{props.title}</div>
      </Item>}
      {props.children}
    </SubMenu>
  )
}
export default Index
