import React, { useEffect, useState } from 'react';
import { KKBInput } from '@base/kkb-design';

const Box = () => {
  const [value, setValue] = useState('202201021204')
  return (
    <KKBInput 
      valueLimite
      options={{
        limiters: ['-','-',' ',':'],
        blocks: [4,2,2,2,2]
      }}
      value={value}
      onChange={(e)=>{
        setValue(e.target.value)
      }}/>
  )
}

export default Box
