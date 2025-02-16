"use client"

import React, { useEffect, useRef, useState } from 'react';
import Modal from './Webinar';
import Modal2 from './Class';
import Image from 'next/image';
import Input from '@/components/Input';

const PreJoin = ({ meetingId }) => {
  const [data, setdata] = useState(null);
  const [paymentMethod, setPaymentMethod] = useState('Stripe');

  const [formData, setFormData] = useState({
    fullname: '',
    lastname: '',
    phoneNumber: '',
    email: '',
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
        console.log(data.data)
        setdata(data.data)
      } else {
        alert('Failed to create consultation');
      }
    } catch (error) {
      console.error('Error:', error);
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
      <div className="bg-white rounded-3xl shadow-lg p-6 w-full max-w-4xl grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Left Side - Form */}
        <div>
          <h2 className="text-xl font-semibold mb-4">Payment</h2>
          <div className="grid grid-cols-2 gap-4">
            <Input
              type="text"
              name="firstname"
              placeholder="First Name"
              className="p-2 border rounded w-full"
              value={formData.firstname}
              onChange={handleChange}
              required
            />
            <Input
              type="text"
              name="lastname"
              placeholder="Last Name"
              className="p-2 border rounded w-full"
              value={formData.lastname}
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
          <button className="mt-6 w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition">
            Confirm
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
    </div>
  )
};

export default PreJoin;
