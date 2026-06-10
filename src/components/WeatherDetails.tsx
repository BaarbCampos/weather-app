"use client";

export default function WeatherDetails({ weather }: { weather: any }) {
  // CORREÇÃO: Verificando a estrutura real mapeada no seu estado (weather.current)
  if (!weather || !weather.current) return null;

  const current = weather.current;

  // Lista com os detalhes mapeando as imagens corretas da sua pasta public/images
  const details = [
    {
      label: "Thermal sensation",
      value: `${Math.round(current.apparent_temperature)}°C`,
      icon: "/images/icon-sunny.webp", // Pode usar o ícone de sol ou temperatura
    },
    {
      label: "Probability of rain / Humidity",
      value: `${current.relative_humidity_2m}%`,
      icon: "/images/icon-drizzle.webp",
    },
    {
      label: "Wind speed",
      value: `${current.wind_speed_10m} km/h`,
      icon: "/images/icon-dropdown.svg", // Usando um ícone de seta/direção como fallback decorativo
    },
  ];

  return (
    <div className="flex flex-col h-full justify-between space-y-4">
      {/* Título do Bloco */}
      <h3 className="text-sm font-semibold text-gray-400 uppercase tracking-wider mb-2">
        Weather Details
      </h3>

      {/* Lista de Detalhes Estilizada */}
      <div className="divide-y divide-[#1E2252] flex-1 flex flex-col justify-center">
        {details.map((item, index) => (
          <div key={index} className="flex items-center justify-between py-3.5 first:pt-0 last:pb-0">
            <div className="flex items-center gap-3">
              <img 
                src={item.icon} 
                alt="" 
                className="w-5 h-5 object-contain opacity-80" 
              />
              <span className="text-sm text-gray-400 font-medium">{item.label}</span>
            </div>
            <span className="text-sm font-semibold text-white">{item.value}</span>
          </div>
        ))}
      </div>
    </div>
  );
}