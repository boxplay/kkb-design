// 节点名称占位
export const NODE_NAME_SEIZE_A_SEAT = "NODE_NAME";
// value 值占位
export const VALUE_SEIZE_A_SEAT = "XXXXX";
// 不应该使用 xxxxx 属性时提示
export const SHOULD_NOT_BE_USED = `warning: The ${VALUE_SEIZE_A_SEAT} attribute should not be used, You can try to delete it`;
// 节点不存在时检验属性提示
export const NODE_DOES_NOT_EXIST = `warning: ${VALUE_SEIZE_A_SEAT} attribute should not be used when ${NODE_NAME_SEIZE_A_SEAT} does not exist, You can try to delete it`;
// 多余属性提示
export const REDUNDANT_ATTRIBUTE = `warning: The ${VALUE_SEIZE_A_SEAT} attribute is redundant in the ${NODE_NAME_SEIZE_A_SEAT} node, You can try to delete it`;
