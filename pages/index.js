import React, { useEffect, useState } from 'react'
import SearchBar from '../src/components/SearchBar'
import DailyForecast from '../src/components/DailyForecast'
import DetailedForecast from '../src/components/DetailedForecast'

const OPEN_WEATHER_API = '6903c2d823cce812920bda6a20370444'
const BASE_URL = 'https://api.openweathermap.org/data/2.5'

export default function index() {
  const [isLoading, setLoading] = useState(false)
  const [userLocation, setUserLocation] = useState('')
  const [dailyForecast, setDailyForecast] = useState([])
  const [hourlyForecast, setHourlyForecasts] = useState([])
  const [currentForecast, setCurrentForecast] = useState(undefined)
  const [activeDay, setActiveDay] = useState(new Date().getDate())

  useEffect(() => {
    // check if geolocation is supported/enabled on current browser
    if ('geolocation' in navigator) {
      navigator.geolocation.getCurrentPosition(
        function success(position) {
          setUserLocation(position)
        },
        function error(error_message) {
          // for when getting location results in an error
          console.error('An error has occured while retrieving location', error_message)
        }
      )
    } else {
      console.log('geolocation is not enabled on this browser')
    }
  }, [])

  useEffect(() => {
    fetch(`${BASE_URL}/onecall?lat=35&lon=139&cnt=20&units=metric&appid=${OPEN_WEATHER_API}`)
      .then((response) => response.json())
      .then((result) => {
        console.log(result)
        console.log(result.daily)
        setDailyForecast(result.daily)
        setCurrentForecast(result.current)
        setHourlyForecasts(result.hourly)
        // setUserLocation(result.city.name)
      })
  }, [])

  return (
    <div>
      <SearchBar location={userLocation} />
      <DailyForecast data={dailyForecast} activeDay={activeDay} setActiveDay={setActiveDay} />
      <DetailedForecast
        currentData={currentForecast}
        hourlyData={hourlyForecast}
        activeDay={activeDay}
      />
    </div>
  )
}
