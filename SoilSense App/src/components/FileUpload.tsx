import React, { useState } from 'react';
import { Upload, CheckCircle, AlertCircle } from 'lucide-react';

interface FileUploadProps {
  onUploadComplete: (file: File) => void;
}

export default function FileUpload({ onUploadComplete }: FileUploadProps) {
  const [uploading, setUploading] = useState(false);
  const [progress, setProgress] = useState(0);
  const [error, setError] = useState('');

  const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Validate file type
    if (!file.type.startsWith('image/')) {
      setError('Please upload an image file');
      return;
    }

    // Validate file size (max 5MB)
    if (file.size > 5 * 1024 * 1024) {
      setError('File size should be less than 5MB');
      return;
    }

    setUploading(true);
    setError('');

    // Simulate upload progress
    let currentProgress = 0;
    const interval = setInterval(() => {
      currentProgress += 10;
      setProgress(currentProgress);
      
      if (currentProgress >= 100) {
        clearInterval(interval);
        setUploading(false);
        onUploadComplete(file);
      }
    }, 300);
  };

  return (
    <div className="w-full max-w-md mx-auto">
      <label 
        className={`
          relative flex flex-col items-center justify-center w-full h-64
          border-2 border-dashed rounded-xl
          transition-colors duration-300
          ${uploading ? 'border-green-400 bg-green-50' : 'border-gray-300 bg-gray-50'}
          hover:bg-gray-100 cursor-pointer
        `}
      >
        <input
          type="file"
          className="hidden"
          accept="image/*"
          onChange={handleUpload}
          disabled={uploading}
        />
        
        <div className="flex flex-col items-center justify-center pt-5 pb-6">
          {!uploading ? (
            <>
              <Upload className="w-10 h-10 mb-3 text-gray-400" />
              <p className="mb-2 text-sm text-gray-500">
                <span className="font-semibold">Click to upload</span> or drag and drop
              </p>
              <p className="text-xs text-gray-500">PNG, JPG or JPEG (MAX. 5MB)</p>
            </>
          ) : (
            <div className="w-full px-8">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-medium text-green-500">Uploading...</span>
                <span className="text-sm font-medium text-green-500">{progress}%</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2.5">
                <div
                  className="bg-green-500 h-2.5 rounded-full transition-all duration-300"
                  style={{ width: `${progress}%` }}
                ></div>
              </div>
            </div>
          )}
        </div>
      </label>

      {error && (
        <div className="mt-4 p-4 bg-red-50 rounded-lg flex items-center text-red-800">
          <AlertCircle className="w-5 h-5 mr-2" />
          {error}
        </div>
      )}
    </div>
  );
}