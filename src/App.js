import logo from './logo.svg';
import './App.css';
import { useEffect,useState } from 'react';

function App() {
  let [place,setPlace] = useState('')
  let [input,setInput] =useState('')
  let [city,setCity] = useState('')
  let lang = ['de','ru','en']
  let [activeLang,setActiveLang] = useState(0) 
  let [currentWeather,setCurrentWeather] = useState({days:[]})
  useEffect(()=>{
    fetch(`https://api.openweathermap.org/data/2.5/forecast?q=${place}&lang=${lang[activeLang]}&units=metric&APPID=1eec2ec50e7ee63f95ab7b35df822830`)
    .then(response=>{
      return response.json()
    }).catch(e=>{
      console.log(e)
    })
    .then(data=>{
      console.log(data)
      setCity(data.city.name)
      console.log(city)
      const dailyData = data.list.filter(reading=>reading.dt_txt.includes("12:00:00"))

      setCurrentWeather({days:[...dailyData]})
      console.log(data)
      console.log(dailyData)
    },
      )
  },[activeLang,place])
  console.log(currentWeather)
  
  return (
    <div className="App">
    <input value={input} onChange={(e)=>setInput(e.currentTarget.value)}/>
    <button onClick={()=>{
      setPlace(input)
    }}>{lang[activeLang]=='ru'&&'Отправить'||lang[activeLang]=='en'&&'Send'||'Schicken'}</button>
     {lang.map((el,index)=>
     <button key={index} onClick={()=>setActiveLang(index)}>{el}</button>
     )}
     <div>
       <div>{city}</div>
       {currentWeather.days.map(el=>
        
        <div key={el.dt_txt}>{el.dt_txt}:<p>{Math.floor(el.main.temp)}C</p></div> 
        )}
     </div>
    </div>
  );
}

export default App;
