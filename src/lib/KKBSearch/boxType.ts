export interface DataType {
  input: 'input';
  inputNumber: 'inputNumber';
  select: 'select';
  searchSelect: 'searchSelect';
  custom: 'custom';
  tagsSelect: 'tagsSelect';
  datePicker: 'datePicker';
  rangePicker: 'rangePicker';
  cascader: 'cascader';
  treeSelect: 'treeSelect';
  radio: 'radio';
  empty: 'empty';
}

// 组件类型
const SEARCH_TYPE: DataType = {
  input: 'input', // 标准普通的input输入框
  inputNumber: 'inputNumber', // 数字输入框
  select: 'select', // 常规下拉组件
  searchSelect: 'searchSelect', // 搜索下拉组件
  custom: 'custom', // 自定义组件
  tagsSelect: 'tagsSelect', // 标签类型的select
  datePicker: 'datePicker', // 日期选择框
  rangePicker: 'rangePicker', // 日期范围选择框
  cascader: 'cascader', // 级联选择
  treeSelect: 'treeSelect', // 树选择
  radio: 'radio', // 单选
  empty: 'empty', // 占位
};

export default SEARCH_TYPE
