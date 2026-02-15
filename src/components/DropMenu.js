import iconUnits from "../assets/images/icon-units.svg";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleDown, faCheck } from "@fortawesome/free-solid-svg-icons";

export default function GroupedMenu({
  temp,
  setTemp,
  windSpeed,
  setWindSpeed,
  precipitation,
  setPrecipitation,
  isBtnOpen,
  setIsBtnOpen,
}) {
  return (
    <div className="drop-menu">
      <div
        className={`units-btn ${isBtnOpen ? `active` : ""}`}
        onClick={() => setIsBtnOpen(!isBtnOpen)}
      >
        <img src={iconUnits} alt="icon-units" />
        <span>Units</span>
        <FontAwesomeIcon icon={faAngleDown} />
      </div>
      {isBtnOpen ? (
        <div className="list" onMouseLeave={() => setIsBtnOpen(false)}>
          <span
            onClick={() => {
              setTemp(temp === "celsius" ? "fahrenheit" : "celsius");
              setWindSpeed(windSpeed === "kmh" ? "mph" : "kmh");
              setPrecipitation(precipitation === "mm" ? "inch" : "mm");
            }}
          >
            Switch to Imperial
          </span>
          <p>Temperature</p>

          <span
            className={temp === "celsius" ? "active" : ""}
            onClick={() => {
              setTemp("celsius");
            }}
          >
            Celsius (°C){" "}
            {temp === "celsius" && <FontAwesomeIcon icon={faCheck} />}
          </span>
          <span
            className={temp === "fahrenheit" ? "active" : ""}
            onClick={() => setTemp("fahrenheit")}
          >
            Fahrenheit (°F){" "}
            {temp === "fahrenheit" && <FontAwesomeIcon icon={faCheck} />}
          </span>
          <hr />
          <p>Wind Speed</p>
          <span
            className={windSpeed === "kmh" ? "active" : ""}
            onClick={() => {
              setWindSpeed("kmh");
            }}
          >
            km/h {windSpeed === "kmh" && <FontAwesomeIcon icon={faCheck} />}
          </span>
          <span
            className={windSpeed === "mph" ? "active" : ""}
            onClick={() => {
              setWindSpeed("mph");
            }}
          >
            mph {windSpeed === "mp" && <FontAwesomeIcon icon={faCheck} />}
          </span>
          <hr />
          <p>Precipitation</p>
          <span
            className={precipitation === "mm" ? "active" : ""}
            onClick={() => {
              setPrecipitation("mm");
            }}
          >
            Millimeters (mm){" "}
            {precipitation === "mm" && <FontAwesomeIcon icon={faCheck} />}
          </span>
          <span
            className={precipitation === "inch" ? "active" : ""}
            onClick={() => {
              setPrecipitation("inch");
            }}
          >
            Inches (in){" "}
            {precipitation === "inch" && <FontAwesomeIcon icon={faCheck} />}
          </span>
        </div>
      ) : (
        ""
      )}
    </div>
  );
}
