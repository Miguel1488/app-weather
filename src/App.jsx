import axios from 'axios'
import { useEffect, useState } from 'react'
import './App.css'


function App() {

  const [weather, setWeather] = useState({});
  const [isFahrenheit, setIsFahrenheit] = useState(true);

  let colorRandom = Math.floor(Math.random() * 16777215).toString(16);
  const [color, setColor] = useState("E2202B");

  useEffect(() => {
    setColor(colorRandom)

    function success(pos) {
      const crd = pos.coords;

      axios.get(`https://api.openweathermap.org/data/2.5/weather?lat=${crd.latitude}&lon=${crd.longitude}&appid=03e6fe5bf36f841d1180efe4d8bbab44`)

        .then(res => setWeather(res.data));


      console.log('Your current position is:');
      console.log(`Latitude : ${crd.latitude}`);
      console.log(`Longitude: ${crd.longitude}`);
      console.log(`More or less ${crd.accuracy} meters.`);
    }

    function error(err) {
      console.warn(`ERROR(${err.code}):${err.message}`);
    }

    navigator.geolocation.getCurrentPosition(success, error);

  }, [])

  console.log(weather);


  /* const fahrenheit = weather.main?.temp- 273.15;
   const celsius = (weather.main?.temp*9/5 )+ 32;*/
  const celsiusopen = weather.main?.temp - 273.15;
  const fahrenheitopen = celsiusopen * 9 / 5 + 32;
  const celsius = celsiusopen.toFixed(2)
  const fahrenheit = fahrenheitopen.toFixed(2)

  console.log(celsius)

  const changeUnits = () => {
    setIsFahrenheit(!isFahrenheit);
    setColor(colorRandom)
    setIndex(newRandom);
  };


  /*const changeUnits = () => { 
    setColor(colorRandom)
    setIndex(newRandom);
    
    
  };
*/



  return (
    <div className="App" style={{ background: `#${color}` }} >

      <div className='card'>
        <h1 className='title'>Weather App</h1>

        <h2 className='information'>City {weather?.name}, {weather.sys?.country}</h2>

        <img className='cardImg' src={`https://openweathermap.org/img/wn/${weather.weather?.[0].icon}@2x.png`} alt="" />



        <div className='cardWeather'>
          <li>Wind Speed: {weather.wind?.speed}m/s</li>
          <li>Clouds: {weather.clouds?.all}%</li>
          <li>Pressure: {weather.main?.pressure}mb</li>

        </div>
        
        <ul className='weather'>
          {isFahrenheit
            ? fahrenheit : celsius}{""}
          {isFahrenheit ? "°F" : "°C"}
        </ul>


        <button className='button' onClick={changeUnits}>Degrees °F/°C</button>
      </div>
    </div>
  )
}

export default App
