// pages/index.js
'use client';

import React, {useEffect, useState} from 'react';
import Image from 'next/image';
import {StaticImport} from 'next/dist/shared/lib/get-img-props';
import {Calendar, Timer} from 'lucide-react';
import Modal from './PopupDetailWebinar';
import Modal2 from './PopupDetailClass';


// const mockData = [
//   {
//     id: 1,
//     title: 'Leading with Emotional Intelligence: Maximizing Impact',
//     date: '9 Sep 2024',
//     time: '10:00',
//     image:
//       'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTF9W9vwDNn5X7zAVeDHXgUKo0nBy0pqCaDcw&s',
//     registered: 2412,
//     desc: 'Leading with Emotional Intelligence: Maximizing Impact. Leading with Emotional Intelligence: Maximizing Impact. Leading with Emotional Intelligence: Maximizing Impact .Leading with Emotional Intelligence: Maximizing Impact',

//     attendees: [
//       'https://t3.ftcdn.net/jpg/02/99/04/20/360_F_299042079_vGBD7wIlSeNl7vOevWHiL93G4koMM967.jpg',
//       'https://t3.ftcdn.net/jpg/02/43/12/34/360_F_243123463_zTooub557xEWABDLk0jJklDyLSGl2jrr.jpg',
//       'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTF9W9vwDNn5X7zAVeDHXgUKo0nBy0pqCaDcw&s',
//     ],
//   },
// ];

const EventCard = ({event, onClick}) => (
  <div
    className="bg-white shadow-lg rounded-lg overflow-hidden cursor-pointer m-5"
    onClick={onClick}>
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
          {event.member.map(
            (src: any | StaticImport, idx: React.Key | null | undefined) => (
              <Image
                key={idx}
                src={src.photo}
                alt="attendee"
                width={30}
                height={30}
                className="rounded-full border border-white"
              />
            ),
          )}
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
  const [webinarData, setwebinarData] = useState([]);
  const [classData, setclassData] = useState([]);

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
        },
      );

      if (response.ok) {
        const data = await response.json();
        console.log(data.data);
        setwebinarData(
          data.data.filter(data => data.infoItem.type === 'Webinar'),
        );
        setclassData(
          data.data.filter(data => data.infoItem.type === 'Class'),
        );
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
          {['Webinar', 'Class'].map(tab => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-4 py-2 rounded-full text-h3 font-light transition-colors duration-200 relative
                ${activeTab === tab ? ' text-gray-600' : 'text-gray-200'}`}>
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
          webinarData.map(event => (
            <>
              <EventCard
                key={event.id}
                event={event}
                onClick={() => setIsModalOpen(event)}
              />
              <Modal
                event={event.infoItem}
                registered={event.member}
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
              />
            </>
          ))}
        {activeTab === 'Class' &&
          classData.map(event => (
            <>
              <EventCard
                key={event.id}
                event={event}
                onClick={() => setIsModalOpen(event)}
              />
              <Modal2
                event={event.infoItem}
                registered={event.member}
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
              />
            </>
          ))}
      </div>
    </div>
  );
};

export default Home;
