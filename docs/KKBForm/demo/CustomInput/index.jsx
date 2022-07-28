import React from 'react';

/**
 * 自定义内置组件，
 * props.value 这是form实时返回的value值
 * props.onChange 这是form更新时触发的函数事件，传入需要更新视图表单的值
 * props.options 接收到的是boxData.options中所有参数
 * props.data 接收到的是boxData.data中所有参数
 * props.formRef 组件form的完整实例，可以设置表单、验证表单方法！同antd form
 * props.type 当前组件type名称
 * props.name 当前组件form的key值
 * props.label 当前组件左侧label名称
 */
const CustomInput = ({
  // value,
  // onChange,
  // options,
  // data,
  // formRef,
  // type,
  // name,
  // label,
  ...props
}) => {
  console.log('props', props);
  const onChangeInput = (e) => {
    // onChange?.(e.target.value); // 传给form组件同步
  };
  return (
    <div>
      <input
        onChange={onChangeInput}
        // 因为原生input组件属于非受控组件，所以value是需要绑定的！使用其它组件记的绑定value
        // value={value}
      />
    </div>
  );
};

export default CustomInput;
