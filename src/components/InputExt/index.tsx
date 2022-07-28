import React, { useRef, ChangeEventHandler } from 'react';
import { InputProps , Input } from 'antd';

import './index.less';

export interface InputExtOptions extends InputProps {
  extensionType: '';
  onChange: () => void;
}

export interface InputExtProps {
  onChange?: (value?: string) => void;
  value?: string;
  options: InputExtOptions;
  igmpProxy?: object;
  /** form key */
  id?: string;
}

const InputExt = ({
  value,
  onChange,
  options,
}: InputExtProps): React.ReactElement => {
  const isOnComposition = useRef(false);
  const { onChange: _o, ...inputOpts } = options;
  const handleComposition = (evt: any) => {
    if (evt.type === 'compositionend') {
      isOnComposition.current = false;
      // 谷歌浏览器：compositionstart onChange compositionend
      // 火狐浏览器：compositionstart compositionend onChange
      if (navigator.userAgent.indexOf('Chrome') > -1) {
        // eslint-disable-next-line @typescript-eslint/no-use-before-define
        onChangeInput(evt);
      }
      return;
    }

    isOnComposition.current = true;
  };

  const onChangeInput: ChangeEventHandler<HTMLInputElement> = (event) => {
    if (!isOnComposition.current) {
      onChange?.(event.target.value);
    }
  };

  return (
    <Input
      placeholder="请输入"
      {...inputOpts}
      value={value}
      onCompositionStart={handleComposition}
      onCompositionEnd={handleComposition}
      onCompositionUpdate={handleComposition}
      defaultValue={value}
      onChange={onChangeInput}
    />
  );
};

export default InputExt;
