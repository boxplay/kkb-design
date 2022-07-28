import React from 'react';
import { KKBPagination, Card, ConfigProvider } from '@base/kkb-design';
import zhCN from 'antd/lib/locale/zh_CN';

const Index = () => {
  return (
    <div>
      <ConfigProvider locale={zhCN}>
        <h3>常规版</h3>
          <KKBPagination  total={88} showQuickJumper />
          <br />
        <h3>简约版</h3>
          <KKBPagination total={88} />
          <br />
        <h3>极简版</h3>
          <KKBPagination
            total={88}
            size="small"
            hideTotal={true}
            showSizeChanger={false}
          />
          <br />
        {/* </Card> */}
      </ConfigProvider>
    </div>
  );
};

export default Index;
