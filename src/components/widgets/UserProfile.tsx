import React, {useState} from 'react';

const UserProfile: React.FC = () => {
  const [editingSection, setEditingSection] = useState<
    'none' | 'businessName' | 'caption'
  >('none');
  const [businessName, setBusinessName] = useState('Business Name');
  const [caption, setCaption] = useState('Caption');

  const handleEditClick = (section: 'businessName' | 'caption') => {
    setEditingSection(section);
  };

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    section: 'businessName' | 'caption',
  ) => {
    if (section === 'businessName') {
      setBusinessName(e.target.value);
    } else {
      setCaption(e.target.value);
    }
  };

  const handleBlur = () => {
    setEditingSection('none');
  };

  return (
    <div className="flex justify-center flex-col items-center w-full gap-4">
      <div
        onClick={() => handleEditClick('businessName')}
        className="cursor-pointer">
        {editingSection === 'businessName' ? (
          <input
            type="text"
            value={businessName}
            onChange={e => handleInputChange(e, 'businessName')}
            onBlur={handleBlur}
            autoFocus
            className="border border-gray-300 p-1"
          />
        ) : (
          <h2 className="font-bold">{businessName}</h2>
        )}
      </div>
      <div
        onClick={() => handleEditClick('caption')}
        className="cursor-pointer">
        {editingSection === 'caption' ? (
          <input
            type="text"
            value={caption}
            onChange={e => handleInputChange(e, 'caption')}
            onBlur={handleBlur}
            autoFocus
            className="border border-gray-300 p-1"
          />
        ) : (
          <p className="text-base font-normal">{caption}</p>
        )}
      </div>
    </div>
  );
};

export default UserProfile;
