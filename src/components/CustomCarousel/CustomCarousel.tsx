import React from 'react';
import {EmblaOptionsType} from 'embla-carousel';
import useEmblaCarousel from 'embla-carousel-react';
import {
  DotButton,
  useDotButton,
} from '@/components/CustomCarousel/CustomCarouselDotButton';

import styles from './CustomCarousel.module.css';

interface ICustomCarousel {
  slides: string[];
}

function CustomCarousel(props: ICustomCarousel) {
  const OPTIONS: EmblaOptionsType = {
    // align: 'center',
    // dragFree: true,
    loop: false,
  };
  const {slides} = props;
  const [emblaRef, emblaApi] = useEmblaCarousel(OPTIONS);

  const {selectedIndex, scrollSnaps, onDotButtonClick} = useDotButton(emblaApi);

  return (
    <section className={styles.embla}>
      <div className={styles.embla__viewport} ref={emblaRef}>
        <div className={styles.embla__container}>
          {slides.map((url, index) => (
            <div className={styles.embla__slide} key={url}>
              <div className={styles.embla__slide__number}>
                <img
                  className={styles['embla__slide__img']}
                  src={url}
                  alt={`image-${index}`}
                />
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className={styles.embla__controls}>
        <div className={styles.embla__dots}>
          {scrollSnaps.map((_, index) => (
            <DotButton
              key={index}
              onClick={() => onDotButtonClick(index)}
              className={`${styles.embla__dot} ${
                index === selectedIndex
                  ? ` ${styles['embla__dot--selected']}`
                  : ''
              }`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

export default CustomCarousel;
