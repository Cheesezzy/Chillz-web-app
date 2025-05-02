import React, { useEffect, useState, useCallback } from 'react';
import { Cloud, Sun, CloudRain, CloudSnow, Wind, ArrowLeft, ArrowRight } from 'lucide-react';
import debounce from 'lodash/debounce';

interface WeatherData {
  province: string;
  temperature: number;
  condition: string;
  windSpeed: number;
  humidity: number;
  precipitation: number;
  uvIndex: number;
  pressure: number;
  forecast: {
    date: string;
    maxTemp: number;
    minTemp: number;
    condition: string;
  }[];
}

const provinces = [
  { name: 'Ulaanbaatar', id: 'Ulaanbaatar' },
  { name: 'Darkhan', id: 'Darkhan' },
  { name: 'Erdenet', id: 'Erdenet' },
  { name: 'Khovd', id: 'Khovd' },
  { name: 'Olgii', id: 'Olgii' },
  { name: 'Bayan-Olgii', id: 'Bayan-Olgii' },
  { name: 'Govi-Altai', id: 'Govi-Altai' },
  { name: 'Zavkhan', id: 'Zavkhan' },
  { name: 'Arkhangai', id: 'Arkhangai' },
  { name: 'Uvurkhangai', id: 'Uvurkhangai' },
  { name: 'Bayanhongor', id: 'Bayanhongor' },
  { name: 'Dundgovi', id: 'Dundgovi' },
  { name: 'Govisumber', id: 'Govisumber' },
  { name: 'Sukhbaatar', id: 'Sukhbaatar' },
  { name: 'Selenge', id: 'Selenge' },
  { name: 'Tuv', id: 'Tuv' },
  { name: 'Khentii', id: 'Khentii' },
  { name: 'Dornod', id: 'Dornod' },
  { name: 'Dornogovi', id: 'Dornogovi' },
  { name: 'Khovsgol', id: 'Khovsgol' },
  { name: 'Orkhon', id: 'Orkhon' },
  { name: 'Govi-Sumber', id: 'Govi-Sumber' }
];

const WeatherReport: React.FC = () => {
  const [weatherData, setWeatherData] = useState<WeatherData[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedProvince, setSelectedProvince] = useState(0);
  const [searchQuery, setSearchQuery] = useState('');

  const filteredProvinces = provinces.filter(province =>
    province.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const fetchWeatherData = useCallback(async (index: number) => {
    try {
      setLoading(true);
      const response = await fetch(
        `https://api.weatherapi.com/v1/forecast.json?key=ab1215f131d44f87a0e65213250205&q=${provinces[index].id}&days=5&aqi=no&alerts=no`
      );
      const data = await response.json();
      
      const newWeatherData: WeatherData = {
        province: provinces[index].name,
        temperature: data.current.temp_c,
        condition: data.current.condition.text,
        windSpeed: data.current.wind_kph,
        humidity: data.current.humidity,
        precipitation: data.current.precip_mm,
        uvIndex: data.current.uv,
        pressure: data.current.pressure_mb,
        forecast: data.forecast.forecastday.map((day: any) => ({
          date: day.date,
          maxTemp: day.day.maxtemp_c,
          minTemp: day.day.mintemp_c,
          condition: day.day.condition.text
        }))
      };

      setWeatherData(prev => {
        const newData = [...prev];
        newData[index] = newWeatherData;
        return newData;
      });
      setLoading(false);
    } catch (error) {
      console.error('Error fetching weather data:', error);
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchWeatherData(selectedProvince);
  }, [selectedProvince, fetchWeatherData]);

  const getWeatherIcon = (condition: string) => {
    const conditionLower = condition.toLowerCase();
    if (conditionLower.includes('sunny') || conditionLower.includes('clear')) {
      return <Sun className="w-12 h-12 text-yellow-500" />;
    } else if (conditionLower.includes('cloud')) {
      return <Cloud className="w-12 h-12 text-gray-400" />;
    } else if (conditionLower.includes('rain')) {
      return <CloudRain className="w-12 h-12 text-blue-500" />;
    } else if (conditionLower.includes('snow')) {
      return <CloudSnow className="w-12 h-12 text-blue-200" />;
    } else {
      return <Wind className="w-12 h-12 text-gray-300" />;
    }
  };

  const getUVIndexColor = (index: number) => {
    if (index <= 2) return 'text-green-500';
    if (index <= 5) return 'text-yellow-500';
    if (index <= 7) return 'text-orange-500';
    if (index <= 10) return 'text-red-500';
    return 'text-purple-500';
  };

  const handleSearch = debounce((value: string) => {
    setSearchQuery(value);
  }, 300);

  return (
    <div className="max-w-2xl mx-auto p-6 rounded-2xl shadow-xl mt-10" style={{ background: 'transparent' }}>
      {/* Province navigation */}
      <div className="flex items-center justify-center mb-4">
      <ArrowLeft
  className="px-3 py-1 rounded-l bg-red-800 hover:bg-red-700"
  onClick={() => selectedProvince > 0 && setSelectedProvince(prev => prev - 1)}
  style={{
    opacity: selectedProvince === 0 ? 0.5 : 1,
    pointerEvents: selectedProvince === 0 ? 'none' : 'auto',
    cursor: selectedProvince === 0 ? 'not-allowed' : 'pointer'
  }}
  aria-label="Previous province"
/>
        
        <span className="mx-4 text-lg font-semibold">{provinces[selectedProvince].name}</span>
        <ArrowRight
  className="px-3 py-1 rounded-r bg-red-800 hover:bg-red-700"
  onClick={() => selectedProvince < provinces.length - 1 && setSelectedProvince(prev => prev + 1)}
  style={{
    opacity: selectedProvince === provinces.length - 1 ? 0.5 : 1,
    pointerEvents: selectedProvince === provinces.length - 1 ? 'none' : 'auto',
    cursor: selectedProvince === provinces.length - 1 ? 'not-allowed' : 'pointer'
  }}
  aria-label="Next province"
/>
       
      </div>
      <div className="flex justify-between items-start">
        <div>
          {getWeatherIcon(weatherData[selectedProvince]?.condition || '')}
          <div className="text-xl mt-2">{weatherData[selectedProvince]?.condition}</div>
        </div>
        <div className="text-right space-y-1 mt-2">
          <div>Wind: {weatherData[selectedProvince]?.windSpeed} km/h</div>
          <div>Precip: {weatherData[selectedProvince]?.precipitation} mm</div>
          <div>Pressure: {weatherData[selectedProvince]?.pressure} mb</div>
        </div>
      </div>
      <div className="text-center my-6">
        <span className="text-6xl font-light">{weatherData[selectedProvince]?.temperature}°C</span>
      </div>
      <div className="flex justify-between mt-6">
        {weatherData[selectedProvince]?.forecast.slice(0, 5).map((day, idx) => (
          <div key={day.date} className="flex flex-col items-center">
            <span>{new Date(day.date).toLocaleDateString('en-US', { weekday: 'short' })}</span>
            <div className="my-1">{getWeatherIcon(day.condition)}</div>
            <span>{day.maxTemp}°C</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default WeatherReport; 