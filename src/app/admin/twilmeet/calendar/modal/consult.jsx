import React, {useState} from 'react';

const ConsultationForm = ({isOpen, onClose}) => {
  if (!isOpen) return null;

  // eslint-disable-next-line react-hooks/rules-of-hooks
  const [formData, setFormData] = useState({
    startTime: '',
    endTime: '',
    repeat: 'None',
    category: 'Consult',
    thumbnail:
      'https://marketplace.canva.com/EAFt0jGMiI0/1/0/1600w/canva-putih-dan-oranye-geometric-business-webinar-zoom-virtual-background-RD3_Ft3xv5A.jpg',
    title: '',
    type: 'Consult',
    desc: '',
    //
    date: 'string',
    time: 'string',
    //
    languange: '',
    tags: '',
    price: 0,
    isPaid: false,
    isCertificate: false,
    isClass: false,
    classes: [],
  });

  const handleChange = e => {
    const {name, value, type, checked} = e.target;
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value,
    });
  };

  const handleSubmit = async e => {
    const token = localStorage.getItem('authToken');
    e.preventDefault();
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/v1/Twilmeet`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(formData),
        },
      );

      if (response.ok) {
        window.location.reload();
      } else {
        alert('Failed to create consultation');
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex justify-center items-center z-[99999] rounded-3xl">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-md p-6 bg-white rounded-3xl shadow-lg space-y-4">
        <h2 className="text-xl font-semibold text-gray-700">
          Create 1 on 1 Consultation
        </h2>

        {/* Start and End Time */}
        {/* Date and Time */}
        <div className="grid grid-cols-2 gap-4">
          <div className="col-span-2">
            <label className="block text-sm font-medium text-gray-700">
              Consult Title
            </label>
            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleChange}
              required
              className="w-full border border-gray-200 rounded-md shadow-sm focus:ring-gray-950 focus:ring-gray-950 p-2 my-2 text-[12px]"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Date
            </label>
            <input
              type="date"
              name="date"
              value={formData.date}
              onChange={handleChange}
              required
              className="w-full border border-gray-200 rounded-md shadow-sm focus:ring-gray-950 focus:ring-gray-950 p-2 my-2 text-[12px]"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Time
            </label>
            <input
              type="time"
              name="time"
              value={formData.time}
              onChange={handleChange}
              required
              className="w-full border border-gray-200 rounded-md shadow-sm focus:ring-gray-950 focus:ring-gray-950 p-2 my-2 text-[12px]"
            />
          </div>
        </div>

        {/* Repeat Options */}
        <div className="space-y-2">
          <label className="block text-sm font-medium text-gray-700">
            Repeat Every
          </label>
          <select
            name="repeat"
            value={formData.repeat}
            onChange={handleChange}
            className="w-full border border-gray-200 rounded-md shadow-sm focus:ring-gray-950 focus:ring-gray-950 p-2 my-2 text-[12px]">
            <option value="None">None</option>
            <option value="Every Day">Every Day</option>
            <option value="Every Week">Every Week</option>
            <option value="Every Month">Every Month</option>
            <option value="Specific Day">Specific Day</option>
          </select>
        </div>

        {/* Consultation Type */}
        {/* <div className="space-y-2">
          <label className="block text-sm font-medium text-gray-700">
            Consultation Type
          </label>
          <div className="flex space-x-4">
            <label className="flex items-center space-x-2">
              <input
                type="radio"
                name="category"
                value="Video Call"
                checked={formData.category === 'Video Call'}
                onChange={handleChange}
              />
              <span>Video Call</span>
            </label>
            <label className="flex items-center space-x-2">
              <input
                type="radio"
                name="category"
                value="Chat"
                checked={formData.category === 'Chat'}
                onChange={handleChange}
              />
              <span>Chat</span>
            </label>
          </div>
        </div> */}

        {/* Paid and Price */}
        {/* paid */}
        <div className="flex items-center space-x-4 py-2">
          <div className="p-4 rounded-lg border border-gray-200 bg-gray-50 w-96">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center space-x-2">
                <span className="text-xl">
                  <svg
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg">
                    <path
                      fill-rule="evenodd"
                      clip-rule="evenodd"
                      d="M5.99999 5.25001L15.9689 5.25C16.0778 5.43861 16.2036 5.61588 16.3444 5.77983C16.0565 6.04499 15.859 6.3841 15.7645 6.75L6 6.75001C4.75736 6.75002 3.75 7.75738 3.75 9.00002V15C3.75 16.2426 4.75736 17.25 6 17.25H18C19.2426 17.25 20.25 16.2426 20.25 15V10.5613C20.6081 10.2742 20.8654 9.86648 20.9601 9.39969C21.2542 9.20084 21.516 8.95868 21.7367 8.68186C21.7455 8.78674 21.75 8.89284 21.75 8.99999V15C21.75 17.0711 20.0711 18.75 18 18.75H6C3.92893 18.75 2.25 17.0711 2.25 15V9.00002C2.25 6.92895 3.92893 5.25002 5.99999 5.25001ZM12 10.75C11.3096 10.75 10.75 11.3096 10.75 12C10.75 12.6904 11.3096 13.25 12 13.25C12.6904 13.25 13.25 12.6904 13.25 12C13.25 11.3096 12.6904 10.75 12 10.75ZM9.25 12C9.25 10.4812 10.4812 9.25 12 9.25C13.5188 9.25 14.75 10.4812 14.75 12C14.75 13.5188 13.5188 14.75 12 14.75C10.4812 14.75 9.25 13.5188 9.25 12ZM5 12C5 11.5858 5.33579 11.25 5.75 11.25H6.25C6.66421 11.25 7 11.5858 7 12C7 12.4142 6.66421 12.75 6.25 12.75H5.75C5.33579 12.75 5 12.4142 5 12ZM17 12C17 11.5858 17.3358 11.25 17.75 11.25H18.25C18.6642 11.25 19 11.5858 19 12C19 12.4142 18.6642 12.75 18.25 12.75H17.75C17.3358 12.75 17 12.4142 17 12Z"
                      fill="#B2B6C7"
                    />
                    <path
                      d="M19 2C18.7367 2 18.478 2.06931 18.25 2.20096C18.022 2.33261 17.8326 2.52197 17.701 2.75C17.5693 2.97803 17.5 3.23669 17.5 3.5C17.5 3.7633 17.5693 4.02197 17.701 4.25C17.8326 4.47803 18.022 4.66739 18.25 4.79904C18.478 4.93069 18.7367 5 19 5C19.2633 5 19.522 5.06931 19.75 5.20096C19.978 5.33261 20.1674 5.52197 20.299 5.75C20.4307 5.97803 20.5 6.2367 20.5 6.5C20.5 6.76331 20.4307 7.02197 20.299 7.25C20.1674 7.47803 19.978 7.66739 19.75 7.79904C19.522 7.93069 19.2633 8 19 8M19 2C19.2633 2 19.522 2.06931 19.75 2.20096C19.978 2.33261 20.1674 2.52197 20.299 2.75M19 2L19 1M19 8C18.7367 8 18.478 7.93069 18.25 7.79904C18.022 7.66738 17.8326 7.47803 17.701 7.25M19 8L19 9"
                      stroke="#B2B6C7"
                      stroke-width="1.5"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    />
                  </svg>
                </span>
                <p className="text-sm font-medium text-gray-700">Paid</p>
              </div>
              <button
                type="button"
                onClick={() =>
                  handleChange({
                    target: {
                      name: 'isPaid',
                      type: 'checkbox',
                      checked: !formData.isPaid,
                    },
                  })
                }
                className={`relative inline-flex h-6 w-11 items-center rounded-full ${
                  formData.isPaid ? 'bg-black' : 'bg-gray-300'
                }`}>
                <span
                  className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                    formData.isPaid ? 'translate-x-6' : 'translate-x-1'
                  }`}></span>
              </button>
            </div>
            {formData.isPaid && (
              <div className="flex items-center space-x-4">
                <div className="flex items-center border border-gray-300 rounded-md overflow-hidden py-2">
                  <select
                    className="bg-gray-50 px-1 text-sm border-r border-gray-300 focus:outline-none"
                    defaultValue="USD">
                    <option value="USD">USD</option>
                    <option value="IDR">IDR</option>
                  </select>
                  <input
                    className="w-50 px-2 text-sm focus:outline-none"
                    type="number"
                    name="price"
                    value={formData.price}
                    onChange={handleChange}
                    placeholder="Price"
                    min="0"
                    step="0.01"
                  />
                </div>
                <p className="text-sm text-gray-500">
                  10% fee will be charged for each attendee
                </p>
              </div>
            )}
          </div>
        </div>

        {/* Buttons */}
        <div className="flex justify-between">
          <button
            onClick={onClose}
            type="button"
            className="py-2 px-4 bg-text-300 rounded-lg shadow border border-black">
            Cancel
          </button>
          <button
            type="submit"
            className="py-2 px-4 bg-gray-600 text-white rounded-lg shadow hover:bg-white-500">
            Publish
          </button>
        </div>
      </form>
    </div>
  );
};

export default ConsultationForm;
