export const getWeatherIconPath = (weather) => {
  switch (weather) {
    case 'Sunny':
      return '/icons/sunny.svg'
    case 'Rain':
      return '/icons/rainy.svg'
    case 'Clouds':
      return '/icons/cloudy.svg'
    default:
      return '/icons/sunny.svg'
  }
}

// format timestamp into {day: '23', month: '05', year: '2020'}
export const getLocaleDate = (timestamp) => {
  const localeDate = new Date(timestamp * 1000).toLocaleDateString().split('/')
  return {
    day: +localeDate[0],
    month: +localeDate[1],
    year: +localeDate[2],
  }
}
