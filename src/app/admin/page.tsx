'use client';

import WidgetEditor from '@/components/WidgetEditor';
import {dummyWidget} from '@/mock/data';
import {useState} from 'react';

export default function Page() {
  const [dataWidget, setDataWidget] = useState(dummyWidget);

  return (
    <div className="flex flex-row items-center justify-center h-[calc(100vh-6.5rem)]">
      <div className="mockup-phone h-full w-80 md:w-96">
        <div className="camera"></div>
        <div className="display h-full">
          <div data-theme="light" className="h-full max-w-[428px]">
            <WidgetEditor
              dataWidget={dataWidget}
              setDataWidget={setDataWidget}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
