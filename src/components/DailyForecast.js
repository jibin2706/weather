import React from 'react'

function DailyForecast({ data }) {
  const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']
  return (
    <section>
      {data.map((forecast, index) => (
        <div key={forecast.dt}>
          {days[(new Date().getDay() + index) % 7]}
          {forecast.temp.max} | {forecast.temp.min}
          {forecast.weather[0].main}
        </div>
      ))}
    </section>
  )
}

export default DailyForecast
