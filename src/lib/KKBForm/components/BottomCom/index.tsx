import React from 'react';
import { Row, Button, FormInstance } from 'antd';
import useMyHitory from '../../../../utils/useMyHitory';

interface BottomComProps {
  saveBtnText?: string | null;
  cancelBtnText?: string | null;
  loading: boolean;
  cancelFn?: () => void;
  bottomWrap?: (com: React.ReactElement) => React.ReactElement;
  customBottomBtn?: React.ReactElement | string;
  dyFormRef?: FormInstance<any>;
}

// 底部按钮区域
const BottomCom = ({
  saveBtnText,
  loading,
  customBottomBtn,
  cancelFn,
  cancelBtnText,
  bottomWrap,
  dyFormRef,
}: BottomComProps): React.ReactElement => {
  const [myHistory] = useMyHitory();
  const onSubmitBtn = () => {
    dyFormRef?.submit();
  };

  const onCancelBtn = () => {
    if (cancelFn) {
      cancelFn?.();
      return;
    }
    myHistory.goBack();
  };
  const btnCom = (
    <Row justify="center" style={{ marginTop: 32 }}>
      <div style={{width: 700, display: 'flex', justifyContent: 'flex-end'}}>
      {customBottomBtn || (
        <>
          {cancelBtnText && (
            <Button onClick={onCancelBtn}>
              {cancelBtnText}
            </Button>
          )}
          {saveBtnText && (
            <Button  style={{ marginLeft: 8 }} type="primary" onClick={onSubmitBtn} disabled={loading}>
              {saveBtnText}
            </Button>
          )}
        </>
      )}
      </div>
    </Row>
  );
  if (typeof bottomWrap === 'function') {
    return bottomWrap?.(btnCom);
  }

  return btnCom;
};

export default BottomCom;
