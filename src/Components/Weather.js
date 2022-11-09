import { useState,useEffect } from 'react';
import axios from 'axios'
import '../Style.css';
import Gettimeanddate from './Gettimeanddate';
import snow from '../Pictures/Backgrounds/snow.jpg';
import clouds from '../Pictures/Backgrounds/clouds.jpg';
import defaullt from '../Pictures/Backgrounds/Default.jpg';
import drizzle from '../Pictures/Backgrounds/drizzle.jpg';
import rain from '../Pictures/Backgrounds/rain.jpg';
import thunderstorm from '../Pictures/Backgrounds/thunderstorm.jpg';

// const clouds='../src/Pictures/Backgrounds/clouds.jpg';

function Weather() {
  const[search,setSearch]=useState();
  let [data,setData]=useState();
  const [input,setInput]=useState('Tehran');
  const api=`http://api.openweathermap.org/data/2.5/weather?q=${input}&appid=b520176d65ff9c36b68f86ed7d1dd645`;

  const getdata=async()=>{
    const response =await axios.get(api);
    setData(response.data);
    lat=(response.data.coord.lat);
    lon=(response.data.coord.lon);
  }
  useEffect(()=>{
    getdata();
  },[])

  const handleSubmit=(event)=>{
    event.preventDefault();
    setSearch(event.target.value);
    getdata();
  }
  let emoji,temp,temp_min,temp_max,hour,day,month,year,lat,lon;
  if(data != undefined){
    lat=(data.coord.lat);
    lon=(data.coord.lon);
    temp=((data.main.temp) - 273.15).toFixed(2);
    temp_min=((data.main.temp_min) - 273.15).toFixed(2);
    temp_max=((data.main.temp_max) - 273.15).toFixed(2);

    if (data != undefined){
      if(data.weather[0].main == 'Clouds'){
        emoji='fa-solid fa-cloud fa-4x';
      }else if(data.weather[0].main == 'Thunderstorm'){
        emoji='fa-solid fa-cloud-bolt fa-4x';
      }else if(data.weather[0].main == 'Drizzle'){
        emoji='fa-solid fa-cloud-drizzle fa-4x'
      }else if(data.weather[0].main == 'Rain'){
        emoji='fa-solid fa-cloud-rain fa-4x'
      }else if(data.weather[0].main == 'Snow'){
        emoji='fa-regular fa-snowflake fa-4x'
      }else{
        emoji='fa-solid fa-smog fa-4x'
      }
    } else {
      return(<div>...Loading</div>)
    } 
  }

  return ( (data!=undefined) &&
    <div className="container" style={
      {backgroundImage:data.weather[0].main == 'Clouds'?"url("+clouds+")":data.weather[0].main == 'Thunderstorm'?"url("+thunderstorm+")":data.weather[0].main == 'Drizzle'?"url("+drizzle+")":data.weather[0].main == 'Rain'?"url("+rain+")":data.weather[0].main == 'Snow'?"url("+snow+")":"url("+defaullt+")"}
    }>
      <div className='card'>
        <form onSubmit={handleSubmit}>
          <input
            type='text'
            placeholder='Search City'
            value={input}
            onChange={(e)=>{setInput(()=>e.target.value)}}
            required
          />
          <button type='submit'><i className='fas fa-search'></i></button>
        </form>
          <div className='city'>{data.name}</div>
          <div className='date-time'>
            <br />
            {<Gettimeanddate lonn={lon} latt={lat} />}
            <hr />
            <i className={`${emoji}`}></i>
            <p className='temp'>{temp} °C</p>
            <br />
            <p className='status'>{data.weather[0].main}</p>
            <p className='maxmin'>{((data.main.temp_min) - 273.15).toFixed(2)} °C | {((data.main.temp_max) - 273.15).toFixed(2)} °C</p>
        </div>
      </div>
    </div>
  );
}

export default Weather;
