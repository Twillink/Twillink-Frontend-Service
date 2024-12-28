import React from 'react';
import Image from 'next/image';
import {Camera, Mic, Monitor} from 'lucide-react';

const PreJoin = () => {
  return (
    <div className="w-full relative flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <iframe
        src="https://app.zoom.us/wc/88266820518/start?fromPWA=1&pwd=pNMxR37I12HQ54FtJafgRSzaNqzEdb.1"
        title="Embedded Content"
        width="100%"
        height="500"
        style={{border: 'none'}}
        allowFullScreen></iframe>
      {/* Logo */}
      <div className="absolute top-6 left-6 text-xl font-bold text-gray-800">
        twillink
      </div>

      {/* Card */}
      <div className="bg-white shadow-md rounded-lg p-6 text-center w-96">
        {/* Avatar */}
        <div className="w-20 h-20 mx-auto mb-4">
          <Image
            src="https://via.placeholder.com/80"
            alt="User Avatar"
            width={80}
            height={80}
            className="rounded-full"
          />
        </div>

        {/* Status Text */}
        <h2 className="text-lg font-medium mb-2">Please wait...</h2>
        <p className="text-gray-600 text-sm">
          Meeting host will accept you in a moment.
        </p>
      </div>

      {/* Bottom Control Bar */}
      <div className="absolute bottom-6 left-0 right-0 flex justify-center">
        <div className="bg-white shadow-md rounded-full flex items-center justify-between px-4 py-4 space-x-2 w-96">
          <div className="flex w-full">
            <button className="w-8 h-8 rounded-full flex items-center justify-center mr-10">
              <Mic color="grey" />
            </button>
            <button className="w-8 h-8 rounded-full flex items-center justify-center mr-10">
              <Camera color="grey" />
            </button>
            <button className="w-8 h-8 rounded-full flex items-center justify-center">
              <Monitor color="grey" />
            </button>
          </div>
          <button className="bg-red-500 text-white px-10 py-2 rounded-md font-medium text-sm">
            Leave
          </button>
        </div>
      </div>

      {/* Meeting Link (Bottom Right) */}
      <div className="absolute bottom-6 right-6 bg-white shadow-md rounded-lg p-4 text-center w-48">
        <h3 className="text-gray-800 text-sm font-medium">Meeting Link</h3>
        <p className="text-blue-500 text-xs mt-1">
          <a
            href="https://twillmeet.com/das-ef-12"
            target="_blank"
            rel="noopener noreferrer">
            twillmeet.com/das-ef-12
          </a>
        </p>
      </div>
    </div>
  );
};

export default PreJoin;
