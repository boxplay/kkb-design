import React from 'react';
import { Button } from '@base/kkb-design';

const Box = () => {
  return (
    <div style={{
      width: '600px',
      display: 'flex',
      justifyContent: 'space-around'
    }}>
      <Button 
        type='success'>
        success
      </Button>
      <Button 
        type='warning'>
        warning
      </Button>
      <Button 
        type='denger'>
        denger
      </Button>
    </div>
  )
}

export default Box
