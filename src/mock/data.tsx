import {WidgetTypeEnum} from '@/libs/types/WidgetTypeEnum';

export const dummyWidget = [
  {
    id: 1,
    idEditor: 'widget-dfa1c3c0-d4cb-4ae2-aa76-a03d11e4d798-4511',
    order: 1,
    width: '100%',
    type: WidgetTypeEnum.Link,
    value: {
      id: 1,
      title: 'Link 1',
      url: 'https://www.google.com',
      createdAt: '2024-10-14T23:22:25.000Z',
      updatedAt: null,
    },
  },
  {
    id: 2,
    idEditor: 'widget-d3eea5d8-572f-4b4d-8b7f-2b3c8c6b4767-1088',
    order: 2,
    width: '100%',
    type: WidgetTypeEnum.Text,
    value: {
      id: 1,
      text: 'Text 1 urutan 2 harusnya',
      createdAt: '2024-10-14T23:23:30.000Z',
      updatedAt: null,
    },
  },
];
