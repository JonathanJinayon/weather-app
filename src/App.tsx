import { useState } from "react";
import WeatherDisplay from "./components/weatherDisplay";
import "./index.css";

function App() {
  const [city, setCity] = useState("");
  const [weather, setWeather] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const API_KEY = "3caf30839895ec6956b98a984593b22b";

  const featchWeather = async (e: any) => {
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
      <form onSubmit={featchWeather}>
        <input
          type="text"
          value={city}
          onChange={(e) => setCity(e.target.value)}
          placeholder="Enter City"
        />
        <button type="submit">Get Weather</button>
      </form>
      {error && <p className="error">{error}</p>}
      {loading && <p>Loading Weather Data...</p>}
      {weather && <WeatherDisplay weather={weather} />}
    </div>
  );
}

export default App;
