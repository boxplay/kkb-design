import React, { useState, useEffect } from 'react';
import { CheckboxOptionType, CheckboxValueType } from 'antd/lib/checkbox/Group';
import { CheckboxChangeEvent } from 'antd/lib/checkbox';
import { Checkbox } from 'antd';
import { getPrefixCls } from '../../utils';
import './index.less';

interface CheckBoxProps {
  onChange?: (checkedValue: CheckboxValueType[]) => void;
  value?: CheckboxValueType[];
  direction?: 'row' | 'column';
  allBtn?: boolean;
  options: Array<CheckboxOptionType | string>;
}

// 复选框组件
const CheckBox = ({
  onChange,
  options,
  value,
  direction = 'row',
  allBtn = true,
}: CheckBoxProps): React.ReactElement => {
  const [checkedAllData, setCheckedAllData] = useState<CheckboxValueType[]>([]);
  const [checkedList, setCheckedList] = useState<CheckboxValueType[]>([]);
  const [indeterminate, setIndeterminate] = useState(false);
  const [checkAll, setCheckAll] = useState(false);

  const onChangeHendle = (list: CheckboxValueType[]) => {
    setCheckedList(list);
    setIndeterminate(!!list.length && list.length < options.length);
    setCheckAll(list.length === options.length);
    onChange?.(list);
  };

  const onCheckAllChange = (e: CheckboxChangeEvent) => {
    const eList = e.target.checked ? checkedAllData : [];
    setCheckedList(eList);
    setIndeterminate(false);
    setCheckAll(e.target.checked);
    onChange?.(eList);
  };

  useEffect(() => {
    const values: CheckboxValueType[] = [];
    options.forEach((v) => {
      if (typeof v !== 'string') {
        values.push(v?.value);
        return;
      }
      values.push(v);
    });
    setCheckedAllData(values || []);
    if (value) {
      setCheckedList(value);
      setCheckAll(value.length === options.length);
    }
  }, [options, value]);

  return (
    <div className={getPrefixCls('checkBoxWrap')}>
      {allBtn ? (
        <Checkbox
          indeterminate={indeterminate}
          onChange={onCheckAllChange}
          checked={checkAll}
          style={direction === 'row' ? { position: 'absolute' } : {}}
        >
          全选
        </Checkbox>
      ) : null}

      {direction === 'column' && allBtn ? <p> </p> : null}
      <Checkbox.Group
        options={options}
        value={checkedList}
        onChange={onChangeHendle}
        className={
          direction === 'row' && allBtn ? getPrefixCls('checkBox-isColumn') : ''
        }
      />
    </div>
  );
};

export default CheckBox;
