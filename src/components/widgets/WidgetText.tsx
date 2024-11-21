'use client';

import React, {useEffect, useRef} from 'react';

interface IWidgetText {
  text: string;
}

const WidgetText: React.FC<IWidgetText> = ({text}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLParagraphElement>(null);

  useEffect(() => {
    const adjustTextSize = () => {
      const container = containerRef.current;
      const textElement = textRef.current;

      if (!container || !textElement) return;

      const containerWidth = container.offsetWidth;
      const containerHeight = container.offsetHeight;

      // Start with max size
      let fontSize = 14;
      textElement.style.fontSize = `${fontSize}px`;

      // Calculate padding based on container size
      const basePadding = Math.min(containerWidth, containerHeight) * 0.1;
      const minPadding = 8;
      const padding = Math.max(basePadding, minPadding);

      // Adjust size until text fits
      while (
        (textElement.scrollWidth > containerWidth - padding * 2 ||
          textElement.scrollHeight > containerHeight - padding * 2) &&
        fontSize > 4
      ) {
        fontSize -= 0.5;
        textElement.style.fontSize = `${fontSize}px`;
      }

      // If text is too small, increase it up to max 14px
      while (
        textElement.scrollWidth < containerWidth - padding * 2 &&
        textElement.scrollHeight < containerHeight - padding * 2 &&
        fontSize < 14
      ) {
        fontSize += 0.5;
        textElement.style.fontSize = `${fontSize}px`;
      }

      // Apply the padding
      container.style.padding = `${padding}px`;
    };

    adjustTextSize();
    window.addEventListener('resize', adjustTextSize);

    return () => window.removeEventListener('resize', adjustTextSize);
  }, [text]);

  return (
    <div
      ref={containerRef}
      className="border-base-300 bg-primary-content border-2 rounded-2xl h-full w-full flex items-center">
      <p
        ref={textRef}
        className="text-center w-full font-semibold break-words whitespace-pre-wrap">
        {text}
      </p>
    </div>
  );
};

export default WidgetText;
