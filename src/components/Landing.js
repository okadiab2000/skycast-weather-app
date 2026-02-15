import searchIcon from "../assets/images/icon-search.svg";
import { useEffect } from "react";

export default function Landing({ setPlace, countryData }) {
  function onSubmit(e) {
    e.preventDefault();
    setPlace(e.target[0].value);
  }

  useEffect(
    function () {
      if (countryData.name) {
        document.title = `Weather in ${countryData.name}`;
      }
    },
    [countryData],
  );

  return (
    <div className="landing">
      <h1>How's the sky looking today?</h1>;
      <form onSubmit={(e) => onSubmit(e)}>
        <img src={searchIcon} alt="icon-search" />
        <input id="search-input" placeholder="Search for a place ..." />
        <button type="submit">Search</button>
      </form>
    </div>
  );
}
