import React, { useEffect, useRef, useState } from 'react';
import {
  Button,
  Row,
  Col,
  Radio,
  Menu,
  Dropdown
} from 'antd'
import Table, {
  NewTableProps,
} from '../Table';
import { KKBSearch, KKBSearchProps } from '../KKBSearch'
import KKBPagination from '../KKBPagination'
import './index.less'

export interface PaginationProps {
  defaultCurrent?: number | undefined;
  defaultPageSize?: number | undefined;
  total?: number | undefined;
  pageSizeOptions?: Array<string>;
}

export interface buttonProps {
  id: number | string;
  onClick?: () => void;
  label: string;
  options?: any;
  render?: () => React.ReactNode;
}

export interface HandleProps {
  leftArea?: Array<buttonProps>;
  rightArea?: Array<buttonProps>;
}

export interface TableSearchProps extends KKBSearchProps {
  resetPageSize?: boolean;
}

export interface KKBTableProps {
  miniSearch?: boolean; // 是否为单行搜索
  tableProps: NewTableProps;
  searchProps?: TableSearchProps;
  paginationProps?: PaginationProps;
  handleProps?: HandleProps;
  onChange?: (obj: any) => void;
}

const KKBTable = (props: KKBTableProps) => {
  const [current, setCurrent] = useState<number | undefined>(
    props?.paginationProps?.defaultCurrent || 1,
  );
  const [size, setPageSize] = useState<number | undefined>(
    props?.paginationProps?.defaultPageSize || 10,
  );
  const [radioValue, setValue] = useState();
  const [params, setParams] = useState({});
  const firstUpdate = useRef(true);

  useEffect(() => {
    if (!firstUpdate.current) {
      if (props.onChange) {
        props.onChange(params);
      }
    } else {
      firstUpdate.current = false;
    }
  }, [params]);

  const menu = (list: any) => (
    <Menu>
      {list.map((item: any) => {
        if ('render' in item) {
          return item.render && item.render();
        }
        return (
          <Menu.Item
            key={item.id}
            onClick={() => {
              item.onClick();
            }}
            {...item.options}
          >
            <>{item.label}</>
          </Menu.Item>
        );
      })}
    </Menu>
  );

  const buttonArea = (list: Array<buttonProps>) => {
    if (list.length === 0) return <></>;
    if (list.length === 1) {
      if ('render' in list[0]) {
        return list[0].render && list[0].render();
      }
      return (
        <Button
          onClick={() => {
            if (list[0].onClick) list[0].onClick();
          }}
          {...list[0].options}
        >
          {list[0]?.render ? list[0]?.render() : list[0].label}
        </Button>
      );
    }
    const moreList = list.splice(1, list.length);
    return (
      <Dropdown.Button
        overlay={menu(moreList)}
        onClick={() => {
          if (list[0].onClick) list[0]?.onClick();
        }}
        {...list[0].options}
      >
        {list[0]?.render ? list[0]?.render() : list[0].label}
      </Dropdown.Button>
    );
  };

  return (
    <>
      {!props.miniSearch && props.searchProps && (
        <KKBSearch
          style={{ background: '#fff' }}
          {...props.searchProps}
          searchFn={(values) => {
            setCurrent(1);
            props?.searchProps?.searchFn({
              ...params,
              ...values,
              current: 1,
            });
          }}
          searchResetFn={(values) => {
            setCurrent(1);
            if (props.searchProps?.resetPageSize) {
              setPageSize(props.paginationProps?.defaultPageSize || 10);
            }
            props?.searchProps?.searchResetFn({
              ...params,
              ...values,
              current: 1,
            });
          }}
        />
      )}
      {props.handleProps && (
        <Row
          gutter={24}
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            margin: '8px 0 16px',
          }}
        >
          {props.miniSearch ? <Col
            span={16}
            style={{
              display: 'flex',
              alignItems: 'center',
              padding: '0px',
            }}
            key={-1}
          >
            <div style={{width: '100%'}}>
              {
                props.searchProps && <KKBSearch
                  miniSearch={props?.miniSearch}
                  style={{ background: '#fff' }}
                  {...props.searchProps}
                  searchFn={(values) => {
                    setCurrent(1);
                    props?.searchProps?.searchFn({
                      ...params,
                      ...values,
                      current: 1,
                    });
                  }}
                />
              }
            </div>
          </Col> : props?.handleProps?.leftArea &&
          props.handleProps.leftArea.map((item: any) => {
            // 限制操作按钮最多展示4个
            const newOptions = {
              ...item.options,
              options: item?.options?.options.slice(0, 4)
            }
            return (
              <Col
                span={16}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  padding: '0px',
                }}
                key={item.id}
              >
                <Row
                  gutter={24}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    padding: '0px',
                    width: '100%',
                  }}>
                  <Col span={22} style={{ flex: '1 1' }}>
                    <Radio.Group
                      {...newOptions}
                      value={radioValue}
                      onChange={(e) => {
                        setCurrent(1);
                        setValue(e.target.value);
                        params[item.options.name] = e.target.value;
                        setParams({ ...params, current: 1 });
                      }}
                    />
                  </Col>
                </Row>
              </Col>
            );
          })}
          {!!props.handleProps?.rightArea?.length && (
            <Col
              span={props?.miniSearch || props.handleProps?.leftArea?.length ? 8 : 24}
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'flex-end',
                paddingRight: '0px',
              }}
            >
              {props.handleProps?.rightArea?.length >= 2 && (
                <Row>
                  {buttonArea(
                    props.handleProps?.rightArea.splice(
                      1,
                      props.handleProps?.rightArea.length,
                    ),
                  )}
                </Row>
              )}
              {props.handleProps?.rightArea.length >= 1 &&
                [props.handleProps?.rightArea[0]].map((item: buttonProps) => {
                  if ('render' in item) {
                    return (
                      <div style={{ marginLeft: '10px' }}>
                        {item.render && item.render()}
                      </div>
                    );
                  }
                  return (
                    <Button
                      onClick={() => {
                        if (item.onClick) item?.onClick();
                      }}
                      key={item.id}
                      style={{ marginLeft: '10px' }}
                      type="primary"
                      {...item.options}
                    >
                      {item.label}
                    </Button>
                  );
                })}
            </Col>
          )}
        </Row>
      )}
      <Table
        {...props.tableProps}
        onChange={(a, b, c, d) => {
          setCurrent(1);
          props?.tableProps?.onChange?.(a, b, c, d);
        }}
        pagination={false}
      />
      {
        props.paginationProps && (
          <KKBPagination
            {...props.paginationProps}
            showSizeChanger
            current={current}
            pageSize={size}
            onChange={(page, pageSize) => {
              if (pageSize === size) {
                setPageSize(pageSize);
                setCurrent(page);
                setParams({
                  ...params,
                  current: page,
                  pageSize,
                });
              } else {
                setPageSize(pageSize);
                setCurrent(1);
                setParams({
                  ...params,
                  current: 1,
                  pageSize,
                });
              }
            }}
            showQuickJumper
          />
        )
      }
    </>
  );
};

export default KKBTable;
