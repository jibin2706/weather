import React from 'react'
import { getWeatherIconPath } from '../utils'
import styles from './DailyForecasts.module.css'

function DailyForecast({ data, activeDay, setActiveDay }) {
  const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']

  const changeDetailedForecast = (e) => {
    setActiveDay(e.target.value)
  }

  return (
    <section className={styles.forecastsContainer}>
      {data.map((forecast, index) => (
        <div className={styles.dailyForecastContainer} key={forecast.dt}>
          <input
            className={styles.activeForecastSelector}
            type='radio'
            name='active_day'
            onChange={changeDetailedForecast}
            checked={activeDay == new Date(forecast.dt * 1000).getDate()}
            value={new Date(forecast.dt * 1000).getDate()}
          />
          <div className={styles.dailyForecast}>
            <p className=''>{days[(new Date().getDay() + index) % 7]}</p>
            <p>
              <span>{Math.round(forecast.temp.max)}°</span>{' '}
              <span className='text-lighter'>{Math.round(forecast.temp.min)}°</span>
            </p>
            <img
              className={styles.forecastIcon}
              src={getWeatherIconPath(forecast.weather[0].main)}
              alt={forecast.weather[0].main}
            />
            <p className='text-lighter'>{forecast.weather[0].main}</p>
          </div>
        </div>
      ))}
    </section>
  )
}

export default DailyForecast
