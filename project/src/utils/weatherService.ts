import type { Location, WeatherData } from '../types/weather';

// Simulated weather data based on location
export const fetchWeatherData = async (location: Location): Promise<WeatherData> => {
  // In a real application, this would make an API call to a weather service
  const conditions: Array<'sunny' | 'cloudy' | 'rainy'> = ['sunny', 'cloudy', 'rainy'];
  const randomCondition = conditions[Math.floor(Math.random() * conditions.length)];
  
  return {
    temperature: Math.round(15 + Math.random() * 15), // Random temperature between 15-30°C
    humidity: Math.round(40 + Math.random() * 40), // Random humidity between 40-80%
    condition: randomCondition,
    forecast: `Expect ${randomCondition} conditions throughout the day. Good conditions for soil analysis.`
  };
};