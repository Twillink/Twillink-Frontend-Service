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
import {WidgetTypeEnum} from '@/libs/types/WidgetTypeEnum';
import {IItemWidgetType} from '@/libs/types/IItemWidgetType';
import {generateUniqueString} from '@/utils/generateUniqueString';
import PopupWidgetImage from '@/components/PopUpWidgetImage';
import PopupWidgetVideo from '@/components/PopupWidgetVideo';

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

    const dragWidget = dataWidget.find(widget => widget.idEditor === dragId);
    const dropWidget = dataWidget.find(
      widget => widget.idEditor === ev.currentTarget.id,
    );

    if (dragWidget && dropWidget) {
      const newWidgetState = dataWidget.map(widget => {
        if (widget.idEditor === dragId) {
          return {...widget, order: dropWidget.order};
        }
        if (widget.idEditor === ev.currentTarget.id) {
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
      case WidgetTypeEnum.Image:
        setPopupState(WidgetTypeEnum.Image);
        break;
      case WidgetTypeEnum.Video:
        setPopupState(WidgetTypeEnum.Video);
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
        id: Math.random(),
        idEditor: generateUniqueString(),
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

  const handleMoveUp = (id: string) => {
    if (!setDataWidget) return;

    setDataWidget(prevWidgets => {
      const index = prevWidgets.findIndex(widget => widget.idEditor === id);
      if (index > 0) {
        const newWidgets = [...prevWidgets];

        const temp = newWidgets[index - 1];
        newWidgets[index - 1] = newWidgets[index];
        newWidgets[index] = temp;

        newWidgets[index - 1].order = index;
        newWidgets[index].order = index + 1;
        return newWidgets;
      }
      return prevWidgets;
    });
  };

  const handleMoveDown = (id: string) => {
    if (!setDataWidget) return;

    setDataWidget(prevWidgets => {
      const index = prevWidgets.findIndex(widget => widget.idEditor === id);
      if (index < prevWidgets.length - 1) {
        const newWidgets = [...prevWidgets];

        const temp = newWidgets[index + 1];
        newWidgets[index + 1] = newWidgets[index];
        newWidgets[index] = temp;

        newWidgets[index + 1].order = index + 2;
        newWidgets[index].order = index + 1;
        return newWidgets;
      }
      return prevWidgets;
    });
  };

  const handleDelete = (id: string) => {
    if (setDataWidget) {
      setDataWidget(prevWidgets =>
        prevWidgets.filter(widget => widget.idEditor !== id),
      );
    }
  };

  const handleResize = (id: string, width: string) => {
    const newWidth = width === '50%' ? '100%' : '50%';
    if (setDataWidget) {
      setDataWidget(prevWidgets =>
        prevWidgets.map(widget =>
          widget.idEditor === id ? {...widget, width: newWidth} : widget,
        ),
      );
    }
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
              .map(widget => (
                <WidgetContainer
                  key={widget.idEditor}
                  values={widget}
                  handleDrag={handleDrag}
                  handleDrop={handleDrop}
                  handleMoveUp={() => handleMoveUp(widget.idEditor)}
                  handleMoveDown={() => handleMoveDown(widget.idEditor)}
                  handleDelete={() => handleDelete(widget.idEditor)}
                  handleResize={() =>
                    handleResize(widget.idEditor, widget.width)
                  }
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
      <PopupWidgetImage
        isOpen={popupState === 'image'}
        onClose={handleClosePopup}
        onBack={handleBack}
        onAdd={handleAdd}
      />

      <PopupWidgetVideo
        isOpen={popupState === 'video'}
        onClose={handleClosePopup}
        onBack={handleBack}
        onAdd={handleAdd}
      />
    </>
  );
};

export default WidgetEditor;
