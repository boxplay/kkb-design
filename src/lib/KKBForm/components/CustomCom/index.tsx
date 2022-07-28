import React from 'react';
import { customContentItem } from '../../typeData';
import './index.less';

interface CustomComProps {
  custType: customContentItem;
}

// 组件自定义扩展内容
const CustomCom = ({ custType }: CustomComProps): React.ReactElement => {
  const classStr: string =
    custType?.position === 'right' ? 'custComRight' : 'custComBottom';

  const BtnCom = (
    <div className={classStr}>
      <div
        // className={styles[classStr]}
        dangerouslySetInnerHTML={{
          __html: custType.text || '',
        }}
        {...custType}
      />

      {custType.customform && custType.customform}
    </div>
  );

  return BtnCom;
};

export default CustomCom;
