'use client';

import React, {useEffect, useRef, useState} from 'react';
import ProfileImage from './ProfileImage';
import {IItemWidgetType} from '@/libs/types/IItemWidgetType';
import SvgMail from '@/assets/svgComponents/SvgMail';
import SvgPhoneCall from '@/assets/svgComponents/SvgPhoneCall';

interface IUserProfile {
  contact: IItemWidgetType[];
}

function UserProfile({contact}: IUserProfile) {
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
      className={`w-full ${isSticky ? 'sticky top-0 left-0 right-0 p-4 shadow-md flex flex-row items-center gap-4 pt-9 bg-base-200 z-10' : 'relative flex flex-col items-center gap-4 -top-14 -mb-8'}`}>
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
      <div className="flex justify-between gap-2 items-center">
        {contact?.map((item: IItemWidgetType) => (
          <>
            {item.value?.email && (
              <button
                key={item.value?.email}
                className="btn btn-primary btn-sm rounded-full">
                <div className="relative w-4 h-4 mr-1 bg-transparent">
                  <SvgMail height={20} width={20} className="text-white" />
                </div>
                <p>Email</p>
              </button>
            )}
            {item.value?.phone && (
              <button
                key={item.value?.phone}
                className="btn btn-primary btn-sm rounded-full">
                <div className="relative w-4 h-4 mr-1 bg-transparent">
                  <SvgPhoneCall height={20} width={20} className="text-white" />
                </div>
                <p>Call</p>
              </button>
            )}
          </>
        ))}
      </div>
    </div>
  );
}

export default UserProfile;
