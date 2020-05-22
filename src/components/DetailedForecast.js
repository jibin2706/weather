import React from 'react'

function DetailedForecast({ currentData }) {
  const getFormatededHour = (timestamp) => {
    const localTimeString = new Date(timestamp * 1000)
      .toLocaleTimeString('en-US', {
        timeZone: 'Asia/Tokyo',
      })
      .split(':')

    // converting timestring "6:46:25 PM" to "6pm"
    return `${localTimeString[0]}${localTimeString[localTimeString.length - 1]
      .substr(-2)
      .toLowerCase()}`
  }

  if (!currentData) return 'Loading'

  return (
    <section>
      <div>
        {currentData.temp}
        {currentData.weather[0].main}

        <div>
          <h1>Graph Here</h1>
        </div>

        <div>
          Pressure
          {currentData.pressure}
        </div>

        <div>
          Humidity
          {currentData.humidity} %
        </div>
      </div>

      <div>
        <div>
          Sunrise <br />
          {getFormatededHour(currentData.sunrise)}
        </div>

        <div>
          Sunset <br />
          {getFormatededHour(currentData.sunset)}
        </div>
      </div>
    </section>
  )
}

export default DetailedForecast
