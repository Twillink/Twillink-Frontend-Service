"use client"

import React, { useEffect, useRef, useState } from 'react';
import CryptoJS from 'crypto-js';
import ZoomMtg from '@zoom/meetingsdk/embedded';
import { Camera, Mic, Monitor } from 'lucide-react';
import Image from 'next/image';

const PreJoin = ({meetingId}) => {
  const zoomAppRootRef = useRef(null);  // Create a ref for the zoom app root
  const [isJoined, setIsJoined] = useState(false);
  const [zoomError, setZoomError] = useState(null);

  const zmClient = ZoomMtg.createClient();

  const getSignature = async () => {
    try {
      // Ensure API URL is defined
      const apiUrl = process.env.NEXT_PUBLIC_API_URL;
      if (!apiUrl) {
        throw new Error("API URL is not defined in environment variables.");
      }
      const token = localStorage.getItem('authToken');
      // Fetch the signature
      const response = await fetch(apiUrl + "/api/v1/user-auth/zoomget", {
        method: "POST",
        headers: { "Content-Type": "application/json",Authorization: "Bearer " + token },
        body: JSON.stringify({
          meetingNumber: meetingId,
          role: 1,
        }),
      });
  
      // Check if the response is successful
      if (!response.ok) {
        const errorDetails = await response.json();
        throw new Error(`Failed to fetch signature: ${errorDetails.message || response.statusText}`);
      }
  
      // Parse and use the response
      const data = await response.json();
      const signature = data.signature;
  
      if (!signature) {
        throw new Error("Signature not returned from API.");
      }
  
      joinMeeting(signature);
    } catch (error) {
      console.error("Error fetching signature:", error);
    }
  };
  

  const joinMeeting = (s) => {
    const meetingConfig = {
      sdkKey: "fXnDPxR_RtgsMtDYhkRg", 
      signature: s,
      meetingNumber: meetingId, 
      userName: "User", 
      password: "pNMxR37I12HQ54FtJafgRSzaNqzEdb.1", 
      userEmail: "", 
    };

    zmClient.init({
      debug: true,
      zoomAppRoot: zoomAppRootRef.current,  // Bind to the zoom app root div
      language: "en-US",
      customize: {
        meetingInfo: ["topic", "host", "mn"], // Show only necessary meeting info
        toolbar: {
          buttons: ["audio", "video", "participants", "chat", "share", "leave"], // Customize toolbar buttons
        },
      },
    });

    zmClient.join(meetingConfig)
      .then((e) => {
        console.log("Join success", e);
        setIsJoined(true);
      })
      .catch((e) => {
        console.log("Join error", e);
        setZoomError(e);
      });
  };

  return (
    <div className="w-full relative flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <div className="absolute top-6 left-6 text-xl font-bold text-gray-800">
        twillink
      </div>

      {!isJoined && (
        <div className="absolute rounded-lg p-6 text-center w-96">
        {/* Avatar */}
        {/* <div className="w-20 h-20 mx-auto mb-4">
          <Image
            src="https://via.placeholder.com/80"
            alt="User Avatar"
            width={80}
            height={80}
            className="rounded-full"
          />
        </div> */}

        {/* Status Text */}
        <button
            className="bg-blue-500 text-white px-6 py-2 rounded-md font-medium text-sm"
            onClick={getSignature}
          >Join Now</button>
      </div>
      )}

      {/* Zoom SDK will render here */}
      <div ref={zoomAppRootRef} className="w-creen h-screen"></div>

      {/* Meeting Link */}
      <div className="absolute bottom-6 right-6 bg-white shadow-md rounded-lg p-4 text-center w-48">
        <h3 className="text-gray-800 text-sm font-medium">Meeting Link</h3>
        <p className="text-blue-500 text-xs mt-1">
          <a
            href={`https://twillmeet.com/room?id=${meetingId}`}
            target="_blank"
            rel="noopener noreferrer"
          >
            twillmeet.com/room?id={meetingId}
          </a>
        </p>
      </div>
    </div>
  );
};

export default PreJoin;
