import React, {useRef, useState} from 'react';
import {CloudUpload, File, Image, X} from 'lucide-react';
import SvgPdfFile from '@/assets/svgComponents/SvgPdfFile';

interface IFileDragableWithSource
  extends React.InputHTMLAttributes<HTMLInputElement> {
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
  disabled?: boolean;
  reset?: boolean;
  name: string;
  label?: string;
  error?: string;
  onReset?: () => void;
  isMultiple?: boolean;
  files: {file: File; previewUrl: string | null}[];
  handleFileChange: (files: File[]) => void;
}

const FileDragableWithSource = ({
  disabled = false,
  name,
  error,
  isMultiple = false,
  handleFileChange,
  ...restProps
}: IFileDragableWithSource) => {
  const [isDragging, setIsDragging] = useState(false);
  const [files, setFiles] = useState<{file: File; previewUrl: string | null}[]>(
    [],
  );
  const fileInputRef = useRef<any>(null);

  const handleDragEnter = (e: React.DragEvent<HTMLInputElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(true);
  };

  const handleDragLeave = (e: React.DragEvent<HTMLInputElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
  };

  const handleDragOver = (e: React.DragEvent<HTMLInputElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(true);
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);

    const droppedFiles = Array.from(e?.dataTransfer?.files ?? []);
    handleFiles(droppedFiles);
  };

  const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFiles = e.target.files ? Array.from(e.target.files) : [];
    handleFiles(selectedFiles);
    handleFileChange(selectedFiles);
  };

  const handleFiles = (newFiles: File[]) => {
    const filesWithData = newFiles.map(file => ({
      file,
      previewUrl: file.type.startsWith('image/')
        ? URL.createObjectURL(file)
        : null,
    }));
    setFiles(prevFiles => {
      const newFiles = [...prevFiles, ...filesWithData];
      handleFileChange(newFiles.map(item => item.file));
      return newFiles;
    });
  };

  const removeFile = (indexToRemove: number) => {
    setFiles(prevFiles => {
      const fileToRemove = prevFiles[indexToRemove];
      if (fileToRemove.previewUrl) {
        URL.revokeObjectURL(fileToRemove.previewUrl);
      }
      const newFiles = prevFiles.filter((_, index) => index !== indexToRemove);

      console.log(newFiles, 'newdfile');
      handleFileChange(
        newFiles.length > 0 ? newFiles.map(item => item.file) : [],
      );
      return newFiles;
    });
  };

  const handleBrowseClick = () => {
    fileInputRef.current?.click();
  };

  // Clean up object URLs when component unmounts
  React.useEffect(() => {
    return () => {
      files.forEach(fileObj => {
        if (fileObj.previewUrl) {
          URL.revokeObjectURL(fileObj.previewUrl);
        }
      });
    };
  }, []);

  const getFileIcon = (fileType: string) => {
    if (fileType === 'application/pdf') {
      return (
        <div className="w-8 h-8 flex flex-col items-center justify-center">
          <SvgPdfFile width={32} height={32} className="" />
        </div>
      );
    }
    if (fileType.startsWith('image/')) {
      return <Image className="w-12 h-12 text-blue-500" />;
    }
    return <File className="w-12 h-12 text-gray-500" />;
  };

  return (
    <div className="w-full  mx-auto">
      <div
        className={`relative border-2 border-dashed rounded-2xl p-8 text-center cursor-pointer transition-colors ${
          isDragging
            ? 'border-blue-500 bg-blue-50'
            : 'border-base-200 hover:border-base-300'
        }`}
        onDragEnter={handleDragEnter}
        onDragLeave={handleDragLeave}
        onDragOver={handleDragOver}
        onDrop={handleDrop}
        onClick={handleBrowseClick}>
        <input
          type="file"
          name={name}
          ref={fileInputRef}
          onChange={handleFileInput}
          className="hidden"
          disabled={disabled}
          multiple={isMultiple}
          accept="application/pdf"
          {...restProps}
        />

        <div className="flex flex-col items-center gap-4">
          <CloudUpload className="w-12 h-12 text-gray-400" />
          <div className="space-y-2">
            <p className="text-lg font-medium text-gray-700">
              Drag your file or <strong>browse</strong>
            </p>
            <p className="text-sm text-gray-500">Max. 100 MB file is allowed</p>
          </div>
        </div>
      </div>

      {files.length > 0 && (
        <div className="mt-4 space-y-4">
          <div className="grid grid-cols-1 gap-4">
            {files.map(({file, previewUrl}, index) => (
              <div
                key={index}
                className="relative bg-primary-content p-4 rounded-2xl border border-base-300 flex items-start gap-3">
                <div className="flex-shrink-0">
                  {previewUrl ? (
                    <div className="w-8 h-8 rounded overflow-hidden bg-white border border-gray-200">
                      <img
                        src={previewUrl}
                        alt={`Preview of ${file.name}`}
                        className="w-full h-full object-cover"
                      />
                    </div>
                  ) : (
                    getFileIcon(file.type)
                  )}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-bold text-primary max-w-[80%] truncate">
                    {file.name}
                  </p>
                  {/*<p*/}
                  {/*  className={`text-xs font-medium mt-1 ${getFileTypeColor(file.type)}`}>*/}
                  {/*  {file.type.split('/')[1].toUpperCase()}*/}
                  {/*</p>*/}
                  <p className="text-sm text-gray-500 mt-1">
                    {(file.size / 1024).toFixed(1)} KB
                  </p>
                </div>
                <button
                  onClick={e => {
                    e.stopPropagation();
                    removeFile(index);
                  }}
                  className="absolute top-2 right-2 p-1 rounded-full hover:bg-gray-200">
                  <X className="w-4 h-4 text-gray-500" />
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

      {error ? <span className="text-red-500 text-sm">{error}</span> : null}
    </div>
  );
};

export default FileDragableWithSource;
