export interface KKBDataType {
  /** 标准普通的input输入框 */
  input: 'input';
  /** 动态添加输入框 */
  dyInputs: 'dyInputs';
  /** 动态添加组件，支持内部组件 */
  dyAddComList: 'dyAddComList';
  /** 单选框 */
  radio: 'radio';
  /** 复选框 */
  checkbox: 'checkbox';
  /** 常规下拉组件 */
  select: 'select';
  /** 搜索下拉组件 */
  searchSelect: 'searchSelect';
  /** 单图片上传 */
  uploadImg: 'uploadImg';
  /** 多图上传 */
  uploadImgMultiple: 'uploadImgMultiple';
  /** 文件上传 */
  uploadFile: 'uploadFile';
  /** 描述多行输入框 */
  textArea: 'textArea';
  /** 自定义组件 */
  custom: 'custom';
  /** 标签类型的select */
  tagsSelect: 'tagsSelect';
  /** 开关 */
  switch: 'switch';
  /** 数字输入框 */
  inputNum: 'inputNum';
  /** 日期 */
  datePicker: 'datePicker';
  /** 双日期 */
  rangePicker: 'rangePicker';
  /** 两列组件 */
  multiExtCom: 'multiExtCom';
  /** 组合输入框 */
  inputGroup: 'inputGroup',
  /** 可操作组件 */
  operate: 'operate',
  /** 预览组件 */
  preview: 'preview',
  /** 操作表单item */
  dyOperateItem: 'dyOperateItem',
  /** 操作某一字段 */
   dyOperateList: 'dyOperateList',
   /** 一个item内多个组件 */
   multiCom: 'multiCom'
}

// 组件类型
export const KKBFORM_TYPE: KKBDataType = {
  input: 'input',
  dyInputs: 'dyInputs',
  radio: 'radio',
  checkbox: 'checkbox',
  select: 'select',
  searchSelect: 'searchSelect',
  uploadImg: 'uploadImg',
  uploadImgMultiple: 'uploadImgMultiple',
  uploadFile: 'uploadFile',
  textArea: 'textArea',
  custom: 'custom',
  tagsSelect: 'tagsSelect',
  switch: 'switch',
  inputNum: 'inputNum',
  datePicker: 'datePicker',
  rangePicker: 'rangePicker',
  dyAddComList: 'dyAddComList',
  multiExtCom: 'multiExtCom',
  inputGroup:'inputGroup',
  operate: 'operate',
  preview: 'preview',
  dyOperateItem: 'dyOperateItem',
  dyOperateList: 'dyOperateList',
  multiCom: 'multiCom'
};
