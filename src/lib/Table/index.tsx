import React, { useEffect, useState } from 'react';
import {  TableProps as AntTableProps,
  TableColumnProps as AntTableColumnProps, Table, Dropdown, Menu, Tooltip, Avatar, Button, Checkbox } from 'antd'
import { DownOutlined, SettingOutlined } from '@ant-design/icons';
import { map, uniqueId } from 'lodash';
import Icons  from '../Icon';
import { getPrefixCls , moneyHandle, dateDiff } from '../../utils';
import './index.less'

export interface NewTableProps extends AntTableProps<any> {
  custom?: boolean;
  columns?: Array<NewTableColumnProps>; // 列设置
}
export interface NewTableColumnProps extends AntTableColumnProps<any> {
  styleType?:
    | 'name'
    | 'text'
    | 'money'
    | 'time'
    | 'avatar'
    | 'action'
    | 'group'
    | undefined; // 类型
  defaultSymbol?: string;
  width?: number;
  defaultAvatar?: string;
  actionList?: Array<actionProps> | ((text?: any) => Array<actionProps>);
  groupMapping?: Array<MappingProps>;
  defaultValue?: any;
  ediType?:'input' | 'radio' |'checkbox' | 'select' | 'searchSelect' | 'uploadImg' | 'uploadFile' | 'textArea' | 'custom' | 'switch' |  'inputNum' | 'datePicker' |  'rangePicker';
  direction?: 'horizontal' | 'vertical';
  checkId?: number;
  defaultVisible?:boolean;
}

interface MappingProps {
  label?: string | undefined;
  value?: string | number | undefined;
  icon?: any;
  color?: string | undefined;
}

interface actionProps {
  id?: number;
  label?: any;
  onClick?: (text: any) => void;
  children?: Array<actionProps>;
}

