'use client';
import { useState } from 'react';
import Image from 'next/image';

export default function PaymentPage() {
  const [paymentMethod, setPaymentMethod] = useState('Stripe');

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100 p-4">
      <div className="bg-white rounded-xl shadow-lg p-6 w-full max-w-4xl grid grid-cols-2 gap-6">
        {/* Left Side - Form */}
        <div>
          <h2 className="text-xl font-semibold mb-4">Payment</h2>
          <div className="grid grid-cols-2 gap-4">
            <input
              type="text"
              placeholder="First Name"
              className="p-2 border rounded w-full"
              defaultValue="Walter"
            />
            <input
              type="text"
              placeholder="Last Name"
              className="p-2 border rounded w-full"
              defaultValue="White"
            />
          </div>
          <div className="mt-4">
            <input
              type="text"
              placeholder="Phone Number"
              className="p-2 border rounded w-full"
              defaultValue="+62 987654321"
            />
          </div>
          <div className="mt-4">
            <input
              type="email"
              placeholder="Your mail"
              className="p-2 border rounded w-full"
            />
          </div>
          <div className="mt-4">
            <h3 className="text-md font-medium mb-2">Payment Option</h3>
            <div className="flex space-x-4">
              <label className="flex items-center space-x-2 cursor-pointer">
                <input
                  type="radio"
                  name="payment"
                  className="hidden"
                  checked={paymentMethod === 'Paypal'}
                  onChange={() => setPaymentMethod('Paypal')}
                />
                <span className={`px-4 py-2 border rounded-lg ${paymentMethod === 'Paypal' ? 'border-blue-500' : 'border-gray-300'}`}>Paypal</span>
              </label>
              <label className="flex items-center space-x-2 cursor-pointer">
                <input
                  type="radio"
                  name="payment"
                  className="hidden"
                  checked={paymentMethod === 'Stripe'}
                  onChange={() => setPaymentMethod('Stripe')}
                />
                <span className={`px-4 py-2 border rounded-lg ${paymentMethod === 'Stripe' ? 'border-blue-500' : 'border-gray-300'}`}>Stripe</span>
              </label>
            </div>
          </div>
          <button className="mt-6 w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition">
            Confirm & Pay
          </button>
        </div>

        {/* Right Side - Summary */}
        <div className="bg-gray-50 p-4 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold mb-4">Summary</h2>
          <div className="flex items-center space-x-4">
            <Image src={event.thumbnail} alt="Event" width={80} height={80} className="rounded-md" />
            <div>
              <h3 className="text-md font-medium">Leading with Emotional Intelligence: Maximizing Your Management Potential</h3>
            </div>
          </div>
          <div className="mt-4 text-gray-600">
            <p className="font-semibold">Class "How to get Visa"</p>
            <p>Saturday, August 26th, 2024</p>
            <p>14:00 - 16:00</p>
          </div>
          <div className="mt-4 border-t pt-4 text-gray-700">
            <p className="flex justify-between"><span>Subtotal</span> <span>USD 15.00</span></p>
            <p className="flex justify-between"><span>VAT 11%</span> <span>USD 1.00</span></p>
            <p className="flex justify-between font-semibold mt-2 text-lg"><span>Total</span> <span>USD 16.00</span></p>
          </div>
        </div>
      </div>
    </div>
  );
}
