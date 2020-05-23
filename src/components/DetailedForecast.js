import React, { useEffect, useState } from 'react'
import { XAxis, CartesianGrid, Line, LineChart } from 'recharts'
import { getWeatherIconPath, getLocaleDate } from '../utils'
import styles from './DetailedForecast.module.css'

function DetailedForecast({ currentData, hourlyData, activeDay }) {
  const [lineChartData, setLineChartData] = useState([])

  useEffect(() => {
    // formatting data to fit the chart
    const data = hourlyData.filter((forecast) => {
      if (getLocaleDate(forecast.dt).day == activeDay)
        return {
          dt: Math.round(forecast.dt),
          name: `${Math.round(forecast.temp)}°`,
          temp: Math.round(forecast.temp),
        }
    })

    setLineChartData(data)
  }, [hourlyData, activeDay])

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

  if (!currentData) return <div className='loader'>Loading...</div>
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

      <div className={styles.graphContainer}>
        <LineChart
          width={730}
          height={250}
          data={lineChartData}
          margin={{ top: 10, right: 30, left: 10, bottom: 0 }}>
          <defs>
            <linearGradient id='temp' x1='0' y1='0' x2='0' y2='1'>
              <stop offset='5%' stopColor='#00a6fa' stopOpacity={0.6} />
              <stop offset='90%' stopColor='#00a6fa' stopOpacity={0} />
            </linearGradient>
          </defs>
          <XAxis dataKey='temp' />
          <CartesianGrid horizontal={false} strokeWidth={3} strokeOpacity={0.4} />

          <Line
            type='monotone'
            dataKey='temp'
            stroke='#00a6fa'
            strokeWidth={2}
            dot={{ fill: 'white', r: 5, stroke: '#00a6fa', strokeWidth: 2 }}
            fillOpacity={1}
            fill='url(#temp)'
          />
        </LineChart>
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

      <div className={styles.sunriseStatsContainer}>
        <div className='d-flex justify-space-between'>
          <div className={styles.sunriseStats}>
            <span className='bold'>Sunrise</span>
            <span className='text-lighter'>{getFormatededHour(currentData.sunrise)}</span>
          </div>

          <div className={styles.sunriseStats}>
            <span className='bold'>Sunset</span>
            <span className='text-lighter'>{getFormatededHour(currentData.sunset)}</span>
          </div>
        </div>
        <img className={styles.sunriseImage} src='/sunrise.png' alt='Sunrise Sunset' />
      </div>
    </section>
  )
}

export default DetailedForecast
