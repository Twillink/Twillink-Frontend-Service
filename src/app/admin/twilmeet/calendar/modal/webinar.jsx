/* eslint-disable react-hooks/rules-of-hooks */
import {apiAddAttachment} from '@/libs/api';
import { useAppDispatch } from '@/libs/hooks/useReduxHook';
import {Calendar, Trash, User} from 'lucide-react';
import React, {useState} from 'react';

const CreateWebinarForm = ({isOpen, onClose}) => {
  if (!isOpen) return null;
  const [file, setFile] = useState(null); // Initial value
  const [preview, setPreview] = useState(null);
  const [fileName, setFileName] = useState('');
  const dispatch = useAppDispatch();

  // eslint-disable-next-line react-hooks/rules-of-hooks
  const [formData, setFormData] = useState({
    thumbnail:
      'https://marketplace.canva.com/EAFt0jGMiI0/1/0/1600w/canva-putih-dan-oranye-geometric-business-webinar-zoom-virtual-background-RD3_Ft3xv5A.jpg',
    title: '',
    type: 'Webinar',
    desc: '',
    date: '',
    time: '',
    category: [],
    language: [],
    tags: '',
    isPaid: false,
    price: 0,
    isCertificate: false,
    isClass: false,
    classes: [],
  });

  const [classes, setClasses] = useState([{id: 1, title: '', name: 'Class 1'}]);

  const handleAddClass = () => {
    const newId = classes.length + 1;
    setClasses([...classes, {id: newId, title: '', name: `Class ${newId}`}]);
  };

  const handleChangeClass = (id, value) => {
    const updatedClasses = classes.map(cls =>
      cls.id === id ? {...cls, title: value} : cls,
    );
    setClasses(updatedClasses);
  };

  const handleDeleteClass = id => {
    const updatedClasses = classes.filter(cls => cls.id !== id);
    setClasses(updatedClasses);
  };

  const [tags, setTags] = useState([]);
  const [inputValue, setInputValue] = useState('');

  const handleRemoveTag = tagToRemove => {
    setTags(tags.filter(tag => tag !== tagToRemove));
  };

  const category = [
    'Traveling',
    'Photography',
    'Music',
    'Architecture',
    'Design',
    'Television',
    'History',
    'Meditation',
    'Art',
    'Writing',
    'Entertainment',
    'Psychology',
    'Gym',
    'Technology',
    'Business',
  ];

  const languanges = [
    {name: 'Indonesia', flag: '🇮🇩'},
    {name: 'English', flag: '🇬🇧'},
  ];

  const handleChange = e => {
    const {name, value, type, checked} = e.target;
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value,
    });
  };

  const handleCategorySelect = category => {
    setFormData(prevData => {
      const selected = prevData.category.includes(category);
      return {
        ...prevData,
        category: selected
          ? prevData.category.filter(cat => cat !== category)
          : [...prevData.category, category],
      };
    });
  };

  const handleLanguageSelect = lang => {
    setFormData(prevData => {
      const selected = prevData.language.includes(lang);
      return {
        ...prevData,
        language: selected
          ? prevData.language.filter(l => l !== lang)
          : [...prevData.language, lang],
      };
    });
  };

  const handleSubmit = async e => {
    const token = localStorage.getItem('authToken');

    try {
      let urlThumbnail =
        'https://marketplace.canva.com/EAFt0jGMiI0/1/0/1600w/canva-putih-dan-oranye-geometric-business-webinar-zoom-virtual-background-RD3_Ft3xv5A.jpg'; // Default thumbnail URL

      // If there is a file, upload it
      if (file !== null) {
        const responseUpload = await apiAddAttachment(dispatch, {
          files: [file],
        });
        urlThumbnail = responseUpload?.data?.path;
      }

      // Prepare the formatted data
      const formattedData = {
        ...formData,
        thumbnail: urlThumbnail, // Set the thumbnail URL based on the file upload or default
        category: formData.category.join(','), // Converts array to string 'uang,banyak'
        language: formData.language.join(','), // Converts language array to string
        tags: tags.join(','),
        classes: classes.map(cls => cls.title),
        type: formData.isClass === true ? 'Class' : 'Webinar',
      };

      // Send the request
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/v1/Twilmeet`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(formattedData),
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

  const handleFileChange = e => {
    const selectedFile = e.target.files?.[0];
    if (selectedFile) {
      // Optional: Check for valid file types and size
      if (selectedFile.size > 100 * 1024 * 1024) {
        // 10MB limit
        alert('File size exceeds 10MB!');
        return;
      }

      if (selectedFile) {
        // Only proceed if the file is not null or undefined
        setFileName(selectedFile.name); // Set the file name
        if (selectedFile.type.startsWith('image/')) {
          const reader = new FileReader();
          reader.onloadend = () => {
            setPreview(reader.result); // Set the image preview
          };
          reader.readAsDataURL(selectedFile); // Read the file as a data URL
        } else {
          setPreview(null); // Clear the image preview if the file is not an image
        }
      } else {
        // Handle the case where no file is selected
        setPreview(null); // Clear preview
        setFileName(''); // Clear file name
      }

      setFile(selectedFile);
    } else {
      alert('No file selected.');
    }
  };

  const handleInputChange = e => {
    setInputValue(e.target.value);
  };

  const handleInputKeyDown = e => {
    if (e.key === 'Enter' && inputValue.trim() !== '') {
      if (!tags.includes(inputValue.trim())) {
        setTags([...tags, inputValue.trim()]);
        setInputValue('');
      } else {
        alert('Tag already exists!');
      }
    }
  };

  return (
    <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex justify-center items-center z-[99999] rounded-3xl">
      <div
        className={`w-full ${!formData.isClass === true ? ' max-w-3xl' : ' max-w-5xl'} p-6 bg-white rounded-3xl shadow-3xl space-y-4 max-h-screen`}>
        <h2 className="text-2xl font-semibold text-gray-700">Create Webinar</h2>

        <div
          className={`grid ${!formData.isClass === true ? 'grid-cols-2' : 'grid-cols-3'} gap-4`}>
          {/* Title and Description */}
          <div className="col-span-1">
            <div className="">
              <div className="text-center">
                <div className="mt-4 flex text-sm/6 text-gray-600">
                  <label
                    htmlFor="file-upload"
                    className="font-extralight my-2  w-full py-5 border border-gray-200 relative cursor-pointer rounded-md bg-white font-semibold text-black focus-within:outline-none focus-within:ring-2 focus-within:bg-gray-300 focus-within:ring-offset-2">
                    {!preview && <span>Add Thumnail Image</span>}
                    <input
                      id="file-upload"
                      name="file-upload"
                      type="file"
                      className="sr-only"
                      onChange={handleFileChange}
                      accept=".png, .jpeg, .jpg"
                    />
                    {preview && (
                      <div>
                        <img
                          src={preview}
                          alt="Preview"
                          width={100}
                          height={100}
                          className="bg-cover"
                        />
                      </div>
                    )}
                  </label>
                </div>
              </div>
            </div>
            <div>
              <label className="font-extralight block text-sm font-medium text-gray-700">
                Webinar Title
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
              <label className="font-extralight block text-sm font-medium text-gray-700">
                Description
              </label>
              <textarea
                name="desc"
                value={formData.desc}
                onChange={handleChange}
                required
                className="w-full border border-gray-200 rounded-md shadow-sm focus:ring-gray-950 focus:ring-gray-950 p-2 my-2 text-[12px]"></textarea>
            </div>

            {/* Date and Time */}
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="font-extralight block text-sm font-medium text-gray-700">
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
                <label className="font-extralight block text-sm font-medium text-gray-700 text-[12px]">
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

            {/* category */}
            <div>
              <label className="font-extralight block text-sm font-medium text-gray-700">
                Select Category
              </label>
              <div className="flex flex-wrap gap-2 mt-2">
                {category.map(category => (
                  <button
                    key={category}
                    type="button"
                    onClick={() => handleCategorySelect(category)}
                    className={`px-3 py-1 rounded-lg border ${
                      formData.category.includes(category)
                        ? 'bg-gray-800 text-white text-[12px]'
                        : 'bg-gray-200 text-gray-700 text-[12px]'
                    }`}>
                    {category}
                  </button>
                ))}
              </div>
            </div>
          </div>
          <div className="col-span-1">
            <div>
              <label className="font-extralight block text-sm font-medium text-gray-700">
                Select Languange
              </label>
              <div className="flex flex-wrap gap-2 mt-2">
                {languanges.map(category => (
                  <button
                    key={category.name}
                    type="button"
                    onClick={() => handleLanguageSelect(category.name)}
                    className={`px-3 py-1 rounded-lg border ${
                      formData.language.includes(category.name)
                        ? 'bg-gray-800 text-white text-[12px]'
                        : 'bg-gray-200 text-gray-700 text-[12px]'
                    }`}>
                    {category.flag} {category.name}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label className="font-extralight block text-sm font-medium text-gray-700 my-2">
                Tags
              </label>
              <div className="flex flex-wrap items-center gap-2 border rounded-md p-2 my-2">
                {tags.map((tag, index) => (
                  <div
                    key={index}
                    className="px-3 py-1 rounded-lg border text-[12px]">
                    <span>{tag}</span>
                    <button
                      type="button"
                      onClick={() => handleRemoveTag(tag)}
                      className="text-gray-400 hover:text-gray-600 focus:outline-none pl-2">
                      &times;
                    </button>
                  </div>
                ))}

                {/* Input Field */}
                <input
                  type="text"
                  value={inputValue}
                  onChange={handleInputChange}
                  onKeyDown={handleInputKeyDown}
                  placeholder="Add a tag"
                  className="flex-grow p-1 text-sm border-none focus:ring-0 focus:outline-none"
                />
              </div>
            </div>
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
                          d="M6.5 20H5C3.89543 20 3 19.1046 3 18V4C3 2.89543 3.89543 2 5 2H19C20.1046 2 21 2.89543 21 4V18C21 19.1046 20.1046 20 19 20H17.5M12 19C13.6569 19 15 17.6569 15 16C15 14.3431 13.6569 13 12 13C10.3431 13 9 14.3431 9 16C9 17.6569 10.3431 19 12 19ZM12 19L12.0214 18.9998L8.82867 22.1926L6.00024 19.3641L9.01965 16.3447M12 19L15.1928 22.1926L18.0212 19.3641L15.0018 16.3447M9 6H15M7 9.5H17"
                          stroke="#B2B6C7"
                          stroke-width="1.5"
                          stroke-linecap="round"
                          stroke-linejoin="round"
                        />
                      </svg>
                    </span>
                    <p className="text-sm font-medium text-gray-700">
                      Certificate
                    </p>
                  </div>
                  <button
                    type="button"
                    onClick={() =>
                      handleChange({
                        target: {
                          name: 'isCertificate',
                          type: 'checkbox',
                          checked: !formData.isCertificate,
                        },
                      })
                    }
                    className={`relative inline-flex h-6 w-11 items-center rounded-full ${
                      formData.isCertificate ? 'bg-black' : 'bg-gray-300'
                    }`}>
                    <span
                      className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                        formData.isCertificate
                          ? 'translate-x-6'
                          : 'translate-x-1'
                      }`}></span>
                  </button>
                </div>
                <div className="flex items-center space-x-4">
                  <svg
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg">
                    <circle
                      cx="12"
                      cy="12"
                      r="11"
                      stroke="#B2B6C7"
                      stroke-width="1.5"
                    />
                    <path
                      d="M12 10.25V16.9583M12 10.25H10.8333M12 10.25H13.1667M12 16.9583H10.25M12 16.9583H13.75M12.5833 7.33333C12.5833 7.6555 12.3222 7.91667 12 7.91667C11.6778 7.91667 11.4167 7.6555 11.4167 7.33333C11.4167 7.01117 11.6778 6.75 12 6.75C12.3222 6.75 12.5833 7.01117 12.5833 7.33333Z"
                      stroke="#B2B6C7"
                      stroke-width="1.5"
                      stroke-linecap="round"
                    />
                  </svg>
                  <p className="text-sm text-gray-500">
                    You need to prepare all certificate before event started
                  </p>
                </div>
              </div>
            </div>

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
                        <rect
                          x="1"
                          y="1"
                          width="22"
                          height="22"
                          rx="6"
                          stroke="#B2B6C7"
                          stroke-width="1.5"
                        />
                        <path
                          d="M17.8337 17.25V16.0833C17.8337 14.9961 17.09 14.0825 16.0837 13.8235M14.042 6.91961C14.8971 7.26575 15.5003 8.1041 15.5003 9.08333C15.5003 10.0626 14.8971 10.9009 14.042 11.2471M14.917 17.25C14.917 16.1628 14.917 15.6192 14.7394 15.1904C14.5026 14.6187 14.0483 14.1644 13.4766 13.9276C13.0478 13.75 12.5042 13.75 11.417 13.75H9.66699C8.5798 13.75 8.0362 13.75 7.6074 13.9276C7.03567 14.1644 6.58143 14.6187 6.34461 15.1904C6.16699 15.6192 6.16699 16.1628 6.16699 17.25M12.8753 9.08333C12.8753 10.372 11.8307 11.4167 10.542 11.4167C9.25333 11.4167 8.20866 10.372 8.20866 9.08333C8.20866 7.79467 9.25333 6.75 10.542 6.75C11.8307 6.75 12.8753 7.79467 12.8753 9.08333Z"
                          stroke="#B2B6C7"
                          stroke-width="1.5"
                          stroke-linecap="round"
                          stroke-linejoin="round"
                        />
                      </svg>
                    </span>
                    <p className="text-sm font-medium text-gray-700">Class</p>
                  </div>
                  <button
                    type="button"
                    onClick={() =>
                      handleChange({
                        target: {
                          name: 'isClass',
                          type: 'checkbox',
                          checked: !formData.isClass,
                        },
                      })
                    }
                    className={`relative inline-flex h-6 w-11 items-center rounded-full ${
                      formData.isClass ? 'bg-black' : 'bg-gray-300'
                    }`}>
                    <span
                      className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                        formData.isClass ? 'translate-x-6' : 'translate-x-1'
                      }`}></span>
                  </button>
                </div>
                <div className="flex items-center space-x-4">
                  <svg
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg">
                    <circle
                      cx="12"
                      cy="12"
                      r="11"
                      stroke="#B2B6C7"
                      stroke-width="1.5"
                    />
                    <path
                      d="M12 10.25V16.9583M12 10.25H10.8333M12 10.25H13.1667M12 16.9583H10.25M12 16.9583H13.75M12.5833 7.33333C12.5833 7.6555 12.3222 7.91667 12 7.91667C11.6778 7.91667 11.4167 7.6555 11.4167 7.33333C11.4167 7.01117 11.6778 6.75 12 6.75C12.3222 6.75 12.5833 7.01117 12.5833 7.33333Z"
                      stroke="#B2B6C7"
                      stroke-width="1.5"
                      stroke-linecap="round"
                    />
                  </svg>
                  <p className="text-sm text-gray-500">
                    Class allow you to create a series of webinar
                  </p>
                </div>
              </div>
            </div>
          </div>
          {formData.isClass && (
            <div className="col-span-1  overflow-auto">
              <div className="space-y-4">
                {classes.map(cls => (
                  <div
                    key={cls.id}
                    className="border border-gray-200 rounded-lg p-4 bg-gray-50">
                    <div className="flex justify-between items-center">
                      <h2 className="text-sm font-extralight">{cls.name}</h2>
                      <div className="flex space-x-2">
                        <button
                          onClick={() => handleDeleteClass(cls.id)}
                          className="text-red-400">
                          <Trash width={20} />
                        </button>
                      </div>
                    </div>
                    <label className="block text-sm font-medium text-gray-600 mb-1">
                      Title
                    </label>
                    <input
                      type="text"
                      value={cls.title}
                      onChange={e => handleChangeClass(cls.id, e.target.value)}
                      placeholder="Enter title"
                      className="w-full border-gray-300 rounded-md p-2 text-[12px] border"
                    />
                  </div>
                ))}
              </div>
              <button
                onClick={handleAddClass}
                className="mt-4 px-4 py-2 bg-black text-white text-sm rounded-md hover:bg-black-700">
                Add New Class
              </button>
            </div>
          )}
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
            onClick={handleSubmit}
            className="py-2 px-4 bg-gray-600 text-white rounded-lg shadow hover:bg-white-500">
            Publish
          </button>
        </div>
      </div>
    </div>
  );
};

export default CreateWebinarForm;
