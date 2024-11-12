import {
  DotButton,
  useDotButton,
} from '@/components/CustomCarousel/CustomCarouselDotButton';
import {EmblaOptionsType} from 'embla-carousel';
import useEmblaCarousel from 'embla-carousel-react';

import Image from 'next/image';
import styles from './CustomCarousel.module.css';
import {cn} from '@/utils/formater';
import {useContext, useMemo} from 'react';
import {
  PreviewContext,
  PreviewTypeEnum,
} from '@/libs/providers/PreviewProvider';

interface ICustomCarousel {
  slides?: string[];
  attachmentIds?: string[];
}

function CustomCarousel({slides}: ICustomCarousel) {
  const OPTIONS: EmblaOptionsType = {
    // align: 'center',
    // dragFree: true,
    loop: false,
  };
  const [emblaRef, emblaApi] = useEmblaCarousel(OPTIONS);

  const {selectedIndex, scrollSnaps, onDotButtonClick} = useDotButton(emblaApi);

  const {preview, isMobileScreen} = useContext(PreviewContext);

  const isDesktop = useMemo(
    () => preview === PreviewTypeEnum.DESKTOP && !isMobileScreen,
    [preview, isMobileScreen],
  );

  const renderSlides = () =>
    (slides ?? []).map((url, index) => (
      <div className={styles.embla__slide} key={url}>
        <div
          className={cn([
            styles.embla__slide__number,
            `${isDesktop ? 'h-20 lg:h-24' : 'h-20'}`,
          ])}>
          <Image
            className={cn([styles['embla__slide__img'], 'object-cover'])}
            src={url}
            alt={`image-${index}`}
            layout={'fill'}
          />
        </div>
      </div>
    ));

  return (
    <section className={styles.embla}>
      <div className={styles.embla__viewport} ref={emblaRef}>
        <div className={cn([styles.embla__container])}>
          {slides && slides?.length > 0 && renderSlides()}
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
