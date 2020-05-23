import React from 'react'
import { getWeatherIconPath } from '../utils'
import styles from './DetailedForecast.module.css'

function DetailedForecast({ currentData }) {
  const getFormatededHour = (timestamp) => {
    const localTimeString = new Date(timestamp * 1000)
      .toLocaleTimeString('en-US', {
        timeZone: 'Asia/Tokyo',
      })
      .split(':')

    // converting timestring "6:46:25 PM" to "6pm"
    return `${localTimeString[0]}:${localTimeString[1]}${localTimeString[localTimeString.length - 1]
      .substr(-2)
      .toLowerCase()}`
  }

  if (!currentData) return 'Loading'

  return (
    <section className={styles.detailedContainer}>
      <div className={styles.currentTempContainer}>
        <h1 className={styles.currentTemp}>{Math.round(currentData.temp)}°C</h1>
        <img
          className={styles.currentTempIcon}
          src={getWeatherIconPath(currentData.weather[0].main)}
          alt={currentData.weather[0].main}
        />
      </div>

      <div>
        <p>Graph Here</p>
      </div>

      <div className={styles.secondaryStatsContainer}>
        <div className={styles.secondaryStats}>
          <span className='bold'>Pressure</span>
          <span>{currentData.pressure} hpa</span>
        </div>

        <div className={styles.secondaryStats}>
          <span className='bold'>Humidity</span>
          <span>{currentData.humidity} %</span>
        </div>
      </div>

      <div>
        <div className={styles.sunriseStatsContainer}>
          <div className={styles.sunriseStats}>
            <span className='bold'>Sunrise</span>
            <span className='text-lighter'>{getFormatededHour(currentData.sunrise)}</span>
          </div>

          <div className={styles.sunriseStats}>
            <span className='bold'>Sunset</span>
            <span className='text-lighter'>{getFormatededHour(currentData.sunset)}</span>
          </div>
        </div>
      </div>
    </section>
  )
}

export default DetailedForecast
