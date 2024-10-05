'use client';

import WidgetEditor from '@/components/WidgetEditor';
import {IItemWidgetType} from '@/libs/IItemWidgetType';
import {useState} from 'react';

export default function Page() {
  const [dataWidget, setDataWidget] = useState<IItemWidgetType[]>([]);

  return (
    <div className="flex justify-center w-full h-[calc(100dvh-7.5rem)]">
      <div className="mockup-phone h-full w-80 md:w-96">
        <div className="camera"></div>
        <div className="display h-full">
          <WidgetEditor dataWidget={dataWidget} setDataWidget={setDataWidget} />
        </div>
      </div>
    </div>
  );
}
