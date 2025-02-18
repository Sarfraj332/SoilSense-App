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

    if (!file.type.startsWith('image/')) {
      setError('Please upload an image file');
      return;
    }

    if (file.size > 5 * 1024 * 1024) {
      setError('File size should be less than 5MB');
      return;
    }

    setUploading(true);
    setError('');

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
          transition-all duration-300
          ${uploading ? 'border-teal-400 bg-teal-50' : 'border-teal-200 bg-white'}
          hover:border-teal-400 hover:bg-teal-50 cursor-pointer
          shadow-sm hover:shadow-md
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
              <Upload className="w-12 h-12 mb-4 text-teal-500" />
              <p className="mb-2 text-sm text-teal-700">
                <span className="font-semibold">Click to upload</span> or drag and drop
              </p>
              <p className="text-xs text-teal-600">PNG, JPG or JPEG (MAX. 5MB)</p>
            </>
          ) : (
            <div className="w-full px-8">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-medium text-teal-600">Uploading...</span>
                <span className="text-sm font-medium text-teal-600">{progress}%</span>
              </div>
              <div className="w-full bg-teal-100 rounded-full h-2.5">
                <div
                  className="bg-teal-500 h-2.5 rounded-full transition-all duration-300"
                  style={{ width: `${progress}%` }}
                ></div>
              </div>
            </div>
          )}
        </div>
      </label>

      {error && (
        <div className="mt-4 p-4 bg-rose-50 rounded-lg flex items-center text-rose-700 border border-rose-200">
          <AlertCircle className="w-5 h-5 mr-2" />
          {error}
        </div>
      )}
    </div>
  );
}