import TopButtons from "./Components/TopButtons";
import Inputs from "./Components/Inputs";

import TimeandLocation from "./Components/TimeandLocation";
import TempandDetails from "./Components/TempandDetails";
import Forecast from "./Components/Forecast";

import { useState } from "react";
import { useEffect } from "react";
import { ToastContainer,toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import getFormattedWeatherData from "./services/weatherService";


function capitalizerFirstLetter(string){
  return string.charAt(0).toUpperCase()+string.slice(1);
}
const App = () => {
  const[query,setQuery]=useState({q:"Mumbai"});
  const[units,setUnits]=useState("metric")
  const[weather,setWeather]=useState(null)
  
  const getWeather=async ()=>{
    const cityName=query.q? query.q:"current location";
    toast.info(`Fetching weather data for ${capitalizerFirstLetter(cityName)}`);
    await getFormattedWeatherData({...query,units}).then((data)=>{
      toast.success(`Fetched weather data for ${data.name},${data.country}`);
      setWeather(data);
    });
  
  };

  useEffect(()=>{getWeather();},[query,units]);

  const formatBackground=()=>{
    if (!weather) return "from-cyan-600 to-blue-700";
    const threshold=units==="metric"?20:60
    if(weather.temp<=threshold)return "from-cyan-600 to-blue-700";
    return "from-yellow-600 to-orange-700";
  };
  
  return (
    <div className={`mt-4 py-5 px-32 bg-gradient-to-br  h-fit shadow-xl shadow-gray-400 ${formatBackground()}`}
    >
    <TopButtons setQuery={setQuery}/>
    <Inputs setQuery={setQuery} setUnits={setUnits}/>
    {
      weather &&(
        <>
        <TimeandLocation weather={weather}/>
        <TempandDetails weather={weather} units={units}/>
        <Forecast title="3 hour step forecast" data={weather.hourly}/>
        <Forecast title="daily forecast" data={weather.daily}/>
        </>
      )
    }
    <ToastContainer autoClose={2000} hideProgressBar={true} theme="colored"/>
    </div>
  );
};


export default App;
