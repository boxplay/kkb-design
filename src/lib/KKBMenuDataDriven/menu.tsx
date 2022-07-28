import React from 'react'
import { Menu } from 'antd'
import SubMenu from './subItem'
import { getPrefixCls, verifyNodeProperties } from '../../utils';
import './index.less'
import {
  menuItemDifferentFromSubMenuProperties, MenuTemporaryFilteringProperties,
  NewMenuItemProps,
  NewMenuProps,
  subMenuDifferentMenuItemProperties,
} from './types';
import { NODE_NAME_SEIZE_A_SEAT, REDUNDANT_ATTRIBUTE } from '../../consts/warningTipText';

const { Item } = Menu;

interface DataDrivenState {}

class DataDrivenMenu extends React.Component<NewMenuProps, DataDrivenState> {
  constructor(props: NewMenuProps) {
    super(props);
    this.state = {
    }
  }

  handleMenu = (props: NewMenuItemProps[]) => {
    const menus: NewMenuItemProps[] = props || []
    return menus.map((child: NewMenuItemProps) => {
      if(child.children && child.children.length) {
        return this.handleSubmenu(child);
      }
      return this.handleItem(child);
    })
  }

  handleSubmenu = (props: NewMenuItemProps) => {
    const children: NewMenuItemProps[] = props.children || []
    const { eventKey, warnKey, ...rest } = props;
    verifyNodeProperties(menuItemDifferentFromSubMenuProperties, rest, REDUNDANT_ATTRIBUTE.replace(NODE_NAME_SEIZE_A_SEAT, 'SubMenu'))
    return (<SubMenu {...rest}>{ this.handleMenu(children) }</SubMenu>)
  }

  handleItem = (props: NewMenuItemProps) =>  {
    const { eventKey, warnKey, inlineCollapsed, ...rest } = props;
    verifyNodeProperties(subMenuDifferentMenuItemProperties, rest, REDUNDANT_ATTRIBUTE.replace(NODE_NAME_SEIZE_A_SEAT, 'Item'))
    return (<Item {...rest}>{props.title}</Item>)
  }

  render() {
    const { menus, topSlot, bottomSlot, style, menuStyle, theme, ...rest } = this.props;
    // 暂时过滤掉theme这个属性，因为当前二次封装时把原组件内部的样式覆盖掉了
    // TODO:  后期扩展Menu时需要扩展theme
    if(theme === "dark") {
      verifyNodeProperties(MenuTemporaryFilteringProperties, this.props, `当前版本KKBMenu组件不支持theme设置主题模式`)
    }
    return (
      <div
        className={getPrefixCls('menu-box')}
        style={{width: 'auto'}}>
        {
          topSlot
        }
        <Menu style={menuStyle} {...rest} inlineIndent={12}>
          {
            this.handleMenu(menus)
          }
        </Menu>
        {
          bottomSlot
        }
      </div>
    );
  }
}

export default DataDrivenMenu;
