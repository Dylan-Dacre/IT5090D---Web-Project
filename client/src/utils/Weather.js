import "./Weather.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCloud,
  faSun,
  faCloudSun,
  faCloudRain,
} from "@fortawesome/free-solid-svg-icons";

const Weather = () => {
  return (
    <div className="weather">
      <span className="icon-weather">
        <FontAwesomeIcon icon={faCloud} />
      </span>
      <span className="icon-weather">
        <FontAwesomeIcon icon={faSun} />
      </span>
      <span className="icon-weather">
        <FontAwesomeIcon icon={faSun} />
      </span>
      <span className="icon-weather">
        <FontAwesomeIcon icon={faCloudSun} />
      </span>
      <span className="icon-weather">
        <FontAwesomeIcon icon={faCloud} />
      </span>
      <span className="icon-weather">
        <FontAwesomeIcon icon={faCloudRain} />
      </span>
      <span className="icon-weather">
        <FontAwesomeIcon icon={faCloudRain} />
      </span>
    </div>
  );
};

export default Weather;
