import React, { useState } from 'react';
import { MapPin } from 'lucide-react';

interface LocationPickerProps {
  onLocationSelect: (coords: { lat: number; lng: number }) => void;
}

export default function LocationPicker({ onLocationSelect }: LocationPickerProps) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleGetLocation = () => {
    setLoading(true);
    setError(null);

    if (!navigator.geolocation) {
      setError('Geolocation is not supported by your browser');
      setLoading(false);
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (position) => {
        onLocationSelect({
          lat: position.coords.latitude,
          lng: position.coords.longitude,
        });
        setLoading(false);
      },
      (error) => {
        setError('Unable to retrieve your location');
        setLoading(false);
      }
    );
  };

  return (
    <div className="bg-white rounded-xl shadow-lg p-6">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-gray-900">Location</h3>
        <MapPin className="w-6 h-6 text-green-600" />
      </div>

      <button
        onClick={handleGetLocation}
        disabled={loading}
        className={`
          w-full px-4 py-2 rounded-lg
          ${loading
            ? 'bg-gray-100 text-gray-500'
            : 'bg-green-600 text-white hover:bg-green-700'}
          transition-colors duration-200
          flex items-center justify-center space-x-2
        `}
      >
        <MapPin className="w-5 h-5" />
        <span>{loading ? 'Getting location...' : 'Get Current Location'}</span>
      </button>

      {error && (
        <p className="mt-2 text-sm text-red-600">{error}</p>
      )}
    </div>
  );
}