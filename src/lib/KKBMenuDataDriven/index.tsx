import React from 'react'
import KKBLayout from '../KKBLayout';
import DataDrivenMenu from './menu';
import { newAddSiderProperties, NewMenuProps } from './types';
import { verifyNodeProperties } from '../../utils';
import { NODE_DOES_NOT_EXIST } from '../../consts/warningTipText';

const { Sider } = KKBLayout;

interface StateProps {
  collapsed: boolean
}

class Index extends React.Component<NewMenuProps, StateProps> {
  constructor(props: NewMenuProps) {
    super(props);
    this.state = {
      collapsed: false
    }
  }
  
  changeCollapsed = () => {
    const { collapsed } = this.state;
    const { onChangeCollapsed } = this.props;
    this.setState({
      collapsed: !collapsed
    })
    onChangeCollapsed?.(!collapsed)
  }
  
  /**
   * 校验姓曾属性
   */
  siderVerifyProperties = () => {
    newAddSiderProperties.forEach((value: string) => {
      if(value in this.props) {
        console.error(`warning: ${value} attribute should not be used when sider does not exist`)
      }
    })
  }
  
  render() {
    const { hasSider, siderProps, onChangeCollapsed, ...rest } = this.props;
    const { collapsed } = this.state;
    
    if(hasSider) {
      return (
        <Sider
          style={{ height: '400px' }}
          onCollapse={this.changeCollapsed}
          collapsed={collapsed}
          {...siderProps}
        >
          <DataDrivenMenu {...rest} />
        </Sider>
      );
    }
    // sider 不存在时校验 props 属性中是否有sider所需要的属性
    verifyNodeProperties(
      newAddSiderProperties, 
      this.props, 
      NODE_DOES_NOT_EXIST.replace("NODE_NAME", "sider")
    )
    return <DataDrivenMenu {...rest} />
  }
}

export default Index;
