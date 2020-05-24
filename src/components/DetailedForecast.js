import React, { useEffect, useState } from 'react'
import { XAxis, CartesianGrid, Tooltip, AreaChart, Area } from 'recharts'
import SunriseSunsetGraph from './SunriseSunsetGraph'
import { getWeatherIconPath, getFormatededHour } from '../utils'
import styles from './DetailedForecast.module.css'

function DetailedForecast({ currentData, hourlyData, activeDay, timezone }) {
  const [lineChartData, setLineChartData] = useState([])

  // formatting data for the chart
  useEffect(() => {
    let data = []
    hourlyData.forEach((forecast) => {
      const hours = new Date(forecast.dt * 1000).getHours()
      if (new Date(forecast.dt * 1000).getDate() == activeDay) {
        data.push({
          name: `${Math.round(forecast.temp)}°`,
          temp: forecast.temp,
          hour: `${hours > 12 ? hours - 12 : hours}${hours >= 12 ? 'pm' : 'am'}`,
        })
      }
    })

    setLineChartData(data)
  }, [hourlyData, activeDay])

  if (!currentData) return <div className='loader'>Loading...</div>
  return (
    <section className={styles.detailedContainer}>
      <div className={styles.currentTempContainer}>
        <h1 className={styles.currentTemp}>{Math.round(currentData.temp.max)}°C</h1>
        <img
          className={styles.currentTempIcon}
          src={getWeatherIconPath(currentData.weather[0].main)}
          alt={currentData.weather[0].main}
        />
      </div>

      <div className={styles.graphContainer}>
        <AreaChart
          width={730}
          height={250}
          data={lineChartData}
          margin={{ top: 10, right: 30, left: 10, bottom: 0 }}>
          <defs>
            <linearGradient id='temp' x1='0' y1='0' x2='0' y2='1'>
              <stop offset='5%' stopColor='#00a6fa' stopOpacity={0.6} />
              <stop offset='50%' stopColor='#00a6fa' stopOpacity={0} />
            </linearGradient>
          </defs>
          <XAxis
            dataKey='hour'
            axisLine={false}
            tickLine={false}
            allowDecimals={false}
            allowDuplicatedCategory={true}
          />
          <CartesianGrid horizontal={false} strokeWidth={3} strokeOpacity={0.4} />
          <Tooltip />
          <Area
            type='monotone'
            dataKey='temp'
            stroke='#00a6fa'
            strokeWidth={2}
            dot={{ fill: 'white', r: 5, stroke: '#00a6fa', strokeWidth: 2 }}
            fillOpacity={1}
            fill='url(#temp)'
          />
        </AreaChart>
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
            <span className='text-lighter'>{getFormatededHour(currentData.sunrise, timezone)}</span>
          </div>

          <div className={styles.sunriseStats}>
            <span className='bold'>Sunset</span>
            <span className='text-lighter'>{getFormatededHour(currentData.sunset, timezone)}</span>
          </div>
        </div>
        <div style={{ height: '200px' }}>
          <SunriseSunsetGraph
            start={currentData.sunrise}
            end={currentData.sunset}
            timezone={timezone}
          />
        </div>
      </div>
    </section>
  )
}

export default DetailedForecast
