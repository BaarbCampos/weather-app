"use client";

export default function WeeklyForecast({ weather }: { weather: any }) {
  // Verificação de segurança para garantir que os dados diários existem
  if (!weather || !weather.daily) {
    return <p className="text-gray-400 text-sm">Loading weekly forecast...</p>;
  }

  const { time, temperature_2m_max, temperature_2m_min, weather_code } = weather.daily;

  // Função simples para converter a data (Ex: 2026-06-11) no nome do dia (Ex: Thursday / Quinta)
  const getDayName = (dateString: string, index: number) => {
    if (index === 0) return "Today";
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", { weekday: "long" });
  };

  // Função para escolher o ícone com base no código de clima da API (weather_code)
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

  return (
    <div className="divide-y divide-[#1E2252]">
      {time.map((day: string, index: number) => (
        <div key={day} className="flex items-center justify-between py-4 first:pt-0 last:pb-0">
          
          {/* Nome do Dia */}
          <p className="text-sm font-medium text-gray-200 w-28">
            {getDayName(day, index)}
          </p>

          {/* Ícone do Clima */}
          <div className="flex items-center justify-center flex-1">
            <img 
              src={getWeatherIcon(weather_code[index])} 
              alt="Weather condition" 
              className="w-7 h-7 object-contain"
            />
          </div>

          {/* Temperaturas Máxima e Mínima */}
          <div className="flex items-center gap-3 text-sm font-semibold justify-end w-24">
            <span className="text-white">{Math.round(temperature_2m_max[index])}°</span>
            <span className="text-gray-500">{Math.round(temperature_2m_min[index])}°</span>
          </div>

        </div>
      ))}
    </div>
  );
}