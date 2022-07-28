import React, { useState, useEffect } from "react";
import { Input, InputProps } from 'antd'

interface OptionsData {
  limiters?: string[]; // 连接符
  defalutLimiters?: string; // 默认连接符
  blocks?: number[]; // 每个模块的长度
  // uppercase?: boolean; // 默认大小写
}

export interface KKBInputProps extends InputProps {
  kkbType?: 'default' | 'tel';
  options?: OptionsData; // 配置项
  valueLimite?: boolean; // 返回数据是否包含连接符 
}

const Index = (props: KKBInputProps) => {
  const { kkbType, options, onChange, valueLimite = false, ...rest } = props
  const [ inputOptions, setInputOptions ] = useState<OptionsData | undefined>(options)
  const [ maxLength, setmaxLength ] = useState<number | undefined>() // 最大长度
  const [ typeIndex, setTypeIndex] = useState<number[]>([]) // 连字符索引数组
  const [ value, setValue] = useState('') 

  // 内部onchange事件
  const inOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value)
  }

  // 判断数组长度及确定连接符索引未知
  const handleBlocks = (arr: number[]) => {
    const list = []
    for(let i = 0; i < arr.length; i += 1) {
      let num = arr[i]
      for (let j = 0; j < i; j += 1) {
        num += arr[j] 
      }
      num += i
      list.push(num)
    }
    setmaxLength(list[list.length-1])
    setTypeIndex(list)
  }

  // 过滤数据
  const valueForrmat = (e: any) => {
    if (inputOptions && (maxLength ? e.target.value.length <= maxLength : true) ) {
      const { defalutLimiters, limiters } = inputOptions
      const { value: newValue} = e.target
      const valueArr = newValue.split('')
      // 非删除字符
      if (e.keyCode !== 8) {
        for (let i = 0; i < valueArr.length; i+=1) {
          if ( typeIndex.includes(i) ) {
            if (limiters) {
              if (valueArr[i] !== limiters[typeIndex.indexOf(i)]) {
                valueArr.splice(i , 0, limiters[typeIndex.indexOf(i)])
              }
            } else if (valueArr[i] !== defalutLimiters) {
               valueArr.splice(i , 0, defalutLimiters)
            }
          }
        }
      }
      // 抛到外部的数据
      const newArr = [...valueArr]
      // 去除连接符处理
      if (!valueLimite) {
        typeIndex.map((item, index) => {
          newArr.splice(item - index, 1)
          return null
        })
      }
      e.target.value = newArr.join('')
      onChange?.(e)
      e.target.value = valueArr.join('')
      inOnChange(e)
    }
  }
  useEffect(()=>{
    switch (kkbType) {
      case 'default': 
        setInputOptions(options);
        break;
      case 'tel':
        setInputOptions({
          defalutLimiters: ' ',
          blocks: [3,4,4],
        });
        break;
      default:
        setInputOptions(options);
        break;
    }
  }, [])

  useEffect(()=>{
    handleBlocks(inputOptions?.blocks || [])
  }, [inputOptions])

  // 连接符索引更改时重新处理数据
  useEffect(()=>{
    if (typeIndex.length) {
       const e = { target: {value: `${props.value}`} };
       valueForrmat(e)
    }
  }, [typeIndex])

  return (
    <Input
        {...rest}
        onKeyUp={(e) => {valueForrmat(e)}}
        value={value}
        maxLength={maxLength}
        onChange={(e) => {
          inOnChange(e)
        }}
      />
  )
}

export default Index
