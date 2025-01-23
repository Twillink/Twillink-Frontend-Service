import React, { useState } from 'react';

const Modal = ({ isOpen, onClose, event, registered }) => {
  if (!isOpen) return null;

  const [activeTab, setActiveTab] = useState('Description');

  return (
    <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex justify-center items-center z-[9999]">
      <div className="bg-white rounded-3xl shadow-lg max-w-md w-full">
        <button
          onClick={onClose}
          className="absolute text-gray-500 hover:text-gray-800 bg-gray-300 w-8 h-8 rounded-full m-2"
        >
          X
        </button>
        <img
          src={event.thumbnail}
          alt="Modal Cover"
          className="rounded-t-lg w-full h-40 object-cover mb-1"
        />
        <div className="p-5">
          <h2 className="text-xl font-bold mb-2">{event.title}</h2>
          <div className="flex items-center space-x-2 text-gray-600 text-sm mb-4">
            <span>📅 {event.date}</span>
            <span>🕙 {event.time}</span>
          </div>
          <div className="flex -space-x-2 mb-4 items-center">
            {/* Displaying avatars of registered users */}
            {registered.map((data, idx) => (
              <img
                key={idx}
                src={data.photo}
                alt="User"
                className="w-8 h-8 rounded-full border-2 border-white"
              />
            ))}
            <span className="text-sm text-gray-500 pl-3">
              {registered.length} registered
            </span>
          </div>
          <div className="text-gray-700 text-sm text-center">
            {['Description', 'Class'].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-4 py-2 rounded-full text-h3 font-light transition-colors duration-200 relative
                ${activeTab === tab ? ' text-gray-600' : 'text-gray-200'}`}
              >
                {tab}
              </button>
            ))}
            {activeTab === 'Description' && (
              <p className="w-full text-left">{event.desc}</p>
            )}
            {activeTab === 'Class' && (
              <div>
                {event.classes.map((data, idx) => (
                  <div
                    key={idx}
                    className="grid grid-cols-1 bg-gray-200 m-2 p-2 rounded-lg"
                  >
                    <p className="w-full text-left font-normal text-[14px]">
                      {data}
                    </p>
                    <div className="grid grid-cols-2">
                      <div className="text-left col-span-1 text-[12px] font-light">
                        Saturday, December 26th, 2024
                      </div>
                      <div className=" col-span-1 text-right text-[12px] font-light">
                        14:00 - 16:00
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
            <div className="row flex items-center gap-2 mt-10">
              <div
                onClick={() =>
                  window.open(
                    'https://twillmeet.com/room?id=88266820518',
                    '_blank',
                  )
                }
                className="flex-grow p-3 focus:bg-lime-600 cursor-pointer bg-lime-600 rounded-md text-center text-white font-bold">
                Open Webinar
              </div>
              <button
                onClick={() => {
                  alert('Link copied to clipboard!');
                  navigator.clipboard.writeText(`https://twillmeet.com/twillmeet?id=${event.id}`)
                }}
                className="p-3 focus:bg-blue-500 cursor-pointer bg-blue-500 rounded-md text-center text-white">
                📋
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Modal;
