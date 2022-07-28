import React, { useState } from 'react';
import { Select } from '@base/kkb-design';
import citys from './city.json';

const Linkage = ({ value, onChange, options }) => {
  const [provienceInfo] = useState(citys);
  const [cityInfo, setCityInfo] = useState([]);
  const [provienceVal, setProvienceVal] = useState('');

  return (
    <div style={{ display: 'flex', width: '100%' }}>
      <div style={{ width: '45%' }}>
        <Select
          placeholder="请选择"
          options={provienceInfo?.map((item) => {
            return {
              label: item.label,
              value: item.value,
            };
          })}
          onChange={(v) => {
            // 根据provienceId映射城市数据
            const city = provienceInfo.reduce((lastRes, item) => {
              const res = lastRes;
              res[item.value] = item.children;
              return res;
            }, {});
            setCityInfo(city[v]);
            setProvienceVal(v);
          }}
        />
      </div>
      <div style={{ width: '45%', marginLeft: '10%' }}>
        <Select
          placeholder="请选择"
          options={cityInfo?.map((item) => {
            return {
              label: item.label,
              value: item.value,
            };
          })}
          defaultValue={undefined}
          onChange={(v) => {
            // 回调
            onChange?.([provienceVal, v]);
          }}
        />
      </div>
    </div>
  );
};

export default Linkage;