const Index = (props: NewTableProps) => {
  const [col, setCol] = useState<Array<NewTableColumnProps>>([]);
  const [scrollWidth, setScrollWidth] = useState<undefined | number | string>();
  const [showCustom, setShowCustom] = useState<boolean>(false); // 是否展示自定义列
  const [checkedcustomColumns, setCheckedcustomColumns] = useState<Array<any>>([]); // 自定义列数组
  const [checkedcustomColumnsOrigin, setCheckedcustomColumnsOrigin] = useState<Array<any>>([]); // 自定义列原始数组
  const [checkIndeterminate,setCheckIndeterminate] = useState<boolean>(false); // 半选状态
  const {custom = false, columns = []} = props
  const menu = (list: Array<actionProps>, text: any) => (
    <Menu>
      {list.map((item: any, index: number) => {
        const key: string = item.id ? `${item.id}${index}` : `${index}`;
        return typeof item.label === 'function' ? (
          <Menu.Item key={key}>{item.label(text)}</Menu.Item>
        ) : (
          <Menu.Item
            key={key}
            onClick={() => {
              if (item.onClick) {
                item.onClick(text);
              } else {
                console.warn('请传入点击事件');
              }
            }}
          >
            <>{item.label}</>
          </Menu.Item>
        );
      })}
    </Menu>
  );

  useEffect(()=>{
    if(custom && checkedcustomColumns?.length !== 0 && checkedcustomColumns?.length < checkedcustomColumnsOrigin?.length){
      setCheckIndeterminate(true);
    }else {
      setCheckIndeterminate(false);
    }
  },[checkedcustomColumns]);

  const handleVisibleChange = (flag:boolean) => {
    setShowCustom(flag);
  };

  const renderCustomColumns = () => {
    return(
      <div>
        <Dropdown 
          overlay={customColumns} 
          placement="bottomRight" 
          trigger={['hover']}
          visible={showCustom}
          onVisibleChange={handleVisibleChange}
        >
          <SettingOutlined className='customIcon'/>
        </Dropdown>
      </div>
    )
  }

  const handleCheckedAll = (e:any) => {
    if(e.target.checked){
      setCheckedcustomColumns(checkedcustomColumnsOrigin);
      setCol(columns)
    }else{
      setCheckedcustomColumns([])
      setCol([])
    }
    setCheckIndeterminate(false);
  }
  
  const handleChecked = (e:any, item: any) => {
    if(e.target.checked){
      const arr = [...checkedcustomColumns]
      arr.push(item?.checkId)
      setCheckedcustomColumns(arr)
      const columnArr = [...columns].filter(item => arr.includes(item.checkId))
      setCol(columnArr)
    }else{
      setCheckedcustomColumns([...checkedcustomColumns].filter(i => i !== item?.checkId))
      setCol([...col].filter(i => i?.checkId !== item?.checkId))
    }
  }

  const customColumns = (
    <Menu>
      <div style={{fontSize: 14, color: '#B1B4BE', padding: '5px 10px'}}>请选择列表中要展示的信息</div>
      <Menu.Item >
        <div style={{display: 'flex'}}>
          <Checkbox 
            style={{marginRight: 5}} 
            onChange={handleCheckedAll} 
            checked={checkedcustomColumns?.length === columns?.length}
            indeterminate={checkIndeterminate}
            />
          全部
        </div>
      </Menu.Item>
      {
        columns?.map((item:any) => {
          return(
            <Menu.Item key={uniqueId()}>
              <div style={{display: 'flex'}}>
                <Checkbox 
                  style={{marginRight: 5}} 
                  checked={checkedcustomColumns.includes(item?.checkId)}
                  onChange={(e) => {handleChecked(e, item)}}
                  />
                {typeof item?.title === 'function' ? item['title']() : item?.title}
              </div>
            </Menu.Item>
          )
        })
      }
    </Menu>
  )
  useEffect(() => {
    const checkedArr = []
    const checkedColumns:Array<NewTableColumnProps> = []
    columns?.forEach((item: NewTableColumnProps, index:number) => {
      const newItem = item;
      if(custom){
        newItem.checkId = index;
        newItem.defaultVisible = newItem?.defaultVisible == false ? false : true 
      }
      let actionList: Array<actionProps>;
      switch (item.styleType) {
        case 'name':
          newItem.align = newItem.align || 'left';
          newItem.width = newItem.width || 132;
          newItem.render = newItem.render || ((text: any) => <div>{text}</div>);
          break;
        case 'text': // 文本
          newItem.align = newItem.align || 'left';
          newItem.ellipsis = true;
          newItem.className = 'antd-min-width';
          if (!newItem.render)
            newItem.render = (text: any) => {
              return (
                <div
                  style={{
                    overflow: 'hidden',
                    whiteSpace: 'nowrap',
                    textOverflow: 'ellipsis',
                  }}
                >
                  <Tooltip placement="topLeft" title={text}>
                    {text}
                  </Tooltip>
                </div>
              );
            };
          break;
        case 'money': // 金额
          newItem.align = newItem.align || 'right';
          newItem.render = newItem.render || ((text: any) => {
            return (
              <div>{moneyHandle({num: text, defaultSymbol: newItem?.defaultSymbol})}</div>
            )
          });
          break;
        case 'time': // 时间
          newItem.width = newItem.width || 132;
          if (!newItem.render)
            newItem.render = newItem.render || ((text: any) => {
              if (!text) {
                newItem.align = 'right';
              }
              return (
                <>{
                  text ?   
                  <div>
                    <p style={{ margin: 0, fontSize: '12px' }}>
                      {dateDiff(text)[0]}
                    </p>
                    <p style={{ margin: 0, fontSize: '12px' }}>
                      {dateDiff(text)[1]}
                    </p>
                  </div> : <span style={{textAlign: 'center'}}>{newItem?.defaultSymbol || '-'}</span>
                }</>
              );
            });
          break;
        case 'avatar': // 头像
          newItem.align = newItem.align || 'center';
          newItem.width = newItem.width || 132;
          newItem.render = newItem.render || ((text: any) => (
            <Avatar src={text || newItem.defaultAvatar} />
          ));
          break;
        case 'action': // 操作
          newItem.direction = newItem.direction || 'horizontal'
          newItem.align = newItem.align || 'left';
          newItem.render = newItem.render || ((text: any) => {
            let nActionList: Array<actionProps> = [];
            if (newItem.actionList !== undefined) {
              if (Array.isArray(newItem.actionList)) {
                nActionList = newItem.actionList;
              } else {
                nActionList = newItem.actionList(text);
              }
            }
            actionList = [...new Set(nActionList)];
            if (nActionList && nActionList.length > 3) {
              actionList = [...new Set(nActionList)].slice(0, 2);
              actionList.push({
                id: 0,
                label: '更多',
                children: nActionList.slice(2, nActionList.length),
              });
            }
            return (
              <div
                style={{
                  display: 'flex',
                  justifyContent: 'left', // 根据ui要求，把操作列的内容变为左对齐
                  alignItems:  newItem.direction === 'horizontal' ? 'center' : 'flex-start',
                  flexDirection:  newItem.direction === 'horizontal' ? 'row' : 'column'
                }}
              >
                {actionList.map((actionItem: actionProps) => {
                  return (
                    // eslint-disable-next-line no-nested-ternary
                    actionItem.children && actionItem.children.length ? (
                      <Dropdown
                        key={actionItem.id}
                        overlay={menu(actionItem.children, text)}
                        placement="bottomLeft"
                      >
                        <a>
                          {actionItem.label}
                          <DownOutlined style={{ marginLeft: 7 }}/>
                        </a>
                      </Dropdown>
                    ) : typeof actionItem.label === 'function' ? (
                      <a key={actionItem.id}
                        style={{ paddingRight: 20 }}
                      >
                        {actionItem.label(text)}
                      </a>
                    ) : (
                      <a style={{ paddingRight: 20 }}
                        key={actionItem.id}
                        onClick={() => {
                          if (actionItem.onClick) {
                            actionItem.onClick(text);
                          } else {
                            console.warn('请输入点击事件');
                          }
                        }}
                      >
                        {actionItem.label}
                      </a>
                    )
                  );
                })}
              </div>
            );
          });
          break;
        case 'group': // 组别
          newItem.align = newItem.align || 'left';
          if (!newItem.render)
            newItem.render = (text: any) => {
              let el = text;
              if (newItem.groupMapping) {
                newItem.groupMapping.map((mitem: MappingProps) => {
                  if (mitem.value === text) {
                    el = (
                      <div key={mitem.value}>
                        {mitem.color ? (
                          <span
                            style={{
                              display: 'inline-block',
                              marginRight: '10px',
                              height: '6px',
                              width: '6px',
                              borderRadius: '50%',
                              background: mitem.color,
                            }}
                          />
                        ) : (
                          mitem.icon
                        )}
                        {mitem.label}
                      </div>
                    );
                  }
                  return el;
                });
              }
              return el;
            };
          break;
        default:
          if (!newItem.render) newItem.render = (text: any) => text;
      }
      if(newItem?.defaultVisible){
        checkedArr.push(index)
        checkedColumns.push(newItem)
      } 
      return true;
    });
    if(custom){
      setCol(checkedColumns);
      setCheckedcustomColumns(map(checkedColumns, 'checkId'))
      setCheckedcustomColumnsOrigin(map(columns, 'checkId'))
    }else{
      setCol(columns || [])
    }
    
  }, [columns]);
  useEffect(() => {
    let width = 0;
    for (let i = 0; i < col.length; i += 1) {
      if (col[i]?.styleType === 'text') {
        width += 272;
      }
      width += col[i].width || 0;
    }
    setScrollWidth(width);
  }, [col]);

  // @ts-ignore
  const expandIcon = ({record,expanded,onExpand})=>{
    if(record?.children?.length > 0) {
      if (expanded) {
        return (
          <span onClick={e => { onExpand(record, e)}}>
            <Icons.ReduceBorderedLinear className={getPrefixCls('table-expand-icon')}/>
          </span>
        )
      }
      return (
        <span onClick={e => { onExpand(record, e)}}>
          <Icons.AddBorderedLinear className={getPrefixCls('table-expand-icon')} />
        </span>
      )
    }
    return <span style={{marginRight:8}}/>
  }
 
  if(props.expandable) {
    // eslint-disable-next-line no-param-reassign
    props = {
      ...props,
      expandable: {
        ...props.expandable,
        expandIcon
      }
    }
  }
  return (
    <div>
      <Table
        scroll={{ x: scrollWidth }}
        bordered={false}
        locale={{emptyText: <div style={{margin: '80px 0'}}>
          <img src={'https://img.kaikeba.com/a/450211402202cheo.png'} style={{width: 120, marginBottom: 16}}/>
          <p>暂无数据</p>
          </div>}}
        {...props}
        columns={custom ? [...col, {
          title: () => <div>{renderCustomColumns()}</div>,
          dataIndex: 'set',
          key: 'set',
          width: 51,
          fixed: 'right'
        }] : [...col]}
        pagination={false}
      />
    </div>
    
  );
};

Index.defaultProps = {
  columns: [],
};
export default Index;
