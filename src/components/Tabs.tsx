import React from 'react';

interface ITabs {
  activeTab: number;
  setActiveTab: (tab: number) => void;
  tabLabels: string[];
}

const Tabs: React.FC<ITabs> = ({activeTab, setActiveTab, tabLabels}) => {
  const tabActive = 'text-primary font-bold';

  return (
    <div role="tablist" className="flex space-x-[60px]">
      {tabLabels.map((label, index) => (
        <div key={index} className="flex flex-col items-center">
          <a
            role="tab"
            className={`cursor-pointer font-bold text-xl ${activeTab === index ? tabActive : 'text-general-low'}`}
            onClick={() => setActiveTab(index)}>
            {label}
          </a>
          {activeTab === index && (
            <div className="w-full h-[2px] bg-primary mt-[0.4rem] rounded-full" />
          )}
        </div>
      ))}
    </div>
  );
};

export default Tabs;
