'use client';

import Box from '@/components/widgets/Box';
import ScrollHideHeader from '@/components/widgets/ScrollHideHeader';
import UserProfile from '@/components/widgets/UserProfile';
import {useState, useRef, useEffect, useCallback} from 'react';

export default function Page() {
  const [dragId, setDragId] = useState<string | null>(null);
  const [boxes, setBoxes] = useState([
    {id: 'Box-1', color: 'red', order: 1, width: '100%'},
    {id: 'Box-2', color: 'green', order: 2, width: '100%'},
    {id: 'Box-3', color: 'blue', order: 3, width: '50%'},
    {id: 'Box-4', color: 'red', order: 4, width: '50%'},
    {id: 'Box-5', color: 'green', order: 5, width: '100%'},
    {id: 'Box-6', color: 'blue', order: 6, width: '100%'},
    {id: 'Box-7', color: 'green', order: 7, width: '100%'},
    {id: 'Box-8', color: 'red', order: 8, width: '100%'},
  ]);

  const scrollContainerRef = useRef<HTMLDivElement | null>(null);
  const scrollSpeed = 10;

  const handleDrag = (ev: React.DragEvent<HTMLDivElement>) => {
    setDragId(ev.currentTarget.id);
  };

  const handleDrop = (ev: React.DragEvent<HTMLDivElement>) => {
    ev.preventDefault();
    if (!dragId) return;

    const dragBox = boxes.find(box => box.id === dragId);
    const dropBox = boxes.find(box => box.id === ev.currentTarget.id);

    if (dragBox && dropBox) {
      const dragBoxOrder = dragBox.order;
      const dropBoxOrder = dropBox.order;

      const newBoxState = boxes.map(box => {
        if (box.id === dragId) {
          return {...box, order: dropBoxOrder};
        }
        if (box.id === ev.currentTarget.id) {
          return {...box, order: dragBoxOrder};
        }
        return box;
      });

      setBoxes(newBoxState);
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
    <div className="flex flex-col items-center justify-center h-[calc(100vh-6.5rem)]">
      <div className="mockup-phone h-full w-80 md:w-96">
        <div className="camera"></div>
        <div className="display h-full">
          <div data-theme="light" className="h-full">
            <div
              className="artboard flex flex-col bg-base-100 h-full overflow-auto relative"
              ref={scrollContainerRef}
              onDragOver={ev => ev.preventDefault()}>
              <ScrollHideHeader />
              <div className="p-4 flex flex-wrap gap-3 pt-8">
                <UserProfile />
                <div className="flex flex-wrap">
                  {boxes
                    .sort((a, b) => a.order - b.order)
                    .map(box => (
                      <Box
                        key={box.id}
                        boxColor={box.color}
                        boxNumber={box.id}
                        handleDrag={handleDrag}
                        handleDrop={handleDrop}
                        width={box.width}
                      />
                    ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
