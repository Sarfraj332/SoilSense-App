import React from 'react';
import { Cloud, Sun, CloudRain, Thermometer } from 'lucide-react';

interface WeatherData {
  temperature: number;
  humidity: number;
  condition: 'sunny' | 'cloudy' | 'rainy';
  forecast: string;
}

interface WeatherWidgetProps {
  data: WeatherData;
}

const weatherIcons = {
  sunny: Sun,
  cloudy: Cloud,
  rainy: CloudRain,
};

export default function WeatherWidget({ data }: WeatherWidgetProps) {
  const WeatherIcon = weatherIcons[data.condition];

  return (
    <div className="bg-white rounded-xl shadow-lg p-6">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-gray-900">Local Weather</h3>
        <WeatherIcon className="w-6 h-6 text-blue-500" />
      </div>
      
      <div className="grid grid-cols-2 gap-4">
        <div className="flex items-center space-x-2">
          <Thermometer className="w-5 h-5 text-red-500" />
          <span className="text-2xl font-bold text-gray-900">
            {data.temperature}°C
          </span>
        </div>
        
        <div className="flex items-center space-x-2">
          <Cloud className="w-5 h-5 text-blue-500" />
          <span className="text-lg text-gray-600">
            {data.humidity}% Humidity
          </span>
        </div>
      </div>
      
      <div className="mt-4">
        <p className="text-sm text-gray-600">{data.forecast}</p>
      </div>
    </div>
  );
}