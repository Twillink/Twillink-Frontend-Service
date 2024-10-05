import React from 'react';

interface IPanelContainer {
  children: React.ReactNode;
}

function PanelContainer({children}: IPanelContainer) {
  return (
    <div className="flex flex-col flex-grow p-6 bg-contras-high rounded-3xl w-full">
      {children}
    </div>
  );
}

export default PanelContainer;
