import React, { useEffect, useState } from 'react';
import { Button } from 'antd'

interface ButtonProps  {
  // 新增success, denger, warning
  type?: "text" | "link" | "ghost" | "default" | "primary" | "dashed" | "success" | "denger" | "warning" | "submit" | "upload" | undefined; // 类型 
  size?: "large" | "middle" | "small" | undefined; // 按钮大小
  block?: boolean; // 将按钮宽度调整为其父宽度的选项	
  href?: string; // 点击跳转的地址，指定此属性 button 的行为和 a 链接一致
  htmlType?: "button" | "submit" | "reset" | undefined; // 设置 button 原生的 type 值
  shape?: "circle" | "round" | undefined; // 按钮形状
  target?: string; // 相当于 a 链接的 target 属性，href 存在时生效
  loading?: boolean | { delay?: number } | undefined; // loading
  disabled?: boolean | undefined; // 按钮失效状态
  danger?: boolean | undefined; // 危险按钮
  ghost?: boolean | undefined; // 幽灵属性，使按钮背景透明
  icon?: React.ReactDOM | Element | any; // icon
  onClick?: () => void; // 回调
  children?: React.ReactDOM | string | any;
  // 新增
  aftericon?: React.ReactDOM | Element; // 尾部icon
  // content: React.ReactDOM | string; // 内容
  radius?: string | undefined; // 圆角
  style?: any; // 样式
}

const Index = (props: ButtonProps) => {
  const [typeBg, setTypeBg] = useState({}); // 新类型颜色
  const [type, setType] = useState<"text" | "link" | "ghost" | "default" | "primary" | "dashed" | undefined>(); // 类型
  const [radiusStyle, setRaduisStyle] = useState({}); // 圆角样式
  // 新增类型定义颜色
  useEffect(() => {
    // success
    if (props.type === 'success') {
      setTypeBg({
        background: '#67c23a',
        color: '#fff',
        border: '#67c23a'
      })
    } 
    // denger
    else if (props.type === 'denger') {
      setTypeBg({
        background: '#f56c6c',
        color: '#fff',
        border: '#f56c6c'
      })
    } 
    // warning
    else if (props.type === 'warning') {
      setTypeBg({
        background: '#e6a23c',
        color: '#fff',
        border: '#e6a23c'
      })
    } 
    // submit
    else if (props.type === 'submit') {
      setType('primary')
    }
    // upload
    else if (props.type === 'upload') {
      setType('primary')
    }
    else {
      setType(props.type)
    }
  }, [props.type]);
  // 自定义圆角样式
  useEffect(()=>{
    if (props.radius) {
      setRaduisStyle({
        borderRadius: props.radius
      })
    }
  }, [props.radius])
  return (
    <Button
      {...props}
      type={type}
      style={{
        ...typeBg,
        ...radiusStyle,
        ...props.style
      }}
    >
      {props.children}
      {props.aftericon || ''}
    </Button>
  )
}

export default Index
