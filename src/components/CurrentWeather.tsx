"use client";

export default function CurrentWeather({ weather }: { weather: any }) {
  // Validação de segurança para garantir que os dados existem
  if (!weather || !weather.current || !weather.location) return null;

  const current = weather.current;
  const location = weather.location;

  // Função para mapear o ícone grande principal com base no weather_code
  const getWeatherIcon = (code: number) => {
    if (code === 0) return "/images/icon-sunny.webp";
    if (code >= 1 && code <= 3) return "/images/icon-partly-cloudy.webp";
    if (code >= 45 && code <= 48) return "/images/icon-fog.webp";
    if (code >= 51 && code <= 65) return "/images/icon-drizzle.webp";
    if (code >= 71 && code <= 77) return "/images/icon-snow.webp";
    if (code >= 80 && code <= 82) return "/images/icon-rain.webp";
    if (code >= 95) return "/images/icon-storm.webp";
    return "/images/icon-overcast.webp";
  };

  // Texto descritivo baseado no código
  const getWeatherDescription = (code: number) => {
    if (code === 0) return "Clear sky";
    if (code >= 1 && code <= 3) return "Partly cloudy";
    if (code >= 51 && code <= 65) return "Drizzle";
    if (code >= 80 && code <= 82) return "Rainy";
    if (code >= 95) return "Thunderstorm";
    return "Cloudy";
  };

  return (
    <div className="relative w-full h-full min-h-[180px] flex flex-col justify-between rounded-2xl overflow-hidden p-2 text-white">
      
      {/* Informações da Cidade */}
      <div className="z-10">
        <h2 className="text-xl font-bold tracking-wide">
          {location.name}
        </h2>
        <p className="text-xs text-gray-400 font-medium mt-0.5">
          {location.country ? `${location.country}` : "Current Location"}
        </p>
      </div>

      {/* Bloco Inferior: Temperatura e Ícone Grande */}
      <div className="flex justify-between items-end z-10 mt-6">
        <div>
          <span className="text-5xl font-black tracking-tighter">
            {Math.round(current.temperature_2m)}°C
          </span>
          <p className="text-sm font-semibold text-gray-200 mt-1">
            {getWeatherDescription(current.weather_code)}
          </p>
        </div>

        {/* Imagem grande do clima atualizada dinamicamente */}
        <div className="relative">
          <img
            src={getWeatherIcon(current.weather_code)}
            alt="Current Weather Condition"
            className="w-24 h-24 object-contain animate-pulse-slow drop-shadow-[0_8px_24px_rgba(0,0,0,0.3)]"
          />
        </div>
      </div>
    </div>
  );
}