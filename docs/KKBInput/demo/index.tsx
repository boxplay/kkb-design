import React, { useEffect, useState } from 'react';
import { KKBInput } from '@base/kkb-design';

const Box = () => {
  const [value, setValue] = useState('17614508663')
  return (
    <KKBInput 
      valueLimite
      kkbType='tel'
      value={value}
      onChange={(e)=>{
        setValue(e.target.value)
      }}/>
  )
}

export default Box
