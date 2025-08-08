import { useState } from "react";
import WeatherDisplay from "./components/weatherDisplay";
import "./index.css";

function App() {
  const [city, setCity] = useState("");
  const [weather, setWeather] = useState<any | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const API_KEY = "your_api key";

  const fetchWeather = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!city) return;
    setLoading(true);

    try {
      const response = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`
      );
      if (!response.ok) {
        throw new Error("City Not Found");
      }
      const data = await response.json();
      setWeather(data);
      setError(null);
    } catch (err: any) {
      setError(err.message);
      setWeather(null);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="app">
      <h1>Weather-App</h1>
      <form onSubmit={fetchWeather} aria-label="Search city weather">
        <input
          type="text"
          value={city}
          onChange={(e) => setCity(e.target.value)}
          placeholder="Enter City"
          aria-label="City name"
        />
        <button type="submit" aria-label="Get weather">Get Weather</button>
      </form>
      {error && (
        <p className="error" role="alert" aria-live="assertive">{error}</p>
      )}
      {loading && (
        <div className="loading" role="status" aria-live="polite">
          <span className="spinner" aria-hidden="true"></span>
          Loading weather data...
        </div>
      )}
      {weather && <WeatherDisplay weather={weather} />}
    </div>
  );
}

export default App;
