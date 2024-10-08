import {WidgetTypeEnum} from '@/libs/WidgetTypeEnum';

export const dummyWidget = [
  {
    id: 1,
    order: 1,
    width: '100%',
    type: WidgetTypeEnum.Link,
    url: 'https://www.google.com',
    text: 'Here your link Box-1',
  },
  {
    id: 2,
    order: 2,
    width: '50%',
    type: WidgetTypeEnum.Link,
    url: 'https://www.google.com',
    text: 'Max lenght 70 chars',
  },
  {
    id: 3,
    order: 3,
    width: '50%',
    type: WidgetTypeEnum.Link,
    url: 'https://www.google.com',
    text: 'Here your link Box-3 Here your link Box-3 Here your link Here your link  Box-3 ',
  },
];
