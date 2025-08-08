// Define the WeatherData interface with optional dt for timestamp
interface WeatherData {
  name: string;
  sys: {
    country: string;
  };
  main: {
    temp: number;
    feels_like: number;
    humidity: number;
  };
  weather: Array<{
    main: string;
    description: string;
    icon: string;
  }>;
  wind: {
    speed: number;
  };
  dt?: number; // Optional timestamp
}

// Use the interface in the component props
interface WeatherDisplayProps {
  weather?: WeatherData; // Made optional for fallback UI
}

function WeatherDisplay({ weather }: WeatherDisplayProps) {
  // Fallback UI if no weather data
  if (!weather) {
    return (
      <div className="weather-card no-data">
        <p>No weather data available. Please try again later.</p>
      </div>
    );
  }

  const weatherCondition = weather.weather[0]?.main.toLowerCase() || 'clear';
  const iconUrl = `https://openweathermap.org/img/wn/${weather.weather[0]?.icon || '01d'}@2x.png`;
  const timestamp = weather.dt ? new Date(weather.dt * 1000).toLocaleTimeString() : 'Unknown';

  // Dynamic background based on weather condition
  const getBackgroundClass = (condition: string) => {
    switch (condition) {
      case 'clear':
        return 'sunny';
      case 'clouds':
        return 'cloudy';
      case 'rain':
        return 'rainy';
      case 'snow':
        return 'snowy';
      default:
        return 'default';
    }
  };

  // Convert temperature to Fahrenheit
  const toFahrenheit = (celsius: number) => Math.round((celsius * 9) / 5 + 32);

  // Format temperature with rounding
  const formatTemp = (temp: number) => Math.round(temp);

  return (
    <div
      className={`weather-card ${getBackgroundClass(weatherCondition)}`}
      role="region"
      aria-label={`Weather information for ${weather.name}`}
    >
      <div className="weather-header">
        <h2>
          {weather.name}, {weather.sys.country}
        </h2>
        <span className="timestamp">Updated: {timestamp}</span>
      </div>
      <div className="weather-content">
        <img
          src={iconUrl}
          alt={`Weather condition: ${weather.weather[0]?.description || 'Unknown'}`}
          className="weather-icon"
          onError={(e) => (e.currentTarget.src = '/fallback-weather-icon.svg')}
        />
        <div className="weather-details">
          <p>
            Temperature: {formatTemp(weather.main.temp)}°C / {toFahrenheit(weather.main.temp)}°F
          </p>
          <p>
            Feels Like: {formatTemp(weather.main.feels_like)}°C /{' '}
            {toFahrenheit(weather.main.feels_like)}°F
          </p>
          <p>Weather: {weather.weather[0]?.description || 'N/A'}</p>
          <p>Humidity: {weather.main.humidity}%</p>
          <p>Wind Speed: {weather.wind.speed} m/s</p>
        </div>
      </div>
    </div>
  );
}

export default WeatherDisplay;