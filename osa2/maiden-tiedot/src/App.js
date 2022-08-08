import {useState, useEffect } from 'react'
import axios from 'axios'

const Filter = ({newSubstring, handleSubstringChange}) =>
  <div>
    find countries 
    <input value={newSubstring} onChange={handleSubstringChange} />
  </div>


const CountryInfo = ({country}) => {
  const [weather, setWeather] = useState({main: {temp:0.00}, wind: {speed:0.00}, weather:[{icon: '01d'}]})
  const lat = country.capitalInfo.latlng[0]
  const lon = country.capitalInfo.latlng[1]
  const units = 'metric'

  const weatherReqAddress = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${process.env.REACT_APP_KEY_WEATHER}&units=${units}`
  const iconAddress =`http://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`

  useEffect(() => {
    axios
      .get(weatherReqAddress)
      .then(response => {
        setWeather(response.data)
      })
  }, [])

  return (
    <div>
      <h2>{country.name.common}</h2>
      <p>capital {country.capital}</p>
      <p>area {country.area}</p>
      <b>languages:</b>
      <ul>
        {Object.entries(country.languages).map(([key, language]) => 
          <li key={key}> {language} </li>
        )}
      </ul>
      <img src={country.flags.png} alt='flag' width='200' />
      <h3>Weather in {country.capital}</h3>
      <p>temperature {weather.main.temp} Celsius</p>
      <img src={iconAddress} alt='weather icon'/>
      <p>wind {weather.wind.speed} m/s</p>
    </div>
  )
}


const App = () => {
  const [countries, setCountries] = useState([])
  const [newSubstring, setNewSubstring] = useState('')  
  
  useEffect(() => {
    axios
      .get('https://restcountries.com/v3.1/all')
      .then(response => {
        setCountries(response.data)
      })
  }, [])

  const handleSubstringChange = (event) => {
    setNewSubstring(event.target.value)
  }

  const listSelectedCountries = ({selectedCountries}) => 
    <div >
      {selectedCountries.map(country =>
        <p key={country.name.official}>
          {country.name.common}
          <button onClick= {() => setNewSubstring(country.name.common)}>show</button>
        </p>)}
    </div>

  const selectCountries = () => {
    const selectedCountries = countries.filter(country =>
      country.name.common.toLowerCase().includes(newSubstring.toLowerCase())
    )
    return(
      newSubstring.length === 0 ? <p></p>
      : selectedCountries.length > 10 ? <p>Too many matches, specify another filter</p>
      : selectedCountries.length === 1 ? <CountryInfo key={selectedCountries[0].name.official} country={selectedCountries[0]} />
      : <div>{listSelectedCountries({selectedCountries})}</div>
      )
  }

  return (
    <>
      <Filter newSubstring={newSubstring} handleSubstringChange={handleSubstringChange} />
      <div>{selectCountries()}</div>
    </>
  )
}

export default App;
