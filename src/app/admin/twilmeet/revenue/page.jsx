// pages/index.js
'use client';

import React, {useState} from 'react';

const mockData = {
  revenue: 1239293.0,
  transactions: [
    {
      id: 1,
      title: '1 on 1 Consultation',
      description: 'with John Marston',
      amount: 5.0,
      date: '20 Aug 2024',
    },
    {
      id: 2,
      title: 'Webinar',
      description: '200 attendees',
      amount: 200.0,
      date: '21 Aug 2024',
    },
    {
      id: 3,
      title: '1 on 1 Consultation',
      description: 'with John Marston',
      amount: 5.0,
      date: '21 Aug 2024',
    },
    {
      id: 4,
      title: 'Webinar',
      description: '200 attendees',
      amount: 200.0,
      date: '21 Aug 2024',
    },
  ],
};

// const Revenue = () => {
//   const [stripeEnabled, setStripeEnabled] = useState(false);
//   const [paypalEnabled, setPaypalEnabled] = useState(false);

//   return (
//     <div className="w-full  grid grid-cols-1 lg:grid-cols-2 gap-6 h-[80%]">
//       {/* Revenue Section */}
//       <div className="col-span-1 bg-white rounded-3xl p-6 shadow relative">
//         <h3 className="text-gray-500 text-sm">Revenue</h3>
//         <span className="text-3xl font-bold text-gray-900 absolute bottom-4 right-6 text-lg text-gray-500">
//           USD {mockData.revenue.toLocaleString()}
//         </span>
//       </div>

//       {/* My Account Section */}
//       <div className="col-span-1 bg-white rounded-3xl p-6 shadow">
//         <div className="flex justify-between items-center mb-4">
//           <h3 className="text-gray-500 text-sm">My Account</h3>
//           <button className="text-blue-600 text-sm font-semibold">Edit</button>
//         </div>
//         <div className="space-y-4">
//           <div className="flex items-center justify-between">
//             <span className="flex items-center space-x-2">
//               <div className="w-6 h-6 bg-blue-600 text-white rounded-full flex items-center justify-center">
//                 S
//               </div>
//               <span className="text-sm text-gray-700">Stripe</span>
//             </span>
//             <label className="flex items-center">
//               <input
//                 type="checkbox"
//                 className="hidden"
//                 checked={stripeEnabled}
//                 onChange={() => setStripeEnabled(!stripeEnabled)}
//               />
//               <div
//                 className={`w-10 h-5 flex items-center bg-gray-300 rounded-full p-1 cursor-pointer transition-colors duration-200 ${
//                   stripeEnabled ? 'bg-blue-600' : ''
//                 }`}>
//                 <div
//                   className={`bg-white w-4 h-4 rounded-full shadow transform transition-transform duration-200 ${
//                     stripeEnabled ? 'translate-x-5' : ''
//                   }`}></div>
//               </div>
//             </label>
//           </div>
//           <div className="flex items-center justify-between">
//             <span className="flex items-center space-x-2">
//               <div className="w-6 h-6 bg-blue-600 text-white rounded-full flex items-center justify-center">
//                 P
//               </div>
//               <span className="text-sm text-gray-700">Paypal</span>
//             </span>
//             <label className="flex items-center">
//               <input
//                 type="checkbox"
//                 className="hidden"
//                 checked={paypalEnabled}
//                 onChange={() => setPaypalEnabled(!paypalEnabled)}
//               />
//               <div
//                 className={`w-10 h-5 flex items-center bg-gray-300 rounded-full p-1 cursor-pointer transition-colors duration-200 ${
//                   paypalEnabled ? 'bg-blue-600' : ''
//                 }`}>
//                 <div
//                   className={`bg-white w-4 h-4 rounded-full shadow transform transition-transform duration-200 ${
//                     paypalEnabled ? 'translate-x-5' : ''
//                   }`}></div>
//               </div>
//             </label>
//           </div>
//         </div>
//       </div>

//       {/* Transaction Details Section */}
//       <div className="col-span-1 lg:col-span-1 bg-white rounded-3xl p-6 shadow">
//         <h3 className="text-gray-500 text-sm mb-4">Transaction Details</h3>
//         <div className="space-y-4">
//           {mockData.transactions.map(transaction => (
//             <div
//               key={transaction.id}
//               className="flex justify-between items-center">
//               <div>
//                 <p className="text-sm font-semibold text-gray-900">
//                   {transaction.title}
//                 </p>
//                 <p className="text-xs text-gray-500">
//                   {transaction.description}
//                 </p>
//               </div>
//               <div className="text-right">
//                 <p className="text-sm font-semibold text-gray-900">
//                   USD {transaction.amount.toFixed(2)}
//                 </p>
//                 <p className="text-xs text-gray-500">{transaction.date}</p>
//               </div>
//             </div>
//           ))}
//         </div>
//       </div>
//     </div>
//   );
// };

const Revenue = () => {
  return <div className="w-full bg-white p-10 rounded-3xl">Coming Soon</div>;
};

export default Revenue;
