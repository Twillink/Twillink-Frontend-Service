import React from 'react';
import ButtonAddBlock from './ButtonAddBlock';
import SvgWidgetLink from '@/assets/svgComponents/SvgWidgetLink';
import SvgWidgetText from '@/assets/svgComponents/SvgWidgetText';
import SvgWidgetImage from '@/assets/svgComponents/SvgWidgetImage';
import SvgWidgetVideo from '@/assets/svgComponents/SvgWidgetVideo';
import SvgWidgetBlog from '@/assets/svgComponents/SvgWidgetBlog';
import SvgWidgetContact from '@/assets/svgComponents/SvgWidgetContact';
import SvgWidgetCarousel from '@/assets/svgComponents/SvgWidgetCarousel';
import SvgWidgetMap from '@/assets/svgComponents/SvgWidgetMap';
import SvgWidgetWebinar from '@/assets/svgComponents/SvgWidgetWebinar';
import SvgWidgetSchedule from '@/assets/svgComponents/SvgWidgetSchedule';
import PopupContainer from './PopupContainer';
import {WidgetTypeEnum} from '@/libs/types/WidgetTypeEnum';

interface IPopupWidget {
  isOpen: boolean;
  onClose: () => void;
  onAddAction: (action: string) => void;
}

const buttons = [
  {
    title: 'Add Link',
    action: WidgetTypeEnum.Link,
    icon: <SvgWidgetLink className="stroke-general-med" />,
    isComingSoon: false,
    disabled: false,
  },
  {
    title: 'Add Text',
    action: WidgetTypeEnum.Text,
    icon: <SvgWidgetText className="stroke-general-med" />,
    isComingSoon: false,
    disabled: false,
  },
  {
    title: 'Add Image',
    action: WidgetTypeEnum.Image,
    icon: <SvgWidgetImage className="stroke-general-med" />,
    isComingSoon: false,
    disabled: false,
  },
  {
    title: 'Add Video',
    action: WidgetTypeEnum.Video,
    icon: <SvgWidgetVideo className="stroke-general-med" />,
    isComingSoon: false,
    disabled: false,
  },
  {
    title: 'Blog Content',
    action: WidgetTypeEnum.Blog,
    icon: <SvgWidgetBlog className="stroke-general-med" />,
    isComingSoon: false,
    disabled: false,
  },
  {
    title: 'Add Contact',
    action: WidgetTypeEnum.Contact,
    icon: <SvgWidgetContact className="stroke-general-med" />,
    isComingSoon: false,
    disabled: false,
  },
  {
    title: 'Add Carousel',
    action: WidgetTypeEnum.Carousel,
    icon: <SvgWidgetCarousel className="stroke-general-med" />,
    isComingSoon: false,
    disabled: false,
  },
  {
    title: 'Add Map',
    action: WidgetTypeEnum.Map,
    icon: <SvgWidgetMap className="stroke-general-med" />,
    isComingSoon: false,
    disabled: false,
  },
  {
    title: 'Add Webinar',
    action: WidgetTypeEnum.Webinar,
    icon: <SvgWidgetWebinar className="stroke-general-med" />,
    isComingSoon: false,
    disabled: false,
    isPro: true,
  },
  {
    title: 'Add Schedule',
    action: WidgetTypeEnum.Schedule,
    icon: <SvgWidgetSchedule className="stroke-general-med" />,
    isComingSoon: false,
    disabled: false,
    isPro: true,
  },
];

const PopupWidget: React.FC<IPopupWidget> = ({
  isOpen,
  onClose,
  onAddAction,
}) => {
  return (
    <PopupContainer title="Add Block" onClose={onClose} isOpen={isOpen}>
      <div className="bg-contras-med stroke-contras-low rounded-xl p-4">
        <div className="grid grid-cols-2 gap-4">
          {buttons.map((button, index) => (
            <ButtonAddBlock
              key={index}
              icon={button.icon}
              title={button.title}
              isComingSoon={button.isComingSoon}
              isPro={button.isPro}
              disabled={button.disabled}
              onClick={() => {
                if (!button.isComingSoon) {
                  onAddAction(button.action);
                } else {
                  alert('This feature is coming soon!');
                }
              }}
            />
          ))}
        </div>
      </div>
    </PopupContainer>
  );
};

export default PopupWidget;
