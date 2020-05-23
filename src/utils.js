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
