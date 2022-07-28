import React, { useEffect, useState } from 'react';
// import { LeftOutlined, PhoneOutlined, MailOutlined } from '@ant-design/icons';
import './phone.less';

const Phone = (props) => {
  const [content, setContent] = useState(
    `【${props.messageType}】${props.message || ''}${
      props.msgType === 3 ? '回T退订' : ''
    }`,
  );
  const [tigs, setTig] = useState(1);
  useEffect(() => {
    setContent(
      `【${props.messageType || ''}】${props.message || ''}${
        props.msgType === 3 ? '回T退订' : ''
      }`,
    );
  }, [props]);
  useEffect(() => {
    const chartLength = content.length;
    if (chartLength <= 70) {
      setTig(1);
    } else {
      chartLength % 67 === 0
        ? setTig(chartLength / 67)
        : setTig(parseInt(chartLength / 67) + 1);
    }
  }, [content]);
  return (
    <div
      className="phone_box"
      style={{
        width: 300,
        height: 500,
        background:
          'url(https://img.kaikeba.com/84006170801202cysi.png) no-repeat center center',
        backgroundSize: 'cover',
      }}
    >
      <header className="phone_header">
        <div className="center" />
      </header>
      <section className="phone_content_box">
        {/* <div className="phone_content_header">
          <span />
        </div> */}
        <div className="phone_content">{content}</div>
        <div className="content_footer">
          <span>
            当前计费条数 <span style={{ color: 'red' }}>{tigs || 0}</span>{' '}
            条，建议每条短信不超过70字，链接会影响计费字数，请关注
          </span>
        </div>
      </section>
      {/* <footer className="phone_footer">
        <p className="footer_btn" />
      </footer> */}
    </div>
  );
};

export default Phone;
