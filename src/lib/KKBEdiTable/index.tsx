import React, {forwardRef} from 'react'
import Row from './Row'
import Cell, { EdiTableRef } from './Cell'

interface TypeProps {
  ediType?: 'rowEdit' | 'cellEdit'
}

const Index = forwardRef<EdiTableRef, TypeProps>(( props, ref) => {
  const {ediType = 'row', ...rest} = props
  const render = () => {
    let Node = <></>
    switch (ediType) {
      case 'cellEdit':
        Node = <Cell {...rest}/>
        break;
      default:
        Node = <Row ref={ref} {...rest}/>
        break;
    }
    return Node
  }
  return (
    <>{render()}</>
  )
})

export default (Index)
