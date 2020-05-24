import React, { useEffect, useState } from 'react'
import { getWeatherIconPath } from '../utils'
import styles from './SearchList.module.css'

const OPEN_WEATHER_API = '6903c2d823cce812920bda6a20370444'
const BASE_URL = 'https://api.openweathermap.org/data/2.5'

function SearchList({ data, keyword, selectPlace }) {
  const [weather, setWeather] = useState(null)
  useEffect(() => {
    fetch(
      `${BASE_URL}/weather?lat=${data.lat}&lon=${data.lon}&units=metric&appid=${OPEN_WEATHER_API}`
    )
      .then((response) => response.json())
      .then((result) => {
        setWeather(result)
      })
  }, [])

  const highlightKeyword = (string, keyword) => {
    return string.toLowerCase().replace(keyword, `<b class="text-capitalize">${keyword}</b>`)
  }

  if (!weather) return null
  return (
    <div
      className={styles.searchListContainer}
      onClick={() => selectPlace(`${data.name}, ${data.state}`, { lat: data.lat, lon: data.lon })}>
      <span>
        <span
          className='text-capitalize'
          dangerouslySetInnerHTML={{ __html: highlightKeyword(data.name, keyword) }}
        />
        ,<span className='text-lighter'> {data.state}</span>
      </span>

      <div className='d-flex justify-space-between'>
        <div className='d-flex fd-column'>
          <span>{Math.round(weather.main.temp)}° C</span>
          <span className='text-lighter'>{weather.weather[0].main}</span>
        </div>
        <img
          className={styles.weatherIcon}
          src={getWeatherIconPath(weather.weather[0].main)}
          alt={weather.weather[0].main}
        />
      </div>
    </div>
  )
}

export default SearchList
