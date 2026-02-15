import { useEffect, useState } from "react";

import GroupedMenu from "./components/DropMenu";
import Landing from "./components/Landing";
import WeatherSection from "./components/WeatherSection";
import ErrorSection from "./components/ErrorSection";

import { Header } from "./components/Header";
import { Logo } from "./components/Logo";
import bgToday from "./assets/images/bg-today-large.svg";

import iconSunny from "./assets/images/icon-sunny.webp";
import iconCloudly from "./assets/images/icon-partly-cloudy.webp";
import iconFog from "./assets/images/icon-fog.webp";
import iconDrizzle from "./assets/images/icon-drizzle.webp";
import iconRain from "./assets/images/icon-rain.webp";
import iconSnow from "./assets/images/icon-snow.webp";
import iconStorm from "./assets/images/icon-storm.webp";

function App() {
  const [isLoading, setIsLoading] = useState(true);
  const [isBtnOpen, setIsBtnOpen] = useState(false);
  const [temp, setTemp] = useState("celsius");
  const [windSpeed, setWindSpeed] = useState("kmh");
  const [precipitation, setPrecipitation] = useState("mm");
  const [place, setPlace] = useState("");
  const geoUrl = process.env.REACT_APP_GEO_URL;
  const weaUrl = process.env.REACT_APP_WEATHER_URL;

  const weekday = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];

  const [day, setDay] = useState(weekday.at(new Date().getDay()));
  const [countryData, setCountryData] = useState({});
  const [weatherData, setWeatherData] = useState({});
  const [error, setError] = useState("");
  const [refreshKey, setRefreshKey] = useState(0);

  const getWeatherIcon = (code) => {
    if (code === 0) return iconSunny;
    if (code >= 1 && code <= 3) return iconCloudly;
    if (code === 45 || code === 48) return iconFog;
    if (code >= 51 && code <= 55) return iconDrizzle;

    if ((code >= 61 && code <= 65) || (code >= 80 && code <= 82))
      return iconRain;

    if ((code >= 71 && code <= 75) || (code >= 85 && code <= 86))
      return iconSnow;
    if (code >= 95 && code <= 99) return iconStorm;

    return iconCloudly;
  };

  const currentDayIndex = new Date().getDay();
  const sortedDays = [
    ...weekday.slice(currentDayIndex),
    ...weekday.slice(0, currentDayIndex),
  ];

  useEffect(
    function () {
      function randomCun() {
        const countries = [
          "Saudi Arabia",
          "Egypt",
          "United Arab Emirates",
          "Jordan",
          "Morocco",
          "United States",
          "United Kingdom",
          "Canada",
          "Germany",
          "France",
          "Japan",
          "South Korea",
          "Brazil",
          "Australia",
          "Italy",
          "Spain",
        ];
        const randomIndex = Math.floor(Math.random() * countries.length);
        setPlace(countries.at(randomIndex));
      }

      randomCun();
    },
    [refreshKey],
  );

  useEffect(
    function () {
      if (!place) return;
      const controller = new AbortController();
      async function fetchData() {
        try {
          setIsLoading(true);
          setError("");
          const res = await fetch(
            `${geoUrl}name=${place}&count=1&language=en&format=json`,
            { signal: controller.signal },
          );

          const data = await res.json();

          if (!data.results) throw new Error("Location not found!");
          const location = data.results.at(0);
          setCountryData(location);

          const res2 = await fetch(
            `${weaUrl}` +
              `latitude=${location.latitude}&` +
              `longitude=${location.longitude}&` +
              `current=temperature_2m,relative_humidity_2m,apparent_temperature,precipitation,wind_speed_10m,weather_code&` +
              `hourly=temperature_2m,weather_code&` +
              `daily=weather_code,temperature_2m_max,temperature_2m_min&` +
              `timezone=auto&` +
              `temperature_unit=${temp}&` +
              `wind_speed_unit=${windSpeed}&` +
              `precipitation_unit=${precipitation}`,
            { signal: controller.signal },
          );
          if (!res.ok || !res2.ok)
            throw new Error("somthing went wrong while fetching");
          const data2 = await res2.json();
          setWeatherData(data2);
          setError("");
        } catch (err) {
          setError(err.message);
          console.error(err);
        } finally {
          setIsLoading(false);
        }
      }

      fetchData();
      return function () {
        controller.abort();
      };
    },
    [place, refreshKey, temp, windSpeed, precipitation],
  );

  return (
    <div className="container">
      <Header>
        <Logo />
        <GroupedMenu
          temp={temp}
          setTemp={setTemp}
          windSpeed={windSpeed}
          setWindSpeed={setWindSpeed}
          precipitation={precipitation}
          setPrecipitation={setPrecipitation}
          isBtnOpen={isBtnOpen}
          setIsBtnOpen={setIsBtnOpen}
        />
      </Header>
      {!error ? (
        <>
          <Landing
            place={place}
            setPlace={setPlace}
            isLoading={isLoading}
            countryData={countryData}
          />
          <WeatherSection
            bgToday={bgToday}
            day={day}
            setDay={setDay}
            countryData={countryData}
            weatherData={weatherData}
            windSpeed={windSpeed}
            precipitation={precipitation}
            isLoading={isLoading}
            getWeatherIcon={getWeatherIcon}
            weekday={sortedDays}
          />
        </>
      ) : (
        <ErrorSection setRefreshKey={setRefreshKey} />
      )}
    </div>
  );
}

export default App;
