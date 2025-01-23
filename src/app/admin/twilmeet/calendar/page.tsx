'use client';

import React, { useEffect, useState } from 'react';
import {
  format,
  startOfDay,
  startOfMonth,
  endOfMonth,
  startOfWeek,
  endOfWeek,
  addDays,
  isSameMonth,
} from 'date-fns';
import { apiGetTwellmeet } from '@/libs/api';
import { useAppDispatch } from '@/libs/hooks/useReduxHook';
import PopupSchedule from './PopupSchedule';

interface Event {
  date: string;
  events: {
    id: string;
    time: string;
    type: string;
    price: number;
    title: string;
    desc: string;
  }[];
}

// Transform data to desired format
const transformData = (data: any[]): Event[] => {
  const result: { [key: string]: { id: string;
    time: string;type: string; price: number; title: string; desc: string }[] } = {};

  data.forEach((item: { infoItem: { id: string;
    time: string;date: string; type: string; price: number; title: string; desc: string } }) => {
    const { id, time, date, type, price, title, desc } = item.infoItem;

    if (!date) return; // Skip if no date

    // Convert date to the desired format (yyyy-MM-dd)
    const formattedDate = date; // Date is already in yyyy-MM-dd format

    // Group events by date
    if (!result[formattedDate]) {
      result[formattedDate] = [];
    }

    result[formattedDate].push({ id, time, type, price, title, desc });
  });

  // Convert result to an array
  return Object.entries(result).map(([date, events]) => ({ date, events }));
};

const Calendar: React.FC = () => {
  const dispatch = useAppDispatch();
  const [currentDate, setCurrentDate] = useState<Date>(startOfDay(new Date()));
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [events, setEvents] = useState<Event[]>([]);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  const getEventsForDate = (date: Date): object[] => {
    const formattedDate = format(startOfDay(date), 'yyyy-MM-dd');
    return events.find((event) => event.date === formattedDate)?.events || [];
  };
  
  const getDateForDate = (date: Date): string | null => {
    const formattedDate = format(startOfDay(date), 'yyyy-MM-dd');
    console.log(events)
    const dates = events.find((event) => event.date === formattedDate)?.date || null;
    return dates;
  };

  const fetchUserProfile = () => {
    apiGetTwellmeet(dispatch, false)
      .then((response) => {
        const uids = localStorage.getItem('user');
        const filtering = response.data.data.filter((datas: { owner: any; })=>  datas.owner === JSON.parse(uids).id);
        const transformedEvents = transformData(filtering);
        setEvents(transformedEvents);
      })
      .catch((err) => {
        console.error('API Error:', err);
      });
  };

  useEffect(() => {
    fetchUserProfile();
  }, []);

  const renderHeader = (): JSX.Element => {
    return (
      <div className="flex items-center justify-between mb-4">
        <div className="items-center justify-between w-50 flex gap-4">
          <button
            className="text-lg font-bold text-gray-500 hover:text-black"
            onClick={() => setCurrentDate(addDays(currentDate, -30))}
          >
            &lt;
          </button>
          <div className="text-xl font-semibold text-gray-700">
            {format(currentDate, 'MMMM yyyy')}
          </div>
          <button
            className="text-lg font-bold text-gray-500 hover:text-black"
            onClick={() => setCurrentDate(addDays(currentDate, 30))}
          >
            &gt;
          </button>
        </div>
        <div
          onClick={() => setIsModalOpen(true)}
          className="px-4 py-2 bg-orange-700 rounded-large text-center text-white font-medium cursor-pointer"
        >
          Create Event
        </div>
      </div>
    );
  };

  const renderDaysOfWeek = (): JSX.Element => {
    const days = [
      'Sunday',
      'Monday',
      'Tuesday',
      'Wednesday',
      'Thursday',
      'Friday',
      'Saturday',
    ];
    return (
      <div className="grid grid-cols-7 text-center font-semibold text-gray-600">
        {days.map((day) => (
          <div key={day} className="py-2 text-gray-400">
            {day}
          </div>
        ))}
      </div>
    );
  };

  const renderDates = (): JSX.Element => {
    const startDate = startOfWeek(startOfMonth(currentDate));
    const endDate = endOfWeek(endOfMonth(currentDate));
    const rows: JSX.Element[] = [];
    let days: JSX.Element[] = [];
    let day = startDate;

    const itemHeight = 'h-[calc((100vh-100px)/6)]';

    while (day <= endDate) {
      for (let i = 0; i < 7; i++) {
        const isCurrentMonth = isSameMonth(day, currentDate);
        const isSunday = day.getDay() === 0;
        const dayEvents = getEventsForDate(day);
        const daysData = getDateForDate(day);

        days.push(
          <div
            key={day.toISOString()}
            onClick={() => {
              setSelectedDate(daysData ? new Date(daysData) : null);
            }}
            className={`cursor-pointer border ${itemHeight} p-3 text-sm rounded-lg transition-colors duration-300 ${
              isCurrentMonth
                ? 'bg-white hover:bg-gray-50'
                : 'bg-gray-100 text-gray-400'
            }`}
          >
            <div className="font-semibold flex">
              <span
                className={`${
                  isSunday
                    ? 'bg-red-500 text-white rounded-full w-8 h-8 flex justify-center items-center'
                    : dayEvents.length !== 0
                    ? 'border-2 border-black text-black rounded-full w-8 h-8 flex justify-center items-center'
                    : 'text-black rounded-full w-8 h-8 flex justify-center items-center'
                }`}
              >
                {format(day, 'd')}
              </span>
            </div>
            {dayEvents.slice(0, 2).map((event, index) => (
              <div
                key={index}
                className={`mt-1 px-2 py-1 text-xs rounded ${
                  index % 2 === 0
                    ? 'bg-green-200 text-green-700'
                    : 'bg-blue-200 text-blue-700'
                }`}
              >
                {event.type}
              </div>
            ))}
          </div>
        );
        day = addDays(day, 1);
      }
      rows.push(
        <div key={day.toISOString()} className="grid grid-cols-7 gap-1">
          {days}
        </div>
      );
      days = [];
    }

    return <div>{rows}</div>;
  };

  return (
    <div className="w-full flex gap-5">
      <div className="p-6 bg-white shadow-xl rounded-3xl w-[80%]">
        {renderHeader()}
        {renderDaysOfWeek()}
        {renderDates()}
      </div>
      <div className="p-6 bg-white shadow-xl rounded-3xl w-[20%]">
        <h1 className="text-xl font-semibold text-gray-800 mb-6">
          {selectedDate ? format(selectedDate, 'd MMMM yyyy') : 'Event'}
        </h1>
        <div className="space-y-6">
          {selectedDate && getEventsForDate(selectedDate).length > 0 ? (
            getEventsForDate(selectedDate).map((event, index) => (
              <div key={index} className="relative flex items-center">
                <div className="w-3 h-3 border-2 border-gray-400 rounded-full flex-shrink-0 bg-white" />
                <div className="ml-4 flex-1">
                  <p className="text-sm font-normal text-gray-900">
                    {event.time}
                  </p>
                  <p className="text-base font-semibold text-gray-900">
                    {event.type}
                  </p>
                  <p className="text-sm font-normal text-gray-900">
                    {event.title}
                  </p>
                  {/* <button className="text-sm bg-blue-600 text-center p-2 m-1 rounded-3xl shadow-lg text-white">Open Video</button> */}
                </div>
              </div>
            ))
          ) : (
            <div>
              <p className="text-gray-500">No Event on this Calendar.</p>
            </div>
          )}
        </div>
      </div>
      <PopupSchedule
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </div>
  );
};

export default Calendar;
