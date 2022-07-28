import React from 'react';
import { Button } from '@base/kkb-design';
import { createFromIconfontCN } from '@ant-design/icons';

const IconFont = createFromIconfontCN({
  scriptUrl: '//at.alicdn.com/t/font_8d5l8fzk5b87iudi.js',
});
const Box = () => {
  return (
    <Button 
      type='primary'
      icon={<IconFont type="icon-tuichu" />}
      aftericon={<IconFont type="icon-tuichu"/>}
      onClick={()=>{
        console.log('按钮点击事件')
      }}
      style={{
        color: '#000'
      }}
      radius="10px">
        按钮2
      </Button>
  )
}

export default Box
