import axios from 'axios'
import { useState,useEffect } from 'react';

export default function W (){

    let [t,setT]=useState('tehran');
    const api=`http://api.openweathermap.org/data/2.5/weather?q=${t}&appid=b520176d65ff9c36b68f86ed7d1dd645`;
    let [d,setD]=useState();
    const getdata=async()=>{
        const response =await axios.get(api);
        setD(response.data);
    }
     useEffect(()=>{
        getdata();
        console.log(d)
     },[])

    const handlesubmit = (e)=>{
        e.preventDefault();
        getdata();
        console.log(d);
    }

    return( (d!=undefined) &&
        <div>
            {d.sys.country}
            <form onSubmit={handlesubmit}>
                <input type='text' value={t} onChange={(e)=>setT(e.target.value)}></input>
                <button type='submit'>done</button>
            </form>
        </div>
    )
}