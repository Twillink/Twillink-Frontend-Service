'use client';

import PopupWidget from '@/components/PopupWidget';
import PopupWidgetContact from '@/components/PopupWidgetContact';
import PopupWidgetImage from '@/components/PopupWidgetImage';
import PopupWidgetLink from '@/components/PopupWidgetLink';
import PopupWidgetText from '@/components/PopupWidgetText';
import PopupWidgetVideo from '@/components/PopupWidgetVideo';
import AddWidget from '@/components/widgets/AddWidget';
import ScrollHideHeader from '@/components/widgets/ScrollHideHeader';
import SocialContainer from '@/components/widgets/SocialContainer';
import UserProfile from '@/components/widgets/UserProfile';
import WidgetContainer from '@/components/widgets/WidgetContainer';
import {IItemWidgetType} from '@/libs/types/IItemWidgetType';
import {WidgetTypeEnum} from '@/libs/types/WidgetTypeEnum';
import {generateUniqueString} from '@/utils/generateUniqueString';
import Loader from './Loader';
import {
  apiAddAttachment,
  apiAddWidgetCarousel,
  apiAddWidgetContact,
  apiAddWidgetImage,
  apiAddWidgetLink,
  apiAddWidgetText,
  apiAddWidgetVideo,
  apiChangeOrderWidget,
  apiChangeWidthWidget,
  apiRemoveWidget,
} from '@/libs/api';
import {useAppDispatch, useAppSelector} from '@/libs/hooks/useReduxHook';
import {setSubmitLoading} from '@/libs/store/features/generalSubmitSlice';
import {
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';
import PopupWidgetSocial from './PopupWidgetSocial';
import PopupWidgetCarousel from './PopupWidgetCarousel';
import mockApiCall from '@/mock/mockApiCall';
import {
  IAddWidgetCarousel,
  IAddWidgetContact,
  IAddWidgetImage,
  IAddWidgetLink,
  IAddWidgetText,
  IAddWidgetVideo,
  IChangeOrderWidgetItem,
  TypeWidthWidgetEnum,
} from '@/libs/types/IAddWidgetData';
import PopupWidgetBlog from '@/components/PopupWidgetBlog';
import {AxiosResponse} from 'axios';
import {
  PreviewContext,
  PreviewTypeEnum,
} from '@/libs/providers/PreviewProvider';
import Button from '@/components/Button';
import SvgSparkle from '@/assets/svgComponents/SvgSparkle';

interface IWidgetEditor {
  isLoading: boolean;
  dataWidget: IItemWidgetType[];
  setDataWidget?: React.Dispatch<React.SetStateAction<IItemWidgetType[]>>;
  fetchData: (withLoading: boolean) => void;
  isEditingDisabled?: boolean;
}

type PopupState = 'none' | 'main' | WidgetTypeEnum;

const WidgetEditor: React.FC<IWidgetEditor> = ({
  isLoading,
  dataWidget,
  setDataWidget,
  fetchData,
  isEditingDisabled = false,
}) => {
  const dispatch = useAppDispatch();
  const isSubmitting = useAppSelector(state => state.generalSubmit.isLoading);

  const [dragId, setDragId] = useState<string | null>(null);
  const [popupState, setPopupState] = useState<PopupState>('none');
  const scrollContainerRef = useRef<HTMLDivElement | null>(null);
  const scrollSpeed = 10;

  const {preview, isMobileScreen} = useContext(PreviewContext);

  const isDesktop = useMemo(
    () => preview === PreviewTypeEnum.DESKTOP && !isMobileScreen,
    [preview, isMobileScreen],
  );

  const handleDrag = (ev: React.DragEvent<HTMLDivElement>) => {
    setDragId(ev.currentTarget.id);
  };

  const handleDrop = async (ev: React.DragEvent<HTMLDivElement>) => {
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

      if (newWidgetState.length > 0) {
        await handleOrderWidget(newWidgetState);
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
      case WidgetTypeEnum.Contact:
        setPopupState(WidgetTypeEnum.Contact);
        break;
      case WidgetTypeEnum.Carousel:
        setPopupState(WidgetTypeEnum.Carousel);
        break;
      case WidgetTypeEnum.Blog:
        setPopupState(WidgetTypeEnum.Blog);
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

  const handleAdd = async (
    type: WidgetTypeEnum,
    value: object,
  ): Promise<boolean> => {
    const newWidget: IItemWidgetType = {
      id: Math.random(),
      idEditor: generateUniqueString(),
      order: dataWidget.length + 1,
      width: '100%',
      type,
      value,
    };
    dispatch(setSubmitLoading(true));

    let apiCall;
    let body = {};
    switch (type) {
      case WidgetTypeEnum.Link:
        body = {
          title: newWidget.value?.title,
          url: newWidget.value?.url,
        };
        apiCall = apiAddWidgetLink(dispatch, body as IAddWidgetLink);
        break;
      case WidgetTypeEnum.Text:
        body = {
          text: newWidget.value?.text as string,
        };
        apiCall = apiAddWidgetText(dispatch, body as IAddWidgetText);
        break;
      case WidgetTypeEnum.Image:
        body = {
          caption: newWidget.value?.caption as string,
          url: newWidget.value?.url as string,
          attachmentId: newWidget.value?.attachmentId,
        };
        apiCall = apiAddWidgetImage(dispatch, body as IAddWidgetImage);
        break;
      case WidgetTypeEnum.Video:
        body = {
          caption: newWidget.value?.caption,
          url: newWidget.value?.url,
          attachmentId: newWidget.value?.attachmentId,
        };
        apiCall = apiAddWidgetVideo(dispatch, body as IAddWidgetVideo);
        break;
      case WidgetTypeEnum.Contact:
        body = {
          email: newWidget.value?.email,
          phoneNumber: newWidget.value?.phoneNumber,
        };
        apiCall = apiAddWidgetContact(dispatch, body as IAddWidgetContact);
        break;
      case WidgetTypeEnum.Carousel:
        const files = newWidget.value?.images ?? [];
        const apiAttachments: Promise<AxiosResponse<any, any>>[] = [];

        for (let i = 0; i < files.length; i++) {
          apiAttachments.push(apiAddAttachment(dispatch, {files: [files[i]]}));
        }

        apiCall = Promise.all(apiAttachments).then(data => {
          body = {
            caption: newWidget.value?.caption,
            attachmentIds: (data ?? []).map((item: any) => item?.data?.id),
          };

          return apiAddWidgetCarousel(dispatch, body as IAddWidgetCarousel);
        });
        break;
      case WidgetTypeEnum.Social:
        apiCall = mockApiCall();
        break;
      default:
        return false;
    }
    return apiCall
      .then(() => {
        fetchData(false);
        return true;
      })
      .catch(() => {
        return false;
      })
      .finally(() => {
        dispatch(setSubmitLoading(false));
        handleClosePopup();
      });
  };

  const handleOrderWidget = async (body: IItemWidgetType[]) => {
    const orderWidget: IChangeOrderWidgetItem[] = body.map(item => ({
      id: item.id,
      sequence: item.order,
    }));

    dispatch(setSubmitLoading(true));
    apiChangeOrderWidget(dispatch, orderWidget)
      .then(() => {
        fetchData(false);
      })
      .catch()
      .finally(() => {
        dispatch(setSubmitLoading(false));
      });
  };

  const handleMoveUp = async (id: string) => {
    if (!setDataWidget) return;

    let newDataWidget: IItemWidgetType[] = [];

    setDataWidget(prevWidgets => {
      const index = prevWidgets.findIndex(widget => widget.idEditor === id);
      if (index > 0) {
        const newWidgets = [...prevWidgets];

        [newWidgets[index - 1], newWidgets[index]] = [
          newWidgets[index],
          newWidgets[index - 1],
        ];

        newDataWidget = newWidgets.map((widget, i) => ({
          ...widget,
          order: i + 1,
        }));

        return newDataWidget;
      }

      return prevWidgets;
    });

    if (newDataWidget.length > 0) {
      await handleOrderWidget(newDataWidget);
    }
  };

  const handleMoveDown = async (id: string) => {
    if (!setDataWidget) return;

    let newDataWidget: IItemWidgetType[] = [];

    setDataWidget(prevWidgets => {
      const index = prevWidgets.findIndex(widget => widget.idEditor === id);
      if (index < prevWidgets.length - 1) {
        const newWidgets = [...prevWidgets];
        [newWidgets[index], newWidgets[index + 1]] = [
          newWidgets[index + 1],
          newWidgets[index],
        ];

        newDataWidget = newWidgets.map((widget, i) => ({
          ...widget,
          order: i + 1,
        }));

        return newDataWidget;
      }
      return prevWidgets;
    });

    if (newDataWidget.length > 0) {
      await handleOrderWidget(newDataWidget);
    }
  };

  const handleDelete = (id: number) => {
    dispatch(setSubmitLoading(true));
    apiRemoveWidget(dispatch, id)
      .then(() => {
        fetchData(false);
      })
      .catch()
      .finally(() => {
        dispatch(setSubmitLoading(false));
      });
  };

  const handleResize = async (id: string, width: string) => {
    const newWidth =
      width === TypeWidthWidgetEnum.Half
        ? TypeWidthWidgetEnum.Full
        : TypeWidthWidgetEnum.Half;

    if (setDataWidget) {
      let widgetId: number | undefined;
      setDataWidget(prevWidgets =>
        prevWidgets.map(widget => {
          if (widget.idEditor === id) {
            widgetId = widget.id;
            return {...widget, width: newWidth};
          }
          return widget;
        }),
      );

      if (widgetId) {
        dispatch(setSubmitLoading(true));
        apiChangeWidthWidget(dispatch, {id: widgetId, width: newWidth})
          .then(() => {
            fetchData(false);
          })
          .catch()
          .finally(() => {
            dispatch(setSubmitLoading(false));
          });
      }
    }
  };

  const [dataWidgetFiltered, dataContact, dataSocial] = useMemo(() => {
    const filtered = [];
    let contact;
    const social = [];
    for (let i = 0; i < dataWidget.length; i++) {
      const item = dataWidget[i];
      if (item.type === WidgetTypeEnum.Contact) {
        contact = item;
      } else if (item.type === WidgetTypeEnum.Social) {
        social.push(item);
      } else {
        filtered.push(item);
      }
    }
    return [filtered, contact, social];
  }, [dataWidget]);

  return (
    <>
      <div
        className={`h-full flex ${isDesktop ? 'gap-4' : ''} scrollbar-thin`}
        style={{
          scrollbarWidth: 'thin',
        }}>
        <div
          className={`artboard flex flex-col ${isDesktop ? ' rounded-[50px] max-w-[200px]' : 'max-w-[428px] gap-6'} bg-primary-content h-full min-w-[300px] overflow-y-auto relative`}
          ref={scrollContainerRef}
          onDragOver={ev => ev.preventDefault()}>
          {isLoading ? (
            <Loader />
          ) : (
            <>
              <ScrollHideHeader />
              <UserProfile contact={dataContact} />
              <div className="flex flex-wrap px-6">
                <SocialContainer
                  onClick={() => setPopupState(WidgetTypeEnum.Social)}
                  data={dataSocial}
                />
                {!isDesktop &&
                  dataWidgetFiltered
                    .sort((a, b) => a.order - b.order)
                    .map(widget => (
                      <WidgetContainer
                        key={widget.idEditor}
                        values={widget}
                        handleDrag={handleDrag}
                        handleDrop={handleDrop}
                        handleMoveUp={() => handleMoveUp(widget.idEditor)}
                        handleMoveDown={() => handleMoveDown(widget.idEditor)}
                        handleDelete={() => handleDelete(widget.id)}
                        handleResize={() =>
                          handleResize(widget.idEditor, widget.width)
                        }
                      />
                    ))}
                {!isDesktop && (
                  <AddWidget onClick={() => setPopupState('main')} />
                )}
              </div>
              {isDesktop && (
                <div>
                  <div
                    className={'absolute left-0 right-0 bottom-2 py-2 z-30 '}>
                    <div className={'px-6 mb-4'}>
                      <Button
                        size={'md'}
                        className={'w-full h-8'}
                        title={'Go Pro'}
                        icon={
                          <SvgSparkle
                            width={20}
                            height={20}
                            className={'stroke-primary-content'}
                          />
                        }
                      />
                    </div>
                    <p className={'text-sm font-medium text-center'}>
                      Powered By Twilink
                    </p>
                  </div>
                </div>
              )}
            </>
          )}
        </div>
        {isDesktop && (
          <div
            className={' flex w-full flex-wrap'}
            style={{rowGap: '0px', columnGap: '0px'}}>
            {dataWidgetFiltered
              .sort((a, b) => a.order - b.order)
              .map(widget => (
                <WidgetContainer
                  key={widget.idEditor}
                  values={widget}
                  handleDrag={handleDrag}
                  handleDrop={handleDrop}
                  handleMoveUp={() => handleMoveUp(widget.idEditor)}
                  handleMoveDown={() => handleMoveDown(widget.idEditor)}
                  handleDelete={() => handleDelete(widget.id)}
                  handleResize={() =>
                    handleResize(widget.idEditor, widget.width)
                  }
                />
              ))}
            {isDesktop && <AddWidget onClick={() => setPopupState('main')} />}
          </div>
        )}
      </div>

      <PopupWidget
        isOpen={popupState === 'main'}
        onClose={handleClosePopup}
        onAddAction={handleAddAction}
      />
      <PopupWidgetLink
        isOpen={popupState === WidgetTypeEnum.Link}
        onClose={handleClosePopup}
        onBack={handleBack}
        onAdd={handleAdd}
        disabled={isSubmitting}
      />
      <PopupWidgetText
        isOpen={popupState === WidgetTypeEnum.Text}
        onClose={handleClosePopup}
        onBack={handleBack}
        onAdd={handleAdd}
        disabled={isSubmitting}
      />
      <PopupWidgetImage
        isOpen={popupState === WidgetTypeEnum.Image}
        onClose={handleClosePopup}
        onBack={handleBack}
        onAdd={handleAdd}
        disabled={isSubmitting}
      />

      <PopupWidgetVideo
        isOpen={popupState === WidgetTypeEnum.Video}
        onClose={handleClosePopup}
        onBack={handleBack}
        onAdd={handleAdd}
        disabled={isSubmitting}
      />

      <PopupWidgetContact
        isOpen={popupState === WidgetTypeEnum.Contact}
        onClose={handleClosePopup}
        onBack={handleBack}
        onAdd={handleAdd}
        disabled={isSubmitting}
        dataContact={dataContact}
      />

      <PopupWidgetCarousel
        isOpen={popupState === WidgetTypeEnum.Carousel}
        onClose={handleClosePopup}
        onBack={handleBack}
        onAdd={handleAdd}
        disabled={isSubmitting}
      />

      <PopupWidgetSocial
        isOpen={popupState === WidgetTypeEnum.Social}
        onClose={handleClosePopup}
        onAdd={handleAdd}
        disabled={isSubmitting}
      />

      <PopupWidgetBlog
        isOpen={popupState === WidgetTypeEnum.Blog}
        onClose={handleClosePopup}
        onBack={handleBack}
        onAdd={handleAdd}
        disabled={isSubmitting}
      />
    </>
  );
};

export default WidgetEditor;
