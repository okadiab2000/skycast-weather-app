import CircularProgress from "@mui/material/CircularProgress";

import { faAngleDown } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState } from "react";

export default function WeatherSection({
  bgToday,
  day,
  setDay,
  countryData,
  weatherData,
  windSpeed,
  precipitation,
  isLoading,
  getWeatherIcon,
  weekday,
}) {
  const [isOpen, setIsOpen] = useState(false);
  const dateObj = new Date(weatherData.current?.time);
  const options = {
    weekday: "long",
    year: "numeric",
    month: "short",
    day: "numeric",
  };
  const [selectedDay, setSelectedDay] = useState(0);
  const startIndex = selectedDay * 24;
  const endIndex = startIndex + 24;

  const hourlyTime = weatherData.hourly?.time.slice(startIndex, endIndex);
  const hourlyTemp = weatherData.hourly?.temperature_2m.slice(
    startIndex,
    endIndex,
  );
  const hourlyCodes = weatherData.hourly?.weather_code.slice(
    startIndex,
    endIndex,
  );

  return (
    <div className="weather-section-parent">
      <div className="weather-section">
        <div
          className={`weather-details ${isLoading ? "active-loading-circle" : ""}`}
        >
          {!isLoading ? (
            <>
              <img
                src={bgToday}
                alt="background-image"
                className="background-image"
              />
              <div>
                <h2>
                  {countryData.name === countryData.country
                    ? `${countryData.name}`
                    : `${countryData.name}, ${countryData.country === undefined ? "" : countryData.country}`}
                </h2>
                <p>
                  {weatherData
                    ? dateObj.toLocaleDateString("en-US", options)
                    : "Loading..."}
                </p>
              </div>
              <div>
                <img
                  src={getWeatherIcon(weatherData.current.weather_code)}
                  alt={getWeatherIcon}
                  className="icon-weather"
                />
                <span>{weatherData.current?.temperature_2m}°</span>
              </div>
            </>
          ) : (
            <CircularProgress size="50px" className="loading-circle" />
          )}
        </div>
        <div>
          <span>
            Feels Like
            {!isLoading ? (
              <p>{weatherData.current?.apparent_temperature}°</p>
            ) : (
              <p>-</p>
            )}
          </span>
          <span>
            Humidity
            {!isLoading ? (
              <p>{weatherData.current?.relative_humidity_2m}%</p>
            ) : (
              <p>-</p>
            )}
          </span>
          <span>
            Wind
            {!isLoading ? (
              <p>
                {weatherData.current?.wind_speed_10m} {windSpeed}
              </p>
            ) : (
              <p>-</p>
            )}
          </span>
          <span>
            Precipitation
            {!isLoading ? (
              <p>
                {weatherData.current?.precipitation}{" "}
                {precipitation === "inch" ? "in" : precipitation}
              </p>
            ) : (
              <p>-</p>
            )}
          </span>
        </div>
        <div className="daily-forecast">
          {weekday.map((e, i) => (
            <span>
              <p>{weekday[i].slice(0, 3)}</p>
              <img
                src={getWeatherIcon(weatherData.daily?.weather_code[i])}
                alt=""
              />
              <div>
                <span>{weatherData.daily?.temperature_2m_max[i]}°</span>
                <span>{weatherData.daily?.temperature_2m_min[i]}°</span>
              </div>
            </span>
          ))}
        </div>
      </div>
      <div className="hourly-forecast">
        <div className="days-filter">
          <h1>Hourly forecast</h1>
          <div
            className="drop-days"
            value={day}
            name="day"
            onClick={() => setIsOpen(!isOpen)}
          >
            <p>{day}</p>
            <FontAwesomeIcon icon={faAngleDown} />
            <div style={{ display: !isOpen && "none" }}>
              {weekday.map((e, i) => (
                <span
                  key={i}
                  className={e === day ? "active" : ""}
                  onClick={() => {
                    setDay(e);
                    setSelectedDay(i);
                  }}
                  value={e}
                >
                  {e}
                </span>
              ))}
            </div>
          </div>
        </div>
        <div className="hours">
          {!isLoading &&
            Array.from({ length: hourlyTime.length }, (_, i) => (
              <div>
                <span>
                  <img src={getWeatherIcon(hourlyCodes?.[i])} alt="" />
                  <p>
                    {new Date(hourlyTime[i]).toLocaleString("en-US", {
                      hour: "numeric",
                      hour12: true,
                      hourCycle: "h12",
                    })}
                  </p>
                </span>
                <p>{hourlyTemp?.[i]}°</p>
              </div>
            ))}
        </div>
      </div>
    </div>
  );
}
