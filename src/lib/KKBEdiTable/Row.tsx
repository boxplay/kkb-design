/* eslint-disable no-restricted-syntax */
import React, { useState, forwardRef, useImperativeHandle, useEffect, useContext } from 'react';
import { Input, InputNumber, DatePicker, Form, Select, Switch  } from 'antd'
import { FormInstance } from 'antd/lib/form';
import Table, { NewTableProps } from '../Table';
import { uuid } from '../../utils';

const EditableContext = React.createContext<FormInstance<any> | null>(null);
export interface EditableCellProps {
  editing: Boolean;
  dataIndex: number;
  title: string;
  record: any;
  index: number;
  children: any;
  ediType: string;
  options: any;
  rules: any[];
  rowKey: number;
}

interface EditableRowRef {
  onSave: () => void;
}
interface EditableRowProps {
  record: any;
}

const EditableRow = forwardRef<EditableRowRef,EditableRowProps>(({ ...props }, ref) => {
  const [form] = Form.useForm();
  const save = () => {
   return form
  }

  useImperativeHandle<EditableRowRef,EditableRowRef>(ref, ()=> ({
    onSave: () => { return save() },
  }))

  return (
    <>
      <Form form={form} component={false}>
        <EditableContext.Provider value={form}>
            <tr {...props} />
        </EditableContext.Provider>
      </Form>
    </>
  );
});

