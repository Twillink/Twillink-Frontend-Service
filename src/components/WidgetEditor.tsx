'use client';

import React, {useEffect, useRef, useState, useCallback} from 'react';
import WidgetContainer from '@/components/widgets/WidgetContainer';
import ScrollHideHeader from '@/components/widgets/ScrollHideHeader';
import UserProfile from '@/components/widgets/UserProfile';
import SocialContainer from '@/components/widgets/SocialContainer';
import AddWidget from '@/components/widgets/AddWidget';
import PopupWidget from '@/components/PopupWidget';
import PopupWidgetLink from '@/components/PopupWidgetLink';
import PopupWidgetText from '@/components/PopupWidgetText';
import {WidgetTypeEnum} from '@/libs/WidgetTypeEnum';
import {IItemWidgetType} from '@/libs/IItemWidgetType';

interface IWidgetEditor {
  dataWidget: IItemWidgetType[];
  setDataWidget?: React.Dispatch<React.SetStateAction<IItemWidgetType[]>>;
  isEditingDisabled?: boolean;
}

type PopupState = 'none' | 'main' | WidgetTypeEnum;

const WidgetEditor: React.FC<IWidgetEditor> = ({
  dataWidget,
  setDataWidget,
  isEditingDisabled = false,
}) => {
  const [dragId, setDragId] = useState<string | null>(null);
  const [popupState, setPopupState] = useState<PopupState>('none');
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

  const handleAddAction = (action: string) => {
    setPopupState('none');

    switch (action) {
      case WidgetTypeEnum.Link:
        setPopupState(WidgetTypeEnum.Link);
        break;
      case WidgetTypeEnum.Text:
        setPopupState(WidgetTypeEnum.Text);
        break;
      case 'main':
        setPopupState('main');
        break;
      default:
        console.log('Unknown action');
        break;
    }
  };

  const handleClosePopup = () => {
    setPopupState('none');
  };

  const handleBack = () => {
    setPopupState('main');
  };

  const handleAdd = (
    type: WidgetTypeEnum,
    title: string,
    url: string,
    image?: string | ArrayBuffer | null,
  ) => {
    if (setDataWidget) {
      const newWidget: IItemWidgetType = {
        id: `widget-${Date.now()}`,
        order: dataWidget.length + 1,
        width: '100%',
        type,
        url,
        text: title,
        image,
      };

      setDataWidget([...dataWidget, newWidget]);
    }
    handleClosePopup();
  };

  return (
    <>
      <div data-theme="light" className="h-full max-w-[428px]">
        <div
          className="artboard flex flex-col bg-base-100 h-full overflow-y-auto relative"
          ref={scrollContainerRef}
          onDragOver={ev => ev.preventDefault()}>
          <ScrollHideHeader />
          <UserProfile />
          <div className="flex flex-wrap px-6">
            <SocialContainer />
            {dataWidget
              .sort((a, b) => a.order - b.order)
              .map((widget, index) => (
                <WidgetContainer
                  key={`widget-${index}`}
                  values={widget}
                  handleDrag={handleDrag}
                  handleDrop={handleDrop}
                />
              ))}
            <AddWidget onClick={() => setPopupState('main')} />
          </div>
        </div>
      </div>

      <PopupWidget
        isOpen={popupState === 'main'}
        onClose={handleClosePopup}
        onAddAction={handleAddAction}
      />
      <PopupWidgetLink
        isOpen={popupState === 'link'}
        onClose={handleClosePopup}
        onBack={handleBack}
        onAdd={handleAdd}
      />
      <PopupWidgetText
        isOpen={popupState === 'text'}
        onClose={handleClosePopup}
        onBack={handleBack}
        onAdd={handleAdd}
      />
    </>
  );
};

export default WidgetEditor;
