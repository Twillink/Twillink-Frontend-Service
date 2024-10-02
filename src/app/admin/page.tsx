'use client';

import WidgetEditor, {Widget} from '@/components/WidgetEditor';
import {useState} from 'react';

export default function Page() {
  const [dataWidget, setDataWidget] = useState<Widget[]>([]);

  return (
    <div className="flex flex-row items-center justify-center h-[calc(100vh-6.5rem)]">
      <div className="mockup-phone h-full w-80 md:w-96">
        <div className="camera"></div>
        <div className="display h-full">
          <WidgetEditor dataWidget={dataWidget} setDataWidget={setDataWidget} />
        </div>
      </div>
    </div>
  );
}
