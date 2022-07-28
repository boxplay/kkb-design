import React, { CSSProperties } from 'react';
import { MenuItemProps, MenuProps, SubMenuProps } from 'antd';
import { SiderProps } from '../KKBLayout';

// 组合MenuItemProps 和 NewSubMenuProps
type MenuItemPropsAndNewSubMenuProps = NewItemProps & NewSubMenuProps;

export interface NewItemProps extends MenuItemProps {
  key: string
}

export interface NewSubMenuProps extends  SubMenuProps {
  inlineCollapsed?: boolean;
  key?: string | undefined
}

export interface NewMenuItemProps extends MenuItemPropsAndNewSubMenuProps {
  children?: NewMenuItemProps[],
}

export interface NewMenuProps extends MenuProps {
  menus: NewMenuItemProps[],
  hasSider?: boolean,
  siderProps?: SiderProps,
  menuStyle?: CSSProperties | undefined,
  topSlot?: React.ReactNode,
  bottomSlot?: React.ReactNode,
  onChangeCollapsed?: (collapsed: boolean) => void
}

export const newAddSiderProperties = ['siderProps', 'onChangeCollapsed']
// 区别于SubMenu的属性
export const menuItemDifferentFromSubMenuProperties = ['danger' ]
// 区别于MenuItem的属性
export const subMenuDifferentMenuItemProperties = ['children', 'popupClassName', 'popupOffset', 'onTitleClick']
// Menu暂时过滤的属性
// TODO: 后期扩展主题时需要删除调
export const MenuTemporaryFilteringProperties = ['theme']
