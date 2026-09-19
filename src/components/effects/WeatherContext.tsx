import { createContext, useContext, useState, ReactNode } from 'react';

export type WeatherType = 'clear' | 'rain' | 'snow' | 'storm' | 'sakura' | 'desert' | 'meteor' | 'underwater';

interface WeatherContextType {
  weather: WeatherType;
  setWeather: (weather: WeatherType) => void;
}

const WeatherContext = createContext<WeatherContextType | undefined>(undefined);

export function WeatherProvider({ children }: { children: ReactNode }) {
  const [weather, setWeather] = useState<WeatherType>('clear');

  return (
    <WeatherContext.Provider value={{ weather, setWeather }}>
      {children}
    </WeatherContext.Provider>
  );
}

export function useWeather() {
  const context = useContext(WeatherContext);
  if (context === undefined) {
    throw new Error('useWeather must be used within a WeatherProvider');
  }
  return context;
}
