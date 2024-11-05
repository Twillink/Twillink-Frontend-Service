import {
  DotButton,
  useDotButton,
} from '@/components/CustomCarousel/CustomCarouselDotButton';
import {EmblaOptionsType} from 'embla-carousel';
import useEmblaCarousel from 'embla-carousel-react';

import Image from 'next/image';
import styles from './CustomCarousel.module.css';

interface ICustomCarousel {
  slides: string[];
  attachmentIds?: number[];
}

function CustomCarousel({slides}: ICustomCarousel) {
  const OPTIONS: EmblaOptionsType = {
    // align: 'center',
    // dragFree: true,
    loop: false,
  };
  const [emblaRef, emblaApi] = useEmblaCarousel(OPTIONS);

  const {selectedIndex, scrollSnaps, onDotButtonClick} = useDotButton(emblaApi);

  // const dispatch = useAppDispatch();

  const renderSlides = () =>
    slides.map((url, index) => (
      <div className={styles.embla__slide} key={url}>
        <div className={styles.embla__slide__number}>
          <Image
            className={styles['embla__slide__img']}
            src={url}
            alt={`image-${index}`}
          />
        </div>
      </div>
    ));

  // const renderSlidesWithAttachmentIds = useMemo(async () => {
  //   if (!attachmentIds) return null;

  //   const attachmentsData = Promise.all(
  //     attachmentIds.map(id => {
  //       return apiGetAttachmentById(dispatch, id);
  //     }),
  //   ).then(data => {
  //     console.log(data);
  //     return;
  //   });

  //   return attachmentsData;
  //   // return <div className={styles.embla__slide} key={id}>
  //   //   <div className={styles.embla__slide__number}>
  //   //     <img
  //   //       className={styles['embla__slide__img']}
  //   //       src={url}
  //   //       alt={`image-${index}`}
  //   //     />
  //   //   </div>
  //   // </div>
  // }, [attachmentIds]);

  return (
    <section className={styles.embla}>
      <div className={styles.embla__viewport} ref={emblaRef}>
        <div className={styles.embla__container}>
          {slides?.length > 0 && renderSlides()}
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
