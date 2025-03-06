"use client"

import React, { useEffect, useRef, useState } from 'react';
import Modal from './Webinar';
import Modal2 from './Class';
import Image from 'next/image';
import Input from '@/components/Input';

const PreJoin = ({ meetingId }) => {
  const [data, setdata] = useState(null);
  const [paymentMethod, setPaymentMethod] = useState('Stripe');
  const [status, setstatus] = useState(false);
  const [isLoading, setIsLoading] = useState(false);


  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    phoneNumber: '',
    email: '',
    typePayment: 'paypal',
    idItem: meetingId,
    price: data?.price
  });

  const handleSubmit = async () => {
    const token = localStorage.getItem('authToken');
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/v1/Twilmeet/${meetingId}`,
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
        setdata(data.data)
      } else {
        alert('Failed to create consultation');
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const handleSubmitBuy = async () => {
    // const token = localStorage.getItem('authToken');
    setIsLoading(true)
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/v1/Twilmeet/BuyTweelmeet`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            // Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(formData)
        }
      );

      if (response.ok) {
        const data = await response.json();
        setstatus(true)
        setIsLoading(false)
      } else {
        alert('Email already registered, please try again using other email');
        setIsLoading(false)
      }
    } catch (error) {
      alert('Email already registered, please try again using other email');
      setIsLoading(false)
    }
  };

  const handleChange = e => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value,
    });
  };

  useEffect(() => {
    handleSubmit();
  }, []);

  if (data === null) {
    <div className="w-full relative flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <div className="absolute top-6 left-6 text-xl font-bold text-gray-800">
        twillink
      </div>
      <>NotFound</>
    </div>
  }

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100 p-4">
      {!status &&
        <div className="bg-white rounded-3xl shadow-lg p-6 w-full max-w-4xl grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Left Side - Form */}
          <div>
            <h2 className="text-xl font-semibold mb-4">Payment</h2>
            <div className="grid grid-cols-2 gap-4">
              <Input
                type="text"
                name="firstName"
                placeholder="First Name"
                className="p-2 border rounded w-full"
                value={formData.firstName}
                onChange={handleChange}
                required
              />
              <Input
                type="text"
                name="lastName"
                placeholder="Last Name"
                className="p-2 border rounded w-full"
                value={formData.lastName}
                onChange={handleChange}
                required
              />
            </div>
            <div className="mt-4">
              <Input
                type="text"
                placeholder="Phone Number"
                name="phoneNumber"
                className="p-2 border rounded w-full"
                value={formData.phoneNumber}
                onChange={handleChange}
                required
              />
            </div>
            <div className="mt-4">
              <Input
                type="email"
                placeholder="Your mail"
                className="p-2 border rounded w-full"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </div>
            <button disabled={isLoading}
              className={`mt-6 w-full py-2 rounded-lg transition ${isLoading ? "bg-gray-400 cursor-not-allowed" : "bg-blue-600 hover:bg-blue-700 text-white"
                }`} onClick={() => handleSubmitBuy()}>
              {isLoading ? "Processing..." : "Confirm"}
            </button>
          </div>

          {/* Right Side - Summary */}
          <div className="bg-gray-50 p-4 rounded-lg">
            <h2 className="text-xl font-semibold mb-4">Summary</h2>
            <div className="flex items-center space-x-4">
              <Image src={data?.thumbnail} alt="Event" width={80} height={80} className="rounded-md w-full" />
            </div>
            <div>
              <h3 className="text-md font-medium">{data?.title}</h3>
            </div>
            <div className="mt-4 text-gray-600">
              <p className="font-semibold">{data?.desc}</p>
              <div className=''>
                <div className='flex justify-between'>
                  <p>Date & Time</p>
                  <p>{data?.date}</p>
                </div>
                <p className='text-right'>{data?.time}</p>
              </div>
            </div>
            <div className="mt-4 border-t pt-4 text-gray-700">
              <p className="flex justify-between"><span>Subtotal</span> <span>{data?.price === 0 ? "free" : data?.price}</span></p>
              <p className="flex justify-between font-semibold mt-2 text-lg"><span>Total</span> <span>{data?.price === 0 ? "free" : data?.price}</span></p>
            </div>
          </div>
        </div>
      }
      {status &&
        <div className="flex items-center justify-center min-h-screen">
          <div className="text-center p-6">
            <h1 className="text-2xl font-bold text-green-600">Registration Successful</h1>
            <p className="mt-2 text-gray-700">
              Please wait while we are contacting the webinar host to process your registration.
            </p>
            <p className="mt-4 text-gray-500">You may now close this page.</p>
          </div>
        </div>
      }
    </div>
  )
};

export default PreJoin;
