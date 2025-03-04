// pages/index.js
'use client';

import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import { StaticImport } from 'next/dist/shared/lib/get-img-props';
import { Calendar, Timer } from 'lucide-react';
import Modal from './PopupDetailWebinar';
import Modal2 from './PopupDetailClass';

const EventCard = ({ event, onClick }) => (
  <div
    className="bg-white shadow-lg rounded-lg overflow-hidden cursor-pointer m-5"
    onClick={onClick}
  >
    <div className="relative w-full h-40">
      <img
        src={event.infoItem.thumbnail}
        alt={event.infoItem.title}
        fill
        className="object-cover"
      />
    </div>
    <div className="p-4">
      <div className="font-semibold text-gray-900 text-sm my-5">
        {event.infoItem.title}
      </div>
      <div className="text-gray-500 text-xs flex justify-between mb-4">
        <span className="flex w-20 items-center">
          <Calendar width={20} className="pr-2" />
          {event.infoItem.date}
        </span>
        <span className="flex items-center">
          <Timer width={20} className="pr-1" />
          {event.infoItem.time}
        </span>
      </div>
      <div className="font-light text-gray-500 text-sm mb-2">
        {event.infoItem.desc}
      </div>
      <div className="flex items-center gap-3">
        <div className="flex -space-x-2">
          {event.member.map((src, idx) => (
            <Image
              key={idx}
              src={src.photo}
              alt="attendee"
              width={30}
              height={30}
              className="rounded-full border border-white"
            />
          ))}
        </div>
        <span className="text-xs text-gray-500">
          {event.member.length} registered
        </span>
      </div>
    </div>
  </div>
);

const Home = () => {
  const [activeTab, setActiveTab] = useState('Webinar');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [webinarData, setWebinarData] = useState([]);
  const [classData, setClassData] = useState([]);
  const [consultData, setConsultData] = useState([]);


  const handleSubmit = async () => {
    const token = localStorage.getItem('authToken');
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/v1/Twilmeet`,
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
        const uid = localStorage.getItem('user');
        const filtering = data.data.filter((data)=>  data.owner === JSON.parse(uid).id);
        console.log(filtering)
        setWebinarData(filtering.filter((data) => data.infoItem.type === 'Webinar'));
        setClassData(filtering.filter((data) => data.infoItem.type === 'Class'));
        setConsultData(filtering.filter((data) => data.infoItem.type === 'Consult'));

      } else {
        alert('Failed to create consultation');
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  useEffect(() => {
    handleSubmit();
  }, []);

  return (
    <div className="w-full bg-white p-10 rounded-3xl">
      <div className="flex items-center justify-between mb-6">
        <div className="flex space-x-4">
          {['Webinar', 'Class'].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-4 py-2 rounded-full text-h3 font-light transition-colors duration-200 relative
                ${activeTab === tab ? ' text-gray-600' : 'text-gray-200'}`}
            >
              {tab}
              {activeTab === tab && (
                <div className="absolute bottom-0 left-0 right-0 h-1 bg-gray-600 rounded-full" />
              )}
            </button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 overflow-hidden">
        {activeTab === 'Webinar' &&
          webinarData.map((event) => (
            <React.Fragment key={event.id}>
              <EventCard event={event} onClick={() => setIsModalOpen(event)} />
              <Modal
                event={event.infoItem}
                registered={event.member}
                isOpen={isModalOpen === event}
                onClose={() => setIsModalOpen(false)}
              />
            </React.Fragment>
          ))}
        {activeTab === 'Class' &&
          classData.map((event) => (
            <React.Fragment key={event.id}>
              <EventCard event={event} onClick={() => setIsModalOpen(event)} />
              <Modal2
                event={event.infoItem}
                registered={event.member}
                isOpen={isModalOpen === event}
                onClose={() => setIsModalOpen(false)}
              />
            </React.Fragment>
          ))}
          {activeTab === 'Consult' &&
          consultData.map((event) => (
            <React.Fragment key={event.id}>
              <EventCard event={event} onClick={() => setIsModalOpen(event)} />
              <Modal2
                event={event.infoItem}
                registered={event.member}
                isOpen={isModalOpen === event}
                onClose={() => setIsModalOpen(false)}
              />
            </React.Fragment>
          ))}
      </div>
    </div>
  );
};

export default Home;
