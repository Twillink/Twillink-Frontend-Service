'use client';

import Image from 'next/image';
import React, {useCallback, useEffect, useRef, useState} from 'react';

const ScrollHideHeader: React.FC = () => {
  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const [selectedUserPhoto, setSelectedUserPhoto] = useState<File | null>(null);
  const [scrollOffset, setScrollOffset] = useState<number>(0);
  const [imageUrl, setImageUrl] = useState<string | null>(null);
  const [userPhotoUrl, setUserPhotoUrl] = useState<string | null>(null);
  const headerRef = useRef<HTMLDivElement | null>(null);
  const headerHeight = 175;

  const handleScroll = useCallback(() => {
    const headerElement = headerRef.current;
    if (headerElement) {
      const scrollContainer = headerElement.parentElement;
      if (scrollContainer) {
        const currentScrollY = scrollContainer.scrollTop;
        const offset = Math.min(currentScrollY, headerHeight);
        setScrollOffset(offset);
      }
    }
  }, [headerHeight]);

  useEffect(() => {
    const headerElement = headerRef.current;
    const scrollContainer = headerElement?.parentElement;
    scrollContainer?.addEventListener('scroll', handleScroll);

    return () => {
      scrollContainer?.removeEventListener('scroll', handleScroll);
    };
  }, [handleScroll]);

  useEffect(() => {
    if (selectedImage) {
      const url = URL.createObjectURL(selectedImage);
      setImageUrl(url);

      return () => {
        URL.revokeObjectURL(url);
      };
    } else {
      setImageUrl(null);
    }
  }, [selectedImage]);

  useEffect(() => {
    if (selectedUserPhoto) {
      const url = URL.createObjectURL(selectedUserPhoto);
      setUserPhotoUrl(url);

      return () => {
        URL.revokeObjectURL(url);
      };
    } else {
      setUserPhotoUrl(null);
    }
  }, [selectedUserPhoto]);

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0] ?? null;
    if (file) {
      setSelectedImage(file);
    }
  };

  const handleUserPhotoUpload = (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    const file = event.target.files?.[0] ?? null;
    if (file) {
      setSelectedUserPhoto(file);
    }
  };

  return (
    <div
      ref={headerRef}
      style={{
        transform: `translateY(-${scrollOffset}px)`,
        transition: 'transform 0.1s ease-out',
      }}
      className={`sticky w-full bg-contras-med z-10 shadow-lg rounded-2xl`}>
      <label
        htmlFor="file-upload-header"
        className={`sticky w-full bg-contras-med cursor-pointer`}>
        <input
          type="file"
          accept="image/*"
          onChange={handleImageUpload}
          className="hidden"
          id="file-upload-header"
        />

        {imageUrl ? (
          <div className="flex justify-center">
            <Image
              src={imageUrl}
              alt="Selected Preview"
              className="max-w-full h-[136px] w-full object-cover rounded-2xl"
              width={0}
              height={0}
              sizes="100vw"
            />
          </div>
        ) : (
          <div className="h-[136px] flex justify-center items-center">
            <div className="text-[#B2B6C7] flex text-base items-center gap-3 font-normal">
              <svg
                width="17"
                height="16"
                viewBox="0 0 17 16"
                fill="none"
                xmlns="http://www.w3.org/2000/svg">
                <path
                  d="M8.50008 1.66675V8.00008M8.50008 8.00008V14.3334M8.50008 8.00008H14.8334M8.50008 8.00008L2.16675 8.00008"
                  stroke="#B2B6C7"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
              <div>Browse Image</div>
            </div>
          </div>
        )}
      </label>

      <div className="absolute top-[68px] left-1/2 transform -translate-x-1/2">
        <label
          htmlFor="file-upload-user"
          className="relative block cursor-pointer">
          <div className="relative w-[100px] h-[100px] rounded-full border-4 border-white overflow-hidden shadow-lg bg-base-100">
            {userPhotoUrl ? (
              <Image
                src={userPhotoUrl}
                alt="User Selected Photo"
                className="object-cover"
                width={100}
                height={100}
              />
            ) : (
              <div className="flex items-center justify-center w-full h-full bg-contras-med text-gray-500">
                <svg
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg">
                  <path
                    d="M9.5 4C8.89445 4 8.34829 4.36411 8.11538 4.92308L7.25 7H5C3.34315 7 2 8.34315 2 10V17C2 18.6569 3.34315 20 5 20H19C20.6569 20 22 18.6569 22 17V10C22 8.34315 20.6569 7 19 7H16.75L15.8846 4.92308C15.6517 4.36411 15.1056 4 14.5 4H9.5Z"
                    stroke="#B2B6C7"
                    stroke-width="1.5"
                  />
                  <path
                    d="M15 13C15 14.6569 13.6569 16 12 16C10.3431 16 9 14.6569 9 13C9 11.3431 10.3431 10 12 10C13.6569 10 15 11.3431 15 13Z"
                    stroke="#B2B6C7"
                    stroke-width="1.5"
                  />
                </svg>
              </div>
            )}
          </div>

          <input
            type="file"
            accept="image/*"
            onChange={handleUserPhotoUpload}
            className="hidden"
            id="file-upload-user"
          />
        </label>
      </div>
    </div>
  );
};

export default ScrollHideHeader;
