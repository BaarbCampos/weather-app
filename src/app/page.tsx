"use client";

import { useState } from "react";
import SearchBar from "../components/SearchBar";
import UnitSelector from "../components/UnitSelector";
import CurrentWeather from "../components/CurrentWeather";
import WeatherDetails from "../components/WeatherDetails";
import WeeklyForecast from "../components/WeeklyForecast";
import HourlyForecast from "../components/HourlyForecast";

import { getCoordinates, getWeather } from "../lib/weatherApi";

export default function Page() {
  const [weather, setWeather] = useState<any>(null);
  const [loading, setLoading] = useState(false);

  const handleSearch = async (location: string) => {
    try {
      setLoading(true);
      const coords = await getCoordinates(location);
      const data = await getWeather(coords.latitude, coords.longitude);

      setWeather({
        location: coords,
        current: data.current,
        daily: data.daily,
        hourly: data.hourly,
      });
    } catch (error) {
      console.error(error);
      alert("Location not found. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-[#0B0C2A] text-white flex flex-col items-center p-4 md:p-8 relative overflow-x-hidden">
      
      {/* BACKGROUND IMAGES (Padrão Figma: Imagens de fundo decorativas) */}
      <div className="absolute top-0 left-0 w-full h-[320px] md:h-[400px] z-0 opacity-20 pointer-events-none">
        <picture>
          <source srcSet="/images/bg-today-large.svg" media="(min-width: 768px)" />
          <img src="/images/bg-today-small.svg" alt="" className="w-full h-full object-cover" />
        </picture>
      </div>

      <div className="w-full max-w-5xl space-y-6 z-10">
        
        {/* HEADER / TOP BAR */}
        <header className="flex flex-col sm:flex-row justify-between items-center gap-4 bg-[#12143D]/80 backdrop-blur-md p-5 rounded-2xl border border-[#1E2252] shadow-2xl">
          <div className="flex items-center gap-3">
            {/* Logo oficial que vimos na sua pasta */}
            <img src="/images/logo.svg" alt="Weather App Logo" className="w-8 h-8" />
            <h1 className="text-xl font-bold tracking-wide bg-gradient-to-r from-white to-gray-400 bg-clip-text text-transparent">
              Weather App
            </h1>
          </div>
          
          <div className="flex flex-col sm:flex-row items-center gap-4 w-full sm:w-auto flex-1 sm:justify-end">
            <div className="w-full sm:max-w-xs relative">
              <SearchBar onSearch={handleSearch} />
              {/* Ícone de busca absoluto dentro da barra, se o seu SearchBar permitir */}
              <img src="/images/icon-search.svg" alt="" className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 pointer-events-none opacity-50 hidden" />
            </div>
            <div className="flex items-center gap-2 bg-[#1E2252] px-3 py-1.5 rounded-xl border border-[#2A2F6A]">
              <img src="/images/icon-units.svg" alt="" className="w-4 h-4 opacity-70" />
              <UnitSelector />
            </div>
          </div>
        </header>

        {/* LOADING STATE */}
        {loading && (
          <div className="flex flex-col items-center justify-center py-20 space-y-4">
            <img src="/images/icon-loading.svg" alt="Loading..." className="w-12 h-12 animate-spin" />
            <p className="text-gray-400 text-sm tracking-widest uppercase">Fetching local weather...</p>
          </div>
        )}

        {/* GRID PRINCIPAL (IGUAL AO FIGMA CORES E ESPAÇAMENTOS) */}
        {!loading && weather && (
          <div className="space-y-6">
            
            {/* Bloco Superior: Clima Atual e Detalhes */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Card Clima Atual */}
              <div className="bg-[#12143D]/60 backdrop-blur-md p-6 rounded-3xl border border-[#1E2252] shadow-xl hover:border-[#252A66] transition-all">
                <CurrentWeather weather={weather} />
              </div>

              {/* Card Detalhes Extras */}
              <div className="bg-[#12143D]/60 backdrop-blur-md p-6 rounded-3xl border border-[#1E2252] shadow-xl hover:border-[#252A66] transition-all">
                <WeatherDetails weather={weather} />
              </div>
            </div>

            {/* Previsão por Hora */}
            <div className="bg-[#12143D]/60 backdrop-blur-md p-6 rounded-3xl border border-[#1E2252] shadow-xl">
              <div className="flex items-center gap-2 mb-4 border-b border-[#1E2252] pb-3">
                <span className="w-1.5 h-3.5 bg-blue-500 rounded-full"></span>
                <h3 className="text-sm font-semibold text-gray-400 uppercase tracking-wider">Hourly Forecast</h3>
              </div>
              <HourlyForecast weather={weather} />
            </div>

            {/* Previsão de 7 Dias */}
            <div className="bg-[#12143D]/60 backdrop-blur-md p-6 rounded-3xl border border-[#1E2252] shadow-xl">
              <div className="flex items-center gap-2 mb-4 border-b border-[#1E2252] pb-3">
                <span className="w-1.5 h-3.5 bg-indigo-500 rounded-full"></span>
                <h3 className="text-sm font-semibold text-gray-400 uppercase tracking-wider">7-Day Forecast</h3>
              </div>
              <WeeklyForecast weather={weather} />
            </div>

          </div>
        )}

      </div>
    </main>
  );
}