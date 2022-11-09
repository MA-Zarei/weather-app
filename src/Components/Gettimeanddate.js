import axios from 'axios'
import { useState , useEffect } from 'react';
import '../Style.css';

function Gettimeanddate({lonn,latt}){
    // let [n,setN]=useState();
    // let [t,setT]=useState();
    // setN(lonn);
    // setT(latt);
    let [td,setTD]=useState();
    let time,day,month,year,temp;
    // let [result,setResult]=useState();
    // let [time_12,setTime_12]=useState();
    let flag=true;
    let t= latt;
    let n=lonn;
    const api=`https://api.ipgeolocation.io/timezone?apiKey=c3eadbf6c15042b8bde80079121ded66&lat=${t}&long=${n}`;
    const ipgeolocation= async ()=>{
        const response = await axios.get(api);
        setTD(response.data);
        // flag=false;
    }
    useEffect(()=>{
        ipgeolocation()
    },[n])
    
    if (td!=undefined){
        time=td.time_12;
        day=((td.date_time_txt).split(','))[0];
        month=((td.date_time_txt).split(','))[1];
        year=((td.date).split('-'))[0];
        temp=`${day}, ${month}, ${year}`;
    }
    return(
        <>
            <p>{temp}</p>
            <p>{time}</p>
        </>
    )
}

export default Gettimeanddate;