import React, {useState} from 'react';

export default function CreateMeetLinkModal({isOpen, onClose}) {
  if (!isOpen) return null;

  // eslint-disable-next-line react-hooks/rules-of-hooks
  const [meetingLink, setMeetingLink] = useState('');
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const [isLoading, setIsLoading] = useState(false);

  const createMeetLink = async () => {
    window.open(
      'https://twillink/room',
      '_blank',
    );
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-30 flex items-center justify-center">
      <div className="bg-white rounded-lg shadow-lg p-6 w-96">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-medium text-gray-700">
            Create Meet Link
          </h2>
        </div>

        <p className="text-sm text-gray-600 mb-4">
          Here's your joining info. Send this to people you want to meet with.
          Be sure to save it so you can use it later.
        </p>

        {/* Meeting Link */}
        <div className="mb-4">
          <input
            type="text"
            value={meetingLink || 'Twilmeet.com/das-eif-12j'}
            readOnly
            className="w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 px-4 py-2 text-sm"
          />
        </div>

        <div className="flex justify-between">
          <button
            className="py-2 px-4 bg-text-300 rounded-lg shadow border border-black"
            onClick={onClose}>
            Cancel
          </button>
          <button
            className={`px-4 py-2 text-sm text-white rounded-md ${
              isLoading ? 'bg-gray-500' : 'bg-gray-600 hover:bg-gray-500'
            }`}
            onClick={createMeetLink}
            disabled={isLoading}>
            {isLoading ? 'Loading...' : 'Join Room'}
          </button>
        </div>
      </div>
    </div>
  );
}
