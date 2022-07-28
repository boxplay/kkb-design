import React from 'react';
import { KKBIcon, Row, Col } from '@base/kkb-design';
import IconBox from './icon';

const { Upload, Loading, CheckboxCircleFill, CloseCircleFill } = KKBIcon

const Box = () => {
  return (
    <Row gutter={[8,8]}>
      {
        Object.keys(KKBIcon).map((key, index) => (
          <Col key={index} >
            <IconBox comName={key} Component={KKBIcon[key]}/>
          </Col>
        ))
      }
    </Row>
  )
}

export default Box
