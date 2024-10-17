import React from 'react';

const Loader: React.FC = () => {
  return (
    <div className="flex items-center justify-center h-screen">
      <span className="loading loading-ring w-20 text-general-med"></span>
    </div>
  );
};

export default Loader;
