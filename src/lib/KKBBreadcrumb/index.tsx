import React from 'react'
import { Breadcrumb } from 'antd'
import { Link } from 'react-router-dom';

export interface BreadcrumbProps {
  list: Array<any>;
  style?: React.CSSProperties;
}

export interface listProps {
  label: string;
  path?: string | undefined;
}

const { Item } = Breadcrumb

const Index = (props: BreadcrumbProps) => {
  return (
    <Breadcrumb style={{...props.style}}>
    {
      props.list.map((item: any) => {
        return (
          <Item key={item.label}>
          {
            // eslint-disable-next-line no-nested-ternary
              item.path ? (
                  item.onClick ? (
                    <a
                      onClick={() => item.onClick(item)} 
                      style={{
                        cursor: 'pointer'
                      }}>{item.label}</a>
                  ) : (
                    <Link
                      to={{
                        pathname: item.path
                      }}
                    >{item.label}
                    </Link>
                  )
              ):
              <span style={{}}>{item.label}</span>
          }
        </Item>
        )
      })
    }
    </Breadcrumb>
  )
}

export default Index
