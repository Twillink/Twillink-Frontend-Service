'use client';

import React, {useEffect, useRef, useState, useCallback} from 'react';

import WidgetContainer from '@/components/widgets/WidgetContainer';
import ScrollHideHeader from '@/components/widgets/ScrollHideHeader';
import UserProfile from '@/components/widgets/UserProfile';

interface Widget {
  id: string;
  order: number;
  color: string;
  width: string;
}

interface WidgetEditorProps {
  dataWidget: Widget[];
  setDataWidget?: React.Dispatch<React.SetStateAction<Widget[]>>;
  isEditingDisabled?: boolean;
}

const WidgetEditor: React.FC<WidgetEditorProps> = ({
  dataWidget,
  setDataWidget,
  isEditingDisabled = false,
}) => {
  const [dragId, setDragId] = useState<string | null>(null);
  const scrollContainerRef = useRef<HTMLDivElement | null>(null);
  const scrollSpeed = 10;

  const handleDrag = (ev: React.DragEvent<HTMLDivElement>) => {
    setDragId(ev.currentTarget.id);
  };

  const handleDrop = (ev: React.DragEvent<HTMLDivElement>) => {
    ev.preventDefault();
    if (!dragId || isEditingDisabled) return;

    const dragWidget = dataWidget.find(widget => widget.id === dragId);
    const dropWidget = dataWidget.find(
      widget => widget.id === ev.currentTarget.id,
    );

    if (dragWidget && dropWidget) {
      const newWidgetState = dataWidget.map(widget => {
        if (widget.id === dragId) {
          return {...widget, order: dropWidget.order};
        }
        if (widget.id === ev.currentTarget.id) {
          return {...widget, order: dragWidget.order};
        }
        return widget;
      });

      if (setDataWidget) {
        setDataWidget(newWidgetState);
      }
    }

    setDragId(null);
  };

  const handleScrollDuringDrag = useCallback(
    (ev: DragEvent) => {
      const container = scrollContainerRef.current;
      if (!container) return;

      const rect = container.getBoundingClientRect();
      const mouseY = ev.clientY;

      if (mouseY - rect.top < 50) {
        container.scrollTop -= scrollSpeed;
      } else if (rect.bottom - mouseY < 50) {
        container.scrollTop += scrollSpeed;
      }
    },
    [scrollSpeed],
  );

  useEffect(() => {
    const container = scrollContainerRef.current;
    if (!container) return;
    container.addEventListener('dragover', handleScrollDuringDrag);

    return () => {
      container.removeEventListener('dragover', handleScrollDuringDrag);
    };
  }, [handleScrollDuringDrag]);

  return (
    <div
      className="artboard flex flex-col bg-base-100 h-full overflow-auto relative"
      ref={scrollContainerRef}
      onDragOver={ev => ev.preventDefault()}>
      <ScrollHideHeader />
      <UserProfile />
      <div className="flex flex-wrap">
        {dataWidget
          .sort((a, b) => a.order - b.order)
          .map(widget => (
            <WidgetContainer
              key={widget.id}
              boxColor={widget.color}
              boxNumber={widget.id}
              handleDrag={handleDrag}
              handleDrop={handleDrop}
              width={widget.width}
              // disabled={isEditingDisabled}
            />
          ))}
      </div>
    </div>
  );
};

export default WidgetEditor;
