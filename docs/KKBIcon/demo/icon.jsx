import React from 'react'
import { KKBIcon } from '@base/kkb-design';
import { Button, Card, message } from 'antd';
import copy from 'copy-to-clipboard';
import './index.less'

const IconBox = ({ Component, comName }) => {
  const onclick = () => {
    copy(`<${comName} />`)
    message.success('复制成功')
  }
  return  (
    <Card hoverable={true} style={{ textAlign: 'center', padding: '10px',width: '100px' }}>
      <Component/>
      <Button
        onClick={onclick}
        type='link'
        style={{ fontSize: '12px' ,color: '#2d2d33'}}>复制代码</Button>
    </Card>
  )
}
export default IconBox
