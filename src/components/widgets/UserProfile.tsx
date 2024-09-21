'use client';

import React, {useState, useEffect, useRef} from 'react';
import ProfileImage from './ProfileImage';

const UserProfile: React.FC = () => {
  const [isSticky, setIsSticky] = useState<boolean>(false);
  const [editingSection, setEditingSection] = useState<
    'none' | 'businessName' | 'caption'
  >('none');
  const [businessName, setBusinessName] = useState('Walter White');
  const [caption, setCaption] = useState('Chemistry Master');
  const profileRef = useRef<HTMLDivElement | null>(null);

  const handleScroll = () => {
    const scrollContainer = profileRef.current?.parentElement;
    if (scrollContainer) {
      const scrollTop = scrollContainer.scrollTop;
      setIsSticky(scrollTop > 50);
    }
  };

  useEffect(() => {
    const scrollContainer = profileRef.current?.parentElement;
    if (scrollContainer) {
      scrollContainer.addEventListener('scroll', handleScroll);
      return () => {
        scrollContainer.removeEventListener('scroll', handleScroll);
      };
    }
  }, [profileRef]);

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
    <div
      ref={profileRef}
      className={`w-full ${isSticky ? 'sticky top-0 left-0 right-0 p-4 shadow-md flex flex-row items-center gap-4 pt-9 bg-base-200' : 'relative flex flex-col items-center gap-4 -top-14'}`}>
      <div>
        <ProfileImage
          onPhotoChange={file => console.log('Photo changed:', file)}
          isSticky={isSticky}
        />
      </div>
      <div
        className={`flex flex-col justify-center ${isSticky ? '' : 'text-center'}`}>
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
            <h2
              className={`font-bold ${isSticky ? 'text-xl leading-none' : 'text-lg'}`}>
              {businessName}
            </h2>
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
            <p
              className={`${isSticky ? 'text-xs' : 'text-base'} font-normal text-gray-500`}>
              {caption}
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default UserProfile;
