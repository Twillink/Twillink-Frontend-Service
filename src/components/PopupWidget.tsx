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

interface IPopupWidget {
  isOpen: boolean;
  onClose: () => void;
  onAddAction: (action: string) => void;
}

const buttons = [
  {
    title: 'Add Link',
    action: 'link',
    icon: <SvgWidgetLink className="stroke-general-med" />,
    isComingSoon: false,
    disabled: false,
  },
  {
    title: 'Add Text',
    action: 'text',
    icon: <SvgWidgetText className="stroke-general-med" />,
    isComingSoon: false,
    disabled: false,
  },
  {
    title: 'Add Image',
    action: 'image',
    icon: <SvgWidgetImage className="stroke-general-med" />,
    isComingSoon: false,
    disabled: false,
  },
  {
    title: 'Add Video',
    action: 'video',
    icon: <SvgWidgetVideo className="stroke-general-med" />,
    isComingSoon: false,
    disabled: false,
  },
  {
    title: 'Blog Content',
    action: 'blog',
    icon: <SvgWidgetBlog className="stroke-general-med" />,
    isComingSoon: true,
    disabled: true,
  },
  {
    title: 'Add Contact',
    action: 'contact',
    icon: <SvgWidgetContact className="stroke-general-med" />,
    isComingSoon: false,
    disabled: false,
  },
  {
    title: 'Add Carousel',
    action: 'carousel',
    icon: <SvgWidgetCarousel className="stroke-general-med" />,
    isComingSoon: false,
    disabled: false,
  },
  {
    title: 'Add Map',
    action: 'map',
    icon: <SvgWidgetMap className="stroke-general-med" />,
    isComingSoon: true,
    disabled: true,
  },
  {
    title: 'Add Webinar',
    action: 'webinar',
    icon: <SvgWidgetWebinar className="stroke-general-med" />,
    isComingSoon: true,
    disabled: true,
  },
  {
    title: 'Add Schedule',
    action: 'schedule',
    icon: <SvgWidgetSchedule className="stroke-general-med" />,
    isComingSoon: true,
    disabled: true,
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
