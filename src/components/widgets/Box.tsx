'use client';

import React from 'react';

interface BoxProps {
  boxColor: string;
  boxNumber: string;
  handleDrag: (ev: React.DragEvent<HTMLDivElement>) => void;
  handleDrop: (ev: React.DragEvent<HTMLDivElement>) => void;
  width: string;
}

const Box: React.FC<BoxProps> = ({
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
        color: '#fff',
        fontWeight: 'bold',
        cursor: 'move',
        padding: 5,
      }}>
      <div
        style={{
          backgroundColor: boxColor,
          height: '100%',
          width: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          borderRadius: 5,
        }}>
        {boxNumber}
      </div>
    </div>
  );
};

export default Box;
