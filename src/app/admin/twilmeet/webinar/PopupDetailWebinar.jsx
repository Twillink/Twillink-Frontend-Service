import React from 'react';

const Modal = ({isOpen, onClose, event, registered}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex justify-center items-center z-[9999]">
      <div className="bg-white rounded-3xl shadow-lg max-w-md w-full">
        <button
          onClick={onClose}
          className="absolute text-gray-500 hover:text-gray-800 bg-gray-300 w-8 h-8 rounded-full m-2">
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
            {/* Contoh avatar */}
            {registered.map(data => (
              // eslint-disable-next-line @next/next/no-img-element, react/jsx-key
              <img
                src={data.photo}
                alt="User"
                className="w-8 h-8 rounded-full border-2 border-white"
              />
            ))}
            <span className="text-sm text-gray-500 pl-3">
              {registered.length} registered
            </span>
          </div>
          <div className="row flex items-center gap-2 mt-10">
              <div
                onClick={() =>
                  window.open(
                    'https://twillink.com/room?id=88266820518',
                    '_blank',
                  )
                }
                className="flex-grow p-3 focus:bg-black cursor-pointer bg-black rounded-md text-center text-white font-bold">
                Open Webinar
              </div>
              <button
                onClick={() => {
                  alert('Link copied to clipboard!');
                  navigator.clipboard.writeText(`https://twillink.com/room?id=${event.id}`)
                }}
                className="p-3 focus:bg-gray-500 cursor-pointer bg-gray-500 rounded-md text-center text-white">
                📋
              </button>
            </div>
        </div>
      </div>
    </div>
  );
};

export default Modal;
