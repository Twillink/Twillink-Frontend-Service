'use client';
import React, {useEffect, useState} from 'react';
import Image from 'next/image';

interface IProfileImage {
  onPhotoChange: (file: File | null) => void;
  isSticky: boolean;
  urlImage?: string;
}

const ProfileImage: React.FC<IProfileImage> = ({
  onPhotoChange,
  isSticky,
  urlImage,
}) => {
  const [selectedProfileImage, setSelectedProfileImage] = useState<File | null>(
    null,
  );
  const [profileImageUrl, setProfileImageUrl] = useState<string | null>(null);

  useEffect(() => {
    if (selectedProfileImage) {
      const url = URL.createObjectURL(selectedProfileImage);
      setProfileImageUrl(url);

      return () => {
        URL.revokeObjectURL(url);
      };
    } else {
      setProfileImageUrl(null);
    }
  }, [selectedProfileImage]);

  const handleProfileImage = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0] ?? null;
    setSelectedProfileImage(file);
    onPhotoChange(file);
  };
  const size = isSticky ? 'w-[44px] h-[44px]' : 'w-[100px] h-[100px]';
  // const imgSize = isSticky ? 44 : 100;

  return (
    <div>
      <label
        htmlFor="file-upload-user"
        className="block cursor-pointer relative">
        <div
          className={`relative z-10 ${size} rounded-full border-4 border-base-100 overflow-hidden shadow-lg bg-base-100`}>
          {(urlImage ?? profileImageUrl) ? (
            <Image
              src={(urlImage ?? profileImageUrl) as string}
              alt="User Selected Photo"
              className="object-contain"
              fill
            />
          ) : (
            <div className="flex items-center justify-center w-full h-full bg-base-200 text-neutral">
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg">
                <path
                  d="M9.5 4C8.89445 4 8.34829 4.36411 8.11538 4.92308L7.25 7H5C3.34315 7 2 8.34315 2 10V17C2 18.6569 3.34315 20 5 20H19C20.6569 20 22 18.6569 22 17V10C22 8.34315 20.6569 7 19 7H16.75L15.8846 4.92308C15.6517 4.36411 15.1056 4 14.5 4H9.5Z"
                  stroke="#B2B6C7"
                  strokeWidth="1.5"
                />
                <path
                  d="M15 13C15 14.6569 13.6569 16 12 16C10.3431 16 9 14.6569 9 13C9 11.3431 10.3431 10 12 10C13.6569 10 15 11.3431 15 13Z"
                  stroke="#B2B6C7"
                  strokeWidth="1.5"
                />
              </svg>
            </div>
          )}
        </div>
        <input
          type="file"
          accept="image/*"
          onChange={handleProfileImage}
          className="hidden"
          id="file-upload-user"
        />
      </label>
    </div>
  );
};

export default ProfileImage;
