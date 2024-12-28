"use client"

import React from 'react';
import { useSearchParams } from 'next/navigation';
import PreJoin from './prejoin';

const Room = () => {
  const searchParams = useSearchParams();
  const meetingId = searchParams.get('id'); // Get the 'id' parameter from the URL
  console.log(meetingId)

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      {/* Pass the meeting ID to PreJoin */}
      <PreJoin meetingId={meetingId} />
    </div>
  );
};

export default Room;
