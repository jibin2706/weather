import React, { useEffect, useState } from 'react'
import Head from 'next/head'
import SearchBar from '../src/components/SearchBar'
import DailyForecast from '../src/components/DailyForecast'
import DetailedForecast from '../src/components/DetailedForecast'

const OPEN_WEATHER_API = '6903c2d823cce812920bda6a20370444'
const BASE_URL = 'https://api.openweathermap.org/data/2.5'

export default function index() {
  const [userCoords, setUserCoords] = useState(null)
  const [dailyForecast, setDailyForecast] = useState([])
  const [hourlyForecast, setHourlyForecasts] = useState([])
  const [currentForecast, setCurrentForecast] = useState(undefined)
  const [activeDay, setActiveDay] = useState(new Date().getDate())
  const [locationName, setLocationName] = useState('')

  useEffect(() => {
    requestLocation()
  }, [])

  useEffect(() => {
    if (userCoords == null) {
      requestLocation()
      return
    }

    fetch(
      `${BASE_URL}/onecall?lat=${userCoords.lat}&lon=${userCoords.long}&cnt=20&units=metric&appid=${OPEN_WEATHER_API}`
    )
      .then((response) => response.json())
      .then((result) => {
        console.log(result)
        console.log(result.daily)
        setDailyForecast(result.daily)
        setCurrentForecast(result.current)
        setHourlyForecasts(result.hourly)
      })
  }, [userCoords?.lat])

  const requestLocation = () => {
    // check if geolocation is supported/enabled on current browser
    if ('geolocation' in navigator) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setUserCoords({ lat: position.coords.latitude, long: position.coords.longitude })
        },
        (error_message) => {
          console.error('An error has occured while retrieving location', error_message)
          getLocationUsingIp()
        }
      )
    } else {
      console.log('geolocation is not enabled on this browser')
      getLocationUsingIp()
    }
  }

  const getLocationUsingIp = () => {
    fetch('https://freegeoip.app/json/')
      .then((response) => response.json())
      .then((result) => {
        console.log(result)
        setLocationName(`${result.city}, ${result.region_name}`)
        setUserCoords({ lat: result.latitude, long: result.longitude })
      })
      .catch((e) => {
        console.log(e)
      })
  }

  return (
    <div>
      <Head>
        <title>Weather App</title>
      </Head>
      <SearchBar setLocation={setUserCoords} locationName={locationName} />
      <DailyForecast data={dailyForecast} activeDay={activeDay} setActiveDay={setActiveDay} />
      <DetailedForecast
        currentData={currentForecast}
        hourlyData={hourlyForecast}
        activeDay={activeDay}
      />
    </div>
  )
}
