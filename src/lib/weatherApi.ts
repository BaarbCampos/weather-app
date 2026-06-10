// 1. Transforma o nome da cidade em Latitude e Longitude
export async function getCoordinates(city: string) {
  const response = await fetch(
    `https://geocoding-api.open-meteo.com/v1/search?name=${encodeURIComponent(city)}&count=1&language=en&format=json`
  );
  
  const data = await response.json();

  // Verifica se a API retornou resultados válidos
  if (!data.results || data.results.length === 0) {
    throw new Error("Cidade não encontrada");
  }

  // Pegamos o primeiro resultado encontrado
  const result = data.results[0];

  return {
    name: result.name,
    latitude: result.latitude,   // Garante o nome por extenso
    longitude: result.longitude, // Garante o nome por extenso
    country: result.country
  };
}

// 2. Busca o clima usando as coordenadas obtidas
export async function getWeather(lat: number, lon: number) {
  const response = await fetch(
    `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current=temperature_2m,relative_humidity_2m,apparent_temperature,weather_code,wind_speed_10m&hourly=temperature_2m,weather_code&daily=weather_code,temperature_2m_max,temperature_2m_min&timezone=auto`
  );

  if (!response.ok) {
    throw new Error("Erro ao buscar dados do clima");
  }

  const data = await response.json();
  return data;
}