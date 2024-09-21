'use client';

import React from 'react';

interface WidgetContainerProps {
  boxColor: string;
  boxNumber: string;
  handleDrag: (ev: React.DragEvent<HTMLDivElement>) => void;
  handleDrop: (ev: React.DragEvent<HTMLDivElement>) => void;
  width: string;
}

const WidgetContainer: React.FC<WidgetContainerProps> = ({
  boxColor,
  boxNumber,
  handleDrag,
  handleDrop,
  width,
}) => {
  return (
    <div
      id={boxNumber}
      draggable
      onDragStart={handleDrag}
      onDrop={handleDrop}
      onDragOver={ev => ev.preventDefault()}
      style={{
        width: width,
        height: '100px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        fontWeight: 'bold',
        cursor: 'move',
        padding: 5,
      }}>
      <div
        className="border-base-300 border-2 rounded-2xl"
        style={{
          height: '100%',
          width: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}>
        {boxNumber}
      </div>
    </div>
  );
};

export default WidgetContainer;
