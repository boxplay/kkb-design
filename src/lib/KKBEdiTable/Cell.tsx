import React, { useContext, useState, useRef, useEffect, forwardRef, useImperativeHandle } from 'react';
import { FormInstance } from 'antd/lib/form';
import { Input, InputNumber, DatePicker, Form, Select, Switch } from 'antd'
import Table, { NewTableProps } from '../Table';

const EditableContext = React.createContext<FormInstance<any> | null>(null);

export interface EditableCellProps {
  dataIndex: number;
  title: string;
  record: any;
  index: number;
  children: any;
  ediType: string;
  options: any;
  rules: any[];
  form: any;
  onSave: (props: any) => {}
}

interface EditableRowProps {
  index: number;
}

const EditableRow: React.FC<EditableRowProps> = ({ index, ...props }) => {
  const [form] = Form.useForm();
  return (
    <Form form={form} component={false}>
      <EditableContext.Provider value={form}>
        <tr {...props} />
      </EditableContext.Provider>
    </Form>
  );
};

const EditableCell = (props: EditableCellProps) => {
  const { 
    dataIndex,
    title,
    record,
    index,
    children,
    ediType,
    options,
    rules,
    onSave,
    ...restProps} = props
  const [editing, setEditing] = useState(false);
  const form = useContext(EditableContext)!;
  const inputRef = useRef<Input>(null);
  let Node = <></>
  switch (ediType) {
    case 'input':
      Node = <Input {...options} ref={inputRef}/>
      break;
    case 'inputNumber':
      Node = <InputNumber {...options} ref={inputRef}/>
      break;
    case 'select':
      Node = <Select {...options} ref={inputRef}/>
      break;
    case 'rangePicker':
      Node = <DatePicker showTime {...options} ref={inputRef}/>
      break;
    case 'switch':
      Node = <Switch {...options}  ref={inputRef}/>
      break;
    case 'textArea':
      Node = <Input.TextArea {...options} ref={inputRef}/>
      break;
    default:
      Node = <>{children}</>
      break;
  }

  useEffect(() => {
    if (editing && ediType && inputRef) {
      inputRef?.current?.focus();
    }
  }, [editing])

  const toggleEdit = () => {
    setEditing(!editing);
    form.setFieldsValue({ [dataIndex]: record[dataIndex] });
  };

  const save = async () => {
    try {
      const values = await form.validateFields();
      const res = onSave({data: {...record, ...values}})
      if (res) {
        toggleEdit();
      }
      return null
    } catch (errInfo) {
      return {errInfo}
    }
  };

  return (
    <td {...restProps}>
      {(editing && ediType)? (
        <div onBlur={save}>
          <Form.Item
            name={dataIndex}
            style={{
              margin: 0,
            }}
            valuePropName={ediType === 'switch' ? 'checked' : 'value'}
            rules={rules}
          >
            
            {Node}
          </Form.Item>
        </div>
      ) : (
        <div onClick={()=>{
          toggleEdit()
        }}>
          {children}
        </div>
      )}
    </td>
  );
};

export interface EdiTableProps extends NewTableProps {
  onSave?: (props: any) => Boolean;
}

export interface EdiTableRef {

}

const EditableTable = forwardRef<EdiTableRef, EdiTableProps>((props, ref) => {
  const { dataSource = [], columns = [], onSave = () => {} } = props
  const [form] = Form.useForm();
  const mergedColumns = columns.map((col: any, index: number) => {
    return {
      ...col,
      onCell: (record: any) => (
        {
        index,
        record, // 行数据
        dataIndex: col.dataIndex,
        title: col.title,
        ediType: col.ediType,
        options: col.options,
        rules: col.rules,
        onSave,
        form
      }),
    };
  });
  useImperativeHandle(ref, ()=>({}))
  return (
    <Form form={form} component={false}>
      <Table
        {...props}
        components={{
          body: {
            row: EditableRow,
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

