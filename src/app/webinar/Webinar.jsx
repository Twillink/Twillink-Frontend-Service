import React from 'react';

const Modal = ({isOpen, onClose, event, registered}) => {

  return (
    <div className="fixed inset-0 flex justify-center items-center z-[9999]">
      <div className="bg-white rounded-3xl shadow-lg max-w-md w-full">
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
            {/* Contoh avatar */}
            {registered?.map(data => (
              // eslint-disable-next-line @next/next/no-img-element, react/jsx-key
              <img
                src={data.photo}
                alt="User"
                className="w-8 h-8 rounded-full border-2 border-white"
              />
            ))}
            <span className="text-sm text-gray-500 pl-3">
              {registered?.length} registered
            </span>
          </div>
          <div className="text-gray-700 text-sm">
            <h3 className="font-bold mb-2 overflow-x-auto">Description</h3>
            <p>{event.desc}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Modal;
