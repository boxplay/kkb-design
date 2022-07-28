import React from 'react';
import { CodeEditorCp, EDITOR_THEME } from '@base/kkb-ui-x';
import styles from './index.module.less';

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
const CodeEdit = ({
  value,
  onChange,
  options,
  data,
  formRef,
  type,
  name,
  label,
}) => {
  const onChangeEditor = (v) => {
    onChange?.(v); // 更新form表单值
  };

  return (
    <CodeEditorCp
      className={`${options?.className} ${styles.codeWrap}`}
      value={value} // 内容
      onChange={onChangeEditor} // 内容改变时触发
      codeTheme={EDITOR_THEME.VisualStudioDark} // 代码主题色
    />
  );
};

export default CodeEdit;
