import React from 'react'
import { getWeatherIconPath } from '../utils'
import styles from './DailyForecasts.module.css'

function DailyForecast({ data }) {
  const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']

  return (
    <section className={styles.forecastsContainer}>
      {data.map((forecast, index) => (
        <div className={styles.dailyForecast} key={forecast.dt}>
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
      ))}
    </section>
  )
}

export default DailyForecast
