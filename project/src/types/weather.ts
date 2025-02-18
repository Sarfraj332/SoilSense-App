export interface WeatherData {
  temperature: number;
  humidity: number;
  condition: 'sunny' | 'cloudy' | 'rainy';
  forecast: string;
}

export interface Location {
  lat: number;
  lng: number;
}