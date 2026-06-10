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
  const [unit, setUnit] = useState<"celsius" | "fahrenheit">("celsius");
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  // Carrega Dublin automaticamente assim que a página abre
  useEffect(() => {
    handleSearch("Dublin");
  }, []);

  const handleSearch = async (locationName: string) => {
    setLoading(true);
    setError(null);
    try {
      const coords = await getCoordinates(locationName);
      
      // Ajustado para passar apenas os 2 argumentos que a sua API espera (latitude e longitude)
      const data = await getWeather(coords.latitude, coords.longitude);
      
      // Injeta manualmente o nome e o país nos dados para os cards exibirem corretamente
      setWeather({
        ...data,
        name: coords.name,
        country: coords.country
      });
    } catch (err: any) {
      setError(err.message || "City not found. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-[#0B0C1E] text-white p-4 md:p-8 flex flex-col items-center justify-start">
      <div className="w-full max-w-6xl flex flex-col gap-6">
        
        {/* Top Bar */}
        <div className="w-full flex flex-col md:flex-row gap-4 justify-between items-center bg-[#11132E] p-4 rounded-2xl border border-[#1E2252]/50 shadow-xl">
          <div className="flex items-center gap-3">
            <span className="text-2xl">☀️</span>
            <h1 className="text-xl font-bold bg-gradient-to-r from-white to-gray-400 bg-clip-text text-transparent">
              Weather App
            </h1>
          </div>
          <div className="flex flex-1 max-w-xl w-full mx-0 md:mx-8">
            <SearchBar onSearch={handleSearch} isLoading={loading} />
          </div>
          {/* Ajustado para passar apenas as propriedades corretas do seu UnitSelector */}
          <UnitSelector />
        </div>

        {/* Carregamento Inicial */}
        {loading && !weather && (
          <div className="w-full flex flex-col items-center justify-center py-32 gap-4">
            <div className="w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
            <p className="text-gray-400 animate-pulse font-medium">Loading local forecast...</p>
          </div>
        )}

        {/* Mensagem de Erro */}
        {error && (
          <div className="w-full bg-red-500/10 border border-red-500/30 text-red-400 p-4 rounded-xl text-center font-medium">
            ⚠️ {error}
          </div>
        )}

        {/* Dashboard preenchido */}
        {weather && !loading && (
          <div className="flex flex-col gap-6">
            
            {/* Clima Atual e Detalhes */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-[#11132E] p-6 rounded-2xl border border-[#1E2252]/50 shadow-2xl">
                <CurrentWeather weather={weather} />
              </div>
              <div className="bg-[#11132E] p-6 rounded-2xl border border-[#1E2252]/50 shadow-2xl">
                <WeatherDetails weather={weather} />
              </div>
            </div>

            {/* Previsão Horária */}
            <div className="bg-[#11132E] p-6 rounded-2xl border border-[#1E2252]/50 shadow-2xl">
              <HourlyForecast weather={weather} />
            </div>

            {/* Previsão de 7 Dias */}
            <div className="bg-[#11132E] p-6 rounded-2xl border border-[#1E2252]/50 shadow-2xl">
              <WeeklyForecast weather={weather} />
            </div>

          </div>
        )}

      </div>
    </main>
  );
}