'use client';

import {format, getDay, parse, startOfWeek} from 'date-fns';
import {enUS} from 'date-fns/locale';
import {ChevronLeft, ChevronRight} from 'lucide-react';
import {useState} from 'react';
import {Calendar, dateFnsLocalizer} from 'react-big-calendar';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import './calendar.css';

interface Event {
  id: number;
  title: string;
  start: Date;
  end: Date;
  description?: string;
}

const CustomToolbar = (toolbar: any) => {
  const goToBack = () => {
    toolbar.onNavigate('PREV');
  };

  const goToNext = () => {
    toolbar.onNavigate('NEXT');
  };

  return (
    <div className="rbc-toolbar">
      <button onClick={goToBack} className="nav-button">
        <ChevronLeft className="w-4 h-4" />
      </button>
      <div className="rbc-toolbar-label">{toolbar.label}</div>
      <button onClick={goToNext} className="nav-button">
        <ChevronRight className="w-4 h-4" />
      </button>
    </div>
  );
};

export default function CalendarPage() {
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());
  const [, setSelectedEvent] = useState<Event | null>(null);

  const locales = {
    'en-US': enUS,
  };

  const localizer = dateFnsLocalizer({
    format,
    parse,
    startOfWeek,
    getDay,
    locales,
  });

  const handleSelectEvent = (event: Event) => {
    setSelectedEvent(event);
  };

  const events: Event[] = [
    {
      id: 1,
      title: 'Webinar Business Strategy',
      start: new Date(2024, 8, 6, 9, 0), // September 6, 2024, 09:00
      end: new Date(2024, 8, 6, 10, 0), // September 6, 2024, 10:00
      description: 'Business strategy planning session',
    },
    {
      id: 2,
      title: 'Webinar Brand Corporate',
      start: new Date(2024, 8, 6, 9, 0),
      end: new Date(2024, 8, 6, 10, 0),
      description: 'Corporate branding discussion',
    },
    {
      id: 3,
      title: 'Meeting with Leon',
      start: new Date(2024, 8, 6, 9, 0),
      end: new Date(2024, 8, 6, 10, 0),
      description: '1:1 meeting with Leon',
    },
  ];

  return (
    <div className="h-[calc(100vh-108px)] w-full p-6">
      <div className="flex h-full gap-5">
        <div className="flex-1">
          <div className="bg-white rounded-lg p-6 h-full">
            <Calendar
              localizer={localizer}
              events={events}
              startAccessor="start"
              endAccessor="end"
              style={{height: 'calc(100% - 32px)'}}
              onSelectEvent={handleSelectEvent}
              date={selectedDate}
              onNavigate={date => setSelectedDate(date)}
              views={['month']}
              defaultView="month"
              className="custom-calendar"
              components={{
                toolbar: CustomToolbar,
              }}
            />
          </div>
        </div>

        <div className="w-80">
          <div className="bg-white rounded-lg p-6 h-full flex flex-col">
            <div className="timeline-header flex-shrink-0">
              <h2 className="timeline-date">
                {format(selectedDate, 'dd MMMM yyyy')}
              </h2>
            </div>

            <div className="timeline-events flex-1 overflow-auto">
              {events
                .filter(
                  event =>
                    format(event.start, 'yyyy-MM-dd') ===
                    format(selectedDate, 'yyyy-MM-dd'),
                )
                .sort((a, b) => a.start.getTime() - b.start.getTime())
                .map((event, index) => (
                  <div key={index} className="timeline-event">
                    <div className="timeline-event-time">
                      {format(event.start, 'HH:mm')} -{' '}
                      {format(event.end, 'HH:mm')}
                    </div>
                    <div className="timeline-event-title">{event.title}</div>
                    {event.description && (
                      <div className="timeline-event-description">
                        {event.description}
                      </div>
                    )}
                  </div>
                ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
