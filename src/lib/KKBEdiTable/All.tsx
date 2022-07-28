import React, { useState, useImperativeHandle, forwardRef} from 'react';
import { Input, InputNumber, DatePicker, Form, Select, Switch } from 'antd';
import Table, { NewTableProps } from '../Table';

export interface EditableCellProps {
  editing: Boolean;
  dataIndex: number;
  title: string;
  record: any;
  index: number;
  children: any;
  ediType: string;
  options: any;
  rowKey: number;
  rules: any[];
}

const EditableCell = (props: EditableCellProps) => {
  const { 
    editing,
    dataIndex,
    title,
    record,
    index,
    children,
    ediType,
    options,
    rowKey,
    rules,
    ...restProps} = props
  let Node = <></>
  switch (ediType) {
    case 'input':
      Node = <Input {...options}/>
      break;
    case 'inputNumber':
      Node = <InputNumber {...options}/>
      break;
    case 'select':
      Node = <Select {...options}/>
      break;
    case 'rangePicker':
      Node = <DatePicker showTime {...options}/>
      break;
    case 'switch':
      Node = <Switch {...options}/>
      break;
    case 'textArea':
      Node = <Input.TextArea {...options}/>
      break;
    default:
      Node = <>{children}</>
      break;
  }
  return (
    <td {...restProps}>
      {(editing && ediType)? (
        <Form.Item
          name={`${dataIndex}-${rowKey}`}
          style={{
            margin: 0,
          }}
          valuePropName={ediType === 'switch' ? 'checked' : 'value'}
          rules={rules}
        >
          {Node}
        </Form.Item>
      ) : (
        children
      )}
    </td>
  );
};

export interface EdiTableProps extends NewTableProps {
  isEditing?: boolean;
}

export interface EdiTableRef {
  onSave: () => void;
  onCancel: () => void;
  onEdit: () => void;
}

const EditableTable = forwardRef<EdiTableRef, EdiTableProps>((props, ref) => {
  const { 
    dataSource = [], 
    columns = [],  } = props
  const [form] = Form.useForm();
  const [isEditing, setisEditing] = useState(false);
  const editAll = () => {
    const newRecord = {}
    for (let i = 0; i < dataSource.length; i += 1) {
      for (let j = 0; j < columns.length; j += 1) {
        if (columns[j]?.dataIndex) {
          newRecord[`${columns[j].dataIndex}-${i}`] = dataSource[i][columns[j].dataIndex as string]
        }
      }
    }
    form.setFieldsValue({
      ...newRecord,
    });
    setisEditing(true);
  };

  const cancel = () => {
    setisEditing(false);
  };

  const save = async () => {
    try {
      const row = await form.validateFields();
      const data: any[] = []
      for (let i = 0; i < dataSource.length; i += 1) {
        let rowData = {}
        // eslint-disable-next-line no-restricted-syntax
        for (const key in row) {
          if ((key.split('-'))[1] === `${i}`) {
            rowData[key.split('-')[0]] = row[key]
          }
        }
        rowData={...dataSource[i], ...rowData}
        data.push(rowData)
      }
      return data
    } catch (errInfo) {
      return {errInfo}
    }
  };

  useImperativeHandle<EdiTableRef, EdiTableRef>(ref, () => ({
      onSave: () => { 
        return save() 
      },
      onCancel: () => { 
        cancel() 
      },
      onEdit: () => { 
        editAll() 
        return true 
      },
  }));

  const mergedColumns = columns.map((col: any, index: number) => {

    if (col?.afterEditRender) {
      return {
        ...col,
        render: ( text: any, record: any, key: number ) => {
          const editable = isEditing;
          return editable ? (
            <div>
              {
                col?.afterEditRender({
                  text,
                  record,
                  rowKey: key,
                })
              }
            </div>
          ) : (
            <>{
              col?.beforeEditRender({
                text,
                record,
                rowKey: key,
              })
            }
            </>
          );
        },
        onCell: (record: any, key: number) => (
          {
          index,
          rowKey: key,
          record, // 行数据
          dataIndex: col.dataIndex,
          title: col.title,
          editing: isEditing,
          ediType: col.ediType,
          options: col.options
        }),
      };
    }
    return {
      ...col,
      onCell: (record: any, key: number) => (
        {
        index,
        record, // 行数据
        rowKey: key,
        dataIndex: col.dataIndex,
        title: col.title,
        editing: isEditing,
        ediType: col.ediType,
        options: col.options,
        rules: col.rules
      }),
    };
  });

  return (
    <Form form={form} component={false}>
      <Table
        {...props}
        components={{
          body: {
            cell: EditableCell,
          },
        }}
        dataSource={dataSource}
        columns={mergedColumns}
      />
    </Form>
  );
});

export default EditableTable

