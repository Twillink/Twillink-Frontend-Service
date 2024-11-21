import React from 'react';
import SvgWidgetDelete from '@/assets/svgComponents/SvgWidgetDelete';

interface IVideoSelectorWithSource
  extends React.InputHTMLAttributes<HTMLInputElement> {
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
  disabled?: boolean;
  video: string | ArrayBuffer | null;
  reset?: boolean;
  name: string;
  label?: string;
  error?: string;
  onReset?: () => void;
  progress?: number;
}

const VideoSelectorWithSource: React.FC<IVideoSelectorWithSource> = ({
  onChange,
  disabled = false,
  name,
  video,
  error,
  label,
  onReset,
  progress,
  ...restProps
}) => {
  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (onChange) {
      onChange(event);
    }
  };

  return (
    <div className="h-[120px] p-[6px] w-full min-w-60 relative">
      {video && onReset && (
        <button
          onClick={onReset}
          className="absolute -top-1 -right-1 p-2 bg-primary rounded-full z-30">
          <SvgWidgetDelete height={16} className="stroke-primary-content" />
        </button>
      )}
      <label htmlFor={name ?? 'video-selector'}>
        <div className="h-full cursor-pointer flex flex-col items-center w-full border-2 border-contras-low rounded-2xl bg-contras-med">
          {video ? (
            <div className="w-full relative h-full">
              <video
                src={video as string}
                controls
                className="rounded-lg w-full h-full"
              />
            </div>
          ) : (
            <div className="h-full flex text-general-med items-center gap-3 font-normal text-base">
              <div>{label ? label : 'Add Video'}</div>
            </div>
          )}
        </div>
      </label>
      <input
        type="file"
        accept=".mp4, .mov, .webm, .ogv, .ogg, video/*"
        onChange={handleFileChange}
        disabled={disabled}
        className="hidden"
        id={name ?? 'video-selector'}
        {...restProps}
      />
      {error ? <span className="text-red-500 text-sm">{error}</span> : null}
      {disabled && progress && (
        <progress
          className="progress progress-primary w-full"
          value={progress}
          max="100"></progress>
      )}
    </div>
  );
};

export default VideoSelectorWithSource;
