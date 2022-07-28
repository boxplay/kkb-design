import React, { useEffect, useState } from 'react';
import './phone.less';

const Phone = (props) => {
  const [content, setContent] = useState(props.message);
  const [tigs, setTig] = useState(1);
  useEffect(() => {
    setContent(props.message);
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
    <div className="phone_box">
      <section className="phone_content_box">
        <div className="phone_content">
          <div className="phone_content_detail">{props.message}</div>
        </div>

        <div className="content_footer">
          <span>
            当前计费条数 <span style={{ color: 'red' }}>{tigs || 0}</span>
            条，建议每条短信不超过70字，链接会影响计费字数，请关注
          </span>
        </div>
      </section>
    </div>
  );
};

export default Phone;
