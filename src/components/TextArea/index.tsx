import React, { useEffect, useCallback } from 'react';
import { Input } from 'antd';
import classnames from 'classnames';
import { getPrefixCls, uuid } from '../../utils';
import './index.less';

interface TextAreaProps {
  maxLength?: number;
  placeholder: string;
  width: number | string;
  height?: number;
  onChange?: (v: string) => void;
  value?: string;
  showCount?: boolean;
  disabled?: boolean;
  onPressEnter?: React.KeyboardEventHandler<HTMLTextAreaElement>;
  showTips?: boolean;
  /** 自定义提示文案 */
  tipsFormatter?: (count: number, maxLength?: number) => string;
  triggerType?: 'onChange' | 'onBlur';
  style?: React.CSSProperties;
  customBottom?: (v: string) => React.ReactElement;
}

// 多行文本框输入组件
const TextArea = (props: TextAreaProps): React.ReactElement => {
  const {
    maxLength,
    placeholder,
    width,
    height,
    onChange,
    value = '',
    showCount,
    disabled,
    customBottom,
    onPressEnter,
    // showTips = true,
    triggerType,
    style,
  } = props;
  const textId = `textArea_${uuid(6)}`;
  // const [textAreaLimit, setTextAreaLimit] = useState<number>(maxLength || 0); // 文字上限
  // const [tipsText, setTipsText] = useState<string>('');

  // 输入事件
  const onChangeTextArea = useCallback(
    ({ target }) => {
      // const v = showTips ? target?.value : target?.value?.substr(0, maxLength);

      // if (showTips) {
      //   const maxCount = maxLength || 0;
      //   const count = maxCount - (v?.length || 0);
      //   setTextAreaLimit(count);
      //   setTipsText(tipsFormatter?.(count, maxCount) || '');
      // }
      onChange?.(target?.value);
    },
    [maxLength, onChange],
  );

  useEffect(() => {
    if (height) {
      document
        .getElementById(textId)
        ?.style.setProperty('--textAreaH', `${height}px`);
    }
  }, [height]);

  // useEffect(() => {
  //   if (showTips) {
  //     const maxCount = maxLength || 0;
  //     const count = maxCount - (value?.length || 0);
  //     setTextAreaLimit(count);
  //     setTipsText(tipsFormatter?.(count, maxCount) || '');
  //   }
  // }, [maxLength, value]);

  // 输入事件处理
  const handleChange = () => {
    if (triggerType === 'onBlur') {
      return {
        onBlur: onChangeTextArea,
      };
    }
    return {
      onChange: onChangeTextArea,
    };
  };

  return (
    <div
      className={classnames(
        getPrefixCls('textAreaWrap'),
        // showTips && !tipsFormatter && getPrefixCls('textArea-tips'),
        // showTips && tipsFormatter && getPrefixCls('textArea-tips-formatter'),
      )}
      // data-num={textAreaLimit}
      // data-tips={tipsText}
      id={textId}
      style={{
        width,
        height,
      }}
    >
      <Input.TextArea
        placeholder={placeholder || '请输入'}
        maxLength={maxLength}
        disabled={disabled}
        className={getPrefixCls('textAreaBox')}
        value={value}
        {...handleChange()}
        onPressEnter={onPressEnter}
        showCount={showCount}
        // showCount={{
        //   formatter: (data) => {
        //     if (tipsFormatter) tipsFormatter(data.count, data.maxLength);
        //     return `${data.count} / ${data.maxLength}`;
        //   },
        // }}
        style={{
          resize: 'none',
          width,
          height,
          ...style,
        }}
      />
      {customBottom ? (
        <div style={{ marginTop: '8px', color: 'rgba(0, 0, 0, 0.45)' }}>
          {typeof customBottom === 'function'
            ? customBottom?.(value)
            : customBottom}
        </div>
      ) : null}
    </div>
  );
};

export default TextArea;
