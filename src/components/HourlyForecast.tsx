"use client";

export default function HourlyForecast({ weather }: { weather: any }) {
  // Se não houver dados ou a previsão por hora não existir, não renderiza nada ainda
  if (!weather || !weather.hourly) return null;

  // CORREÇÃO: Tiramos o ".data" do caminho!
  const times = weather.hourly.time?.slice(0, 12) || [];
  const temps = weather.hourly.temperature_2m?.slice(0, 12) || [];

  return (
    <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-6 gap-4">
      {times.map((time: string, index: number) => (
        <div key={time} className="bg-[#1E2252]/40 p-4 rounded-xl text-center border border-[#2A2F6A]">
          <p className="text-xs text-gray-400">
            {new Date(time).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
          </p>
          {/* Ícone estático padrão usando as imagens que vimos na sua pasta */}
          <img src="/images/icon-sunny.webp" alt="Sunny" className="w-8 h-8 mx-auto my-2" />
          <p className="text-sm font-semibold">{Math.round(temps[index])}°</p>
        </div>
      ))}
    </div>
  );
}