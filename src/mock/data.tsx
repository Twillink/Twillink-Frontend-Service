import {WidgetTypes} from '@/components/widgets/WidgetContainer';

export const dummyWidget = [
  {
    id: 'Box-1',
    order: 1,
    width: '100%',
    type: WidgetTypes.Link,
    url: 'https://www.google.com',
    text: 'Here your link Box-1',
  },
  {
    id: 'Box-2',
    order: 2,
    width: '50%',
    type: WidgetTypes.Link,
    url: 'https://www.google.com',
    text: 'Max lenght 70 chars',
  },
  {
    id: 'Box-3',
    order: 3,
    width: '50%',
    type: WidgetTypes.Link,
    url: 'https://www.google.com',
    text: 'Here your link Box-3 Here your link Box-3 Here your link Here your link  Box-3 ',
  },
];