const EditableCell = (props: EditableCellProps) => {
  const { 
    editing, // 是否在编辑状态
    dataIndex,
    title,
    record, 
    index, 
    children,
    rowKey, 
    ediType, // 类型
    options, // 表单item 参数
    rules, // 校验规则
    ...restProps} = props
  const form = useContext(EditableContext)!;
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
  useEffect(()=>{
    if (editing) {
      form.setFieldsValue({
        ...record
      })
    }
  }, [editing])
  return (
    <td {...restProps}>
      {(editing && ediType)? (
        <Form.Item
          name={`${dataIndex}`}
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
  allEdit?: boolean;
  multiple?: boolean;
  rowSave?: (record: any) => boolean;
}

export interface EdiTableRef {
  onDelete?: (record?: any) => void;
  onSave?: (index?: number) => void;
  onCancel?: (index?: number, isDelete?:boolean) => void;
  onEdit?: (record: any, index: number) => void;
  onAdd?: () => void;
  onAllSave?: () => void;
}
interface ResParams {
  data: any;
  editingKey: string | number;
  editType: 'edit' | 'new'
}

const EditableTable = forwardRef<EdiTableRef,EdiTableProps>((props, ref) => {
  const { dataSource, columns = [], rowKey = 'key', multiple = false, rowSave, allEdit } = props
  const [editingKey, setEditingKey] = useState<number|number[]|'all'>(multiple ? [] : -1); // 当前编辑索引
  const [data, setData] = useState(dataSource || []) // 展示的数据
  const [relData, setRelDate] = useState(dataSource || []) // 保存过的数据
  const [nodes] = useState(new Map()) // ref map

  useEffect(()=>{
    console.log(data)
  }, [data])

  // 处理数据 添加自定义key
  const addKey = () => {
     const arr: any[] = []
      dataSource?.map((item: any) => {
        if (typeof rowKey === 'string') {
          arr.push({
            ...item,
            'kkbEdiTableKey': item[rowKey],
          })
        } else {
          arr.push({
            ...item,
            'kkbEdiTableKey': rowKey(item),
          })
        }
        return true
      })
    return arr
  }

  useEffect(()=>{
    setData(addKey())
    setRelDate(addKey())
  }, [dataSource])

  // 缓存数据
  const saveData = async (ndata: any) => {
    const newData = [...ndata]
    data.forEach(async (item, index) => {
      if (Array.isArray(editingKey) && editingKey.includes(item.kkbEdiTableKey) || editingKey === 'all') {
        const itemform = nodes.get(item.kkbEdiTableKey)
        const row = {}
        // eslint-disable-next-line guard-for-in
        for (const key in item) {
          row[key] = itemform.onSave().getFieldValue(key)
        }
        newData.splice(index, 1, {...item, ...row})
        setData(newData)
      }
    })
    setData(newData)
  }

  // 修改事件 record 行数据
  const edit = async (record: any, newData?: any[]) => {
    saveData(newData || data)
    if (allEdit) {
      setEditingKey('all')
    } else if (multiple) {
      setEditingKey([...editingKey as number[], record.kkbEdiTableKey])
    } else {
      setEditingKey(record.kkbEdiTableKey);
    }
  };

  // 取消事件 添加时 取消为重置数据
  const cancel = (record?: any, newRelData?: any[]) => {
    if (allEdit) {
      setEditingKey(-1)
    } else if (multiple) {
      const list = [...editingKey as number[]]
      if (list.indexOf(record.kkbEdiTableKey) > -1) {
        const arr = newRelData || relData
        // 拿到当前行的真实数据
        const hasData = arr.filter(item => item.kkbEdiTableKey === record.kkbEdiTableKey)
        const newData = [...data]
        // 取消后返回编辑前数据状态 ｜ 如果新增未保存过则至空
        newData.forEach(async (item, index) => {
          if (Array.isArray(editingKey) && editingKey.includes(item.kkbEdiTableKey)) {
            if (item.kkbEdiTableKey === record.kkbEdiTableKey) {
              newData.splice(index, 1, hasData[0])
            } else {
              // 取出编辑但未保存的数据
              const itemform = nodes.get(item.kkbEdiTableKey)
              const row = {}
              // eslint-disable-next-line guard-for-in
              for (const key in item) {
                row[key] = itemform.onSave().getFieldValue(key)
              }
              newData[index] = {...newData[index], ...row}
            }
          }
        })
        setData(newData)
        list.splice(list.indexOf(record.kkbEdiTableKey), 1)
        setEditingKey(list)
      } else {
        console.warn(`kkb-design-error: 当前索引未编辑`)
      }
    } else {
      setEditingKey(-1);
    }
  };


  // 保存事件 
  const save = async (record:any) => {
    const form = nodes.get(record.kkbEdiTableKey)
    const row = await form.onSave().validateFields();
    try {
      const res: ResParams = {
        data: {...record, ...row},
        editingKey: -1,
        editType: 'edit'
      }
      // 外部保存成功 promise 
      if (await rowSave?.(res.data)) {
        const newData = [...data]
        if (multiple) {
          const newRelData = [...relData]
          for (let i = 0; i < newData.length; i+=1) {
            if (newData[i].kkbEdiTableKey === record.kkbEdiTableKey) {
              newData[i] = {...res.data}
              newRelData[i] = {...res.data}
            } else {
              const itemform = nodes.get(newData[i].kkbEdiTableKey)
              const nrow = {}
              // eslint-disable-next-line guard-for-in
              for (const key in newData[i]) {
                nrow[key] = itemform.onSave().getFieldValue(key) || newData[i][key]
              }
              newData[i] = {...newData[i], ...nrow}
            }
            if (!newRelData[i]){ // 补充key
              newRelData[i] = {kkbEdiTableKey: newData[i].kkbEdiTableKey}
            }
          }
          setData(newData)
          setRelDate(newRelData)
          cancel(res.data, newData)
        } else {
          for (let i = 0; i <data.length; i+=1) {
            if (newData[i].kkbEdiTableKey === record.kkbEdiTableKey) {
              newData.splice(i, 1 ,res.data)
            }
          }
          setData(newData)
          cancel(res.data, newData)
        }
      }
      return {
        editType: 'true'
      }
    } catch(errInfo) {
      return {
        errInfo,
        editType: 'error'
      }
    }
  };

  // 添加数据事件 position: 首｜尾添加
  const add = async (position?: 'bottom' | 'top') => {
    const nposition = position || 'bottom'
    const item = {
      kkbEdiTableKey: uuid(12),
      kkbEditable: false
    }
    columns.forEach(col => {
      item[col.dataIndex as string] = col?.ediType === 'switch' ? col?.defaultValue || false :  col?.defaultValue
    })
    let newData: any[] = []
    let newRelData: any[] = []
    // 添加自定义key
    if (nposition === 'bottom') {
      newData = [...data, item]
      newRelData = [...relData, item]
    } else if (nposition === 'top') {
      newData = [item, ...data]
      newRelData = [item, ...relData]
    }
    setRelDate(newRelData)
    saveData(newData)
    edit(item, newData)
  }

  // 删除事件
  const onDelete = (record?: any) => {
    const newData = [...data]
    for (let i = 0; i < data.length; i+=1) {
      if (data[i].kkbEdiTableKey === record.kkbEdiTableKey) {
        newData.splice(i, 1)
      }
    }
    setData(newData)
  }

  // 每条校验
  const validateRow = async (item:any) => {
     const itemform = nodes.get(item.kkbEdiTableKey)
     const row = await itemform.onSave().validateFields()
     return row
  }

  const allSave = async () => {
    if (allEdit) {
      const newData = []
      for (let i = 0; i < data.length; i+=1) {
        // eslint-disable-next-line no-await-in-loop
        const row = await validateRow(data[i])
        newData.push({...data[i], ...row})
      }
      return newData
    }  
    return relData
  }

  useImperativeHandle<EdiTableRef,EdiTableRef>(ref, ()=> ({
    onDelete: (record?:any) => { onDelete(record) },
    onCancel: ( record?:any) => {cancel(record)},
    onSave: ( record?:any) => { return save(record)},
    onEdit: ( record: any ) => {edit(record)},
    onAdd: (() => {add()}),
    onAllSave: () => { return allSave() }
  }))

  // 处理columns
  const mergedColumns = columns.map((col: any, index: number) => {
    if (col?.afterEditRender) {
      return {
        ...col,
        render:( text: any, record: any, key: number ) => {
          const editable = Array.isArray(editingKey) ? editingKey.includes(record.kkbEdiTableKey) : (record.kkbEdiTableKey === editingKey || editingKey === 'all');
          return editable ? (
            <div>
              {
                col?.afterEditRender({
                  text,
                  record,
                  rowKey: key,
                  editingKey
                })
              }
            </div>
          ) : (
            <>{
              col?.beforeEditRender({
                text,
                record,
                rowKey: key,
                editingKey
              })
            }
            </>
          );
        },
        onCell: (record: any, key: number) => (
          {
          index,
          record, // 行数据
          dataIndex: col.dataIndex,
          title: col.title,
          editing: Array.isArray(editingKey) ? editingKey.includes(record.kkbEdiTableKey) : (record.kkbEdiTableKey === editingKey || editingKey === 'all'),
          ediType: col.ediType,
          options: col.options,
          rowKey: key,
        }),
      };
    }
    return {
      ...col,
      onCell: (record: any, key: number) => (
        {
        index,
        record, // 行数据
        dataIndex: col.dataIndex,
        title: col.title,
        editing: Array.isArray(editingKey) ? editingKey.includes(record.kkbEdiTableKey) : (record.kkbEdiTableKey === editingKey || editingKey === 'all'),
        ediType: col.ediType,
        options: col.options,
        rules: col.rules,
        rowKey: key,
      }),
    };
  });

  return (
      <Table
        {...props}
        components={{
          body: {
            row: EditableRow,
            cell: EditableCell,
          },
        }}
        onRow={
          (record) => {
            return {
              ref: (c: any) => nodes.set(record.kkbEdiTableKey, c),
            } as React.HTMLAttributes<HTMLElement>
          } 
        }
        rowKey="kkbEdiTableKey"
        dataSource={data}
        columns={mergedColumns}
      />
  );
});

export default EditableTable

