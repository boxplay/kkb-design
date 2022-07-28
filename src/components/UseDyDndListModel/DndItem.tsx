import React, { useMemo } from 'react';
import { EditOutlined, DeleteOutlined } from '@ant-design/icons';
import {
  Draggable,
  DraggableProvidedDraggableProps,
  DraggableStateSnapshot,
} from 'react-beautiful-dnd';
import { getPrefixCls } from '../../utils';
import './index.less';

interface DndItemProps {
  title: string;
  desc: string;
  onDel: () => void;
  onEdit: () => void;
  id: string;
  index: number;
  disableDrap?: boolean;
}

function DndItem(props: DndItemProps) {
  const { title, desc, onDel, onEdit, id, index, disableDrap } = props;
  const getItemStyle = (
    snapshot: DraggableStateSnapshot,
    draggableProps: DraggableProvidedDraggableProps,
  ): React.CSSProperties => {
    return {
      userSelect: 'none',
      background: snapshot.isDragging ? 'lightgreen' : '',
      ...draggableProps.style,
      opacity: snapshot.isDragging ? 0.5 : 1,
    };
  };

  const connentBox = useMemo(() => {
    return (
      <>
        <div className={getPrefixCls('tit')}>{title}</div>
        <div className={getPrefixCls('desc')}>{desc}</div>
        <div className={getPrefixCls('actionBar')}>
          <span className={getPrefixCls('action')} onClick={() => onEdit()}>
            <EditOutlined />
          </span>
          <span className={getPrefixCls('action')} onClick={() => onDel()}>
            <DeleteOutlined />
          </span>
        </div>
      </>
    );
  }, [title, desc, onEdit, onDel]);
  if (disableDrap) {
    return <div className={getPrefixCls('dydnd-listItem')}>{connentBox}</div>;
  }
  return (
    <Draggable draggableId={id} index={index}>
      {(provided, snapshot) => (
        <div
          className={getPrefixCls('dydnd-listItem')}
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          style={getItemStyle(snapshot, provided.draggableProps)}
        >
          {connentBox}
        </div>
      )}
    </Draggable>
  );
}
export default DndItem;
