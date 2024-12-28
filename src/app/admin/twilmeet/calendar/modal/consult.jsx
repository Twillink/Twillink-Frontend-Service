import React, {useState} from 'react';

const ConsultationForm = ({isOpen, onClose}) => {
  if (!isOpen) return null;

  // eslint-disable-next-line react-hooks/rules-of-hooks
  const [formData, setFormData] = useState({
    startTime: '',
    endTime: '',
    repeat: 'None',
    category: 'Consult',
    thumbnail: 'https://marketplace.canva.com/EAFt0jGMiI0/1/0/1600w/canva-putih-dan-oranye-geometric-business-webinar-zoom-virtual-background-RD3_Ft3xv5A.jpg',
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
              className="w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
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
              className="w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
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
              className="w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
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
            className="w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500">
            <option value="None">None</option>
            <option value="Every Day">Every Day</option>
            <option value="Every Week">Every Week</option>
            <option value="Every Month">Every Month</option>
            <option value="Specific Day">Specific Day</option>
          </select>
        </div>

        {/* Consultation Type */}
        <div className="space-y-2">
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
            {/* <label className="flex items-center space-x-2">
              <input
                type="radio"
                name="category"
                value="Chat"
                checked={formData.category === 'Chat'}
                onChange={handleChange}
              />
              <span>Chat</span>
            </label> */}
          </div>
        </div>

        {/* Paid and Price */}
        <div className="flex items-center space-x-4">
          <label className="flex items-center space-x-2">
            <input
              type="checkbox"
              name="isPaid"
              checked={formData.isPaid}
              onChange={handleChange}
            />
            <span>Paid</span>
          </label>
          {formData.isPaid && (
            <input
              type="number"
              name="price"
              value={formData.price}
              onChange={handleChange}
              className="border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
              placeholder="Price"
              min="0"
              step="0.01"
            />
          )}
        </div>

        {/* Buttons */}
        <div className="flex justify-between">
          <button
            onClick={onClose}
            type="button"
            className="py-2 px-4 bg-gray-300 rounded-lg shadow">
            Cancel
          </button>
          <button
            type="submit"
            className="py-2 px-4 bg-indigo-600 text-white rounded-lg shadow hover:bg-indigo-500">
            Publish
          </button>
        </div>
      </form>
    </div>
  );
};

export default ConsultationForm;
