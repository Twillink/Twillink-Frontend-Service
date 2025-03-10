import Link from 'next/link';
import React, { useEffect, useState } from 'react';

const Modal = ({ isOpen, onClose, event, registered, nonregistered }) => {
  if (!isOpen) return null;
  const [activeTab, setActiveTab] = useState('Description');

  const [data, setdata] = useState(null);
  const handleSubmit = async (meetingId) => {
    const token = localStorage.getItem('authToken');
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/v1/Twilmeet/Approval/${meetingId}`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (response.ok) {
        const data = await response.json();
        handleSubmititem()
      } else {
        alert('Failed to create consultation');
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const handleDecline = async (meetingId) => {
    const token = localStorage.getItem('authToken');
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/v1/Twilmeet/Decline/${meetingId}`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (response.ok) {
        const data = await response.json();
        handleSubmititem()
      } else {
        alert('Failed to create consultation');
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const handleSubmititem = async () => {
    const token = localStorage.getItem('authToken');
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/v1/Twilmeet/${event.id}`,
        {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.ok) {
        const data = await response.json();
        setdata(data)
      } else {
        alert('Failed to create consultation');
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

   useEffect(() => {
    handleSubmititem();
    }, []);

  return (
    <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex justify-center items-center z-[9999] px-2 py-2">
      <div className="bg-white rounded-3xl shadow-lg max-w-md w-full overflow-auto">
        <button
          onClick={onClose}
          className="absolute text-gray-500 hover:text-gray-800 bg-gray-300 w-8 h-8 rounded-full m-2">
          X
        </button>
        <img
          src={event.thumbnail}
          alt="Modal Cover"
          className="rounded-t-3xl w-full h-40 object-cover mb-1"
        />
        <div className="p-5">
          <h2 className="text-xl font-bold mb-2">{event.title}</h2>
          <div className="flex items-center space-x-2 text-gray-600 text-sm mb-4">
            <span>📅 {event.date}</span>
            <span>🕙 {event.time}</span>
          </div>
          <div className="flex -space-x-2 mb-4 items-center">
            {/* Contoh avatar */}
            {/* {registered.map(data => (
              // eslint-disable-next-line @next/next/no-img-element, react/jsx-key
              <img
                src={data.photo}
                alt="User"
                className="w-8 h-8 rounded-full border-2 border-white"
              />
            ))} */}
            <span className="text-sm text-gray-500 pl-3">
              {data?.member.length} registered
            </span>
          </div>
          <div className="text-gray-700 text-sm text-center">
            {['Description', 'Member', 'Need approval'].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-4 py-2 rounded-full text-h3 font-light transition-colors duration-200 relative
                ${activeTab === tab ? ' text-gray-600' : 'text-gray-400'}`}
              >
                {tab}
              </button>
            ))}
            {activeTab === 'Description' && (
              <p className="w-full text-left">{event.desc}</p>
            )}
            {activeTab === 'Member' && (
              <div className="max-h-32 overflow-y-auto">
                {data.member.map((data, idx) => (
                  <div
                    key={idx}
                    className="grid grid-cols-1 bg-gray-200 m-2 p-2 rounded-lg   overflow-auto"
                  >
                    <div className="grid grid-cols-2">
                      <div className=" col-span-1 text-right text-[12px] font-light">
                        <p className="w-full text-left font-normal text-[14px]">
                          {data.email}
                        </p>
                        <div className="text-left col-span-1 text-[12px] font-light">
                          {data.nameUser} {data.lastUser}
                        </div>
                      </div>
                      <div className=" col-span-1 text-right text-[12px] font-light">
                        <button onClick={()=> handleDecline(data.id)} className="px-2 py-1 border-1 border-red-500 bg-white text-black rounded-md">
                          ❌
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
                {data.member.length <= 0 &&
                  <div className='m-4'>Empty</div>
                }
              </div>
            )}
            {activeTab === 'Need approval' && (
              <div className="max-h-32 overflow-y-auto">
                {data.nonMember.map((data, idx) => (
                  <div
                    key={idx}
                    className="grid grid-cols-1 bg-gray-200 m-2 p-2 rounded-lg   overflow-auto"
                  >
                    <div className="grid grid-cols-2">
                      <div className=" col-span-1 text-right text-[12px] font-light">
                        <p className="w-full text-left font-normal text-[14px]">
                          {data.email}
                        </p>
                        <div className="text-left col-span-1 text-[12px] font-light">
                          {data.nameUser} {data.lastUser}
                        </div>
                      </div>
                      <div className=" col-span-1 text-right text-[12px] font-light">
                        <button onClick={()=> handleDecline(data.id)} className="px-2 py-1 border-1 border-red-500 bg-white text-black rounded-md">
                          ❌
                        </button>
                        <button onClick={()=> handleSubmit(data.id)} className="px-2 py-1 border-2 border-blue-500 bg-white text-black rounded-md mx-1">
                          ✅
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
                {data.nonMember.length <= 0 &&
                  <div className='m-4'>Empty</div>
                }
              </div>
            )}
            {/* <div className="row flex items-center gap-2 mt-10">
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
            </div> */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Modal;
