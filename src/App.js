import "./App.css";
import axios from "axios";
import { useState } from "react";
const { REACT_APP_API_KEY } = process.env;
function App() {
  // initialize state variables
  // initial map
  const [mapShown, setMapShown] = useState(false);
  // user search query
  const [queryCity, setQueryCity] = useState("");
  // city
  const [cityData, setCityData] = useState({});
  // lat
  const [lat, setLat] = useState(0);
  // Lon
  const [lon, setLon] = useState(0);
  // map url
  const [mapUrl, setMapUrl] = useState("");

  const getQueryCity = (e) => {
    setQueryCity(e.target.value);
  };

  const getMapData = async () => {
    // use the lat and lon the query string of this url
    

    try {
      const url = `https://maps.locationiq.com/v3/staticmap?key=${REACT_APP_API_KEY}&center=${lat},${lon}&zoom=14`;
      const mapData = await axios.get(url);
      setMapUrl(mapData.config.url);
      console.log(mapUrl);
      setMapShown(true);
    } catch (error) {
      console.log("error:", error.response);
    }
  };

  const getUSCityData = async () => {
    try {
      const url = `https://eu1.locationiq.com/v1/search.php?key=${REACT_APP_API_KEY}&q=${queryCity}&format=json`;
      await axios
        .get(url)
        .then((result) => {
          setCityData(result.data[0]);
          setLat(result.data[0].lat);
          setLon(result.data[0].lon);
          getMapData();
        })
        .catch((err) => {
          console.log(err);
        });
      // console.log(cityData.data)

      // setLon(cityData.data.body);
      // setLat(cityData.data.body);
    } catch (error) {
      console.log("error:", error.response);
    }
  };
  const getEuropeCityData = async () => {
    try {
      const url = `https://eu1.locationiq.com/v1/search.php?key=${REACT_APP_API_KEY}&q=${queryCity}&format=json`;
      await axios
        .get(url)
        .then((result) => {
          setCityData(result.data[0]);
          setLat(result.data[0].lat);
          setLon(result.data[0].lon);
          getMapData();
        })
        .catch((err) => {
          console.log(err);
        });
      // console.log(cityData.data)

      // setLon(cityData.data.body);
      // setLat(cityData.data.body);
    } catch (error) {
      console.log("error:", error.response);
    }
  };

  return (
    <div className="App">
      <div>
        {" "}
        <input type="text" placeholder="Europe" onChange={getQueryCity} />
        <button onClick={getEuropeCityData}>
          Click me for results!!!!!!!!!!!!!!!
        </button>
      </div>
      <div style={{ borderBottom: "5px solid black", width: "100%" }}> </div>
      <div>
        <input
          type="text"
          placeholder="United States"
          onChange={getQueryCity}
        />
        <button onClick={getUSCityData}>
          Click me for results!!!!!!!!!!!!!!!
        </button>
      </div>
      <p>lat: {lat}</p>
      <p>type:{cityData.type} </p>
      <p>lon: {lon}</p>

      {mapShown ? <img src={mapUrl} alt="map" /> : " "}
    </div>
  );
}

export default App;
