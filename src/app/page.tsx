"use client";

import { useState, useEffect } from "react";
import SearchBar from "../components/SearchBar";
import UnitSelector from "../components/UnitSelector";
import CurrentWeather from "../components/CurrentWeather";
import WeatherDetails from "../components/WeatherDetails";
import WeeklyForecast from "../components/WeeklyForecast";
import HourlyForecast from "../components/HourlyForecast";
import { getCoordinates, getWeather } from "../lib/weatherApi";

export default function Home() {
  const [weather, setWeather] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    handleSearch("Dublin");
  }, []);

  const handleSearch = async (locationName: string) => {
    setLoading(true);
    setError(null);

    try {
      const coords = await getCoordinates(locationName);

      const data = await getWeather(
        coords.latitude,
        coords.longitude
      );

      setWeather({
        ...data,
        location: {
          name: coords.name,
          country: coords.country,
        },
      });
    } catch (err: any) {
      setError(err.message || "City not found");
      setWeather(null);
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-[#0B0C1E] text-white p-4 md:p-8 flex flex-col items-center">
      <div className="w-full max-w-6xl flex flex-col gap-6">

        {/* Top Bar */}
        <div className="flex flex-col md:flex-row gap-4 items-center justify-between bg-[#11132E] p-4 rounded-2xl">
          <h1 className="text-xl font-bold">Weather App</h1>

          <div className="flex flex-1 max-w-xl">
            <SearchBar onSearch={handleSearch} isLoading={loading} />
          </div>

          <UnitSelector />
        </div>

        {/* Error */}
        {error && (
          <div className="bg-red-500/10 text-red-400 p-3 rounded-xl">
            {error}
          </div>
        )}

        {/* Loading */}
        {loading && (
          <div className="text-center text-gray-400 py-10">
            Loading weather...
          </div>
        )}

        {/* Content */}
        {weather && !loading && (
          <>
            <div className="grid md:grid-cols-2 gap-6">
              <CurrentWeather weather={weather} />
              <WeatherDetails weather={weather} />
            </div>

            <HourlyForecast weather={weather} />
            <WeeklyForecast weather={weather} />
          </>
        )}

      </div>
    </main>
  );
}