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

export const getFormatededHour = (timestamp, timezone) => {
  const localTimeString = new Date(timestamp * 1000)
    .toLocaleTimeString('en-US', {
      timeZone: timezone,
    })
    .split(':')
  // converting timestring "6:46:25 PM" to "6pm"
  return `${localTimeString[0]}:${localTimeString[1]}${localTimeString[localTimeString.length - 1]
    .substr(-2)
    .toLowerCase()}`
}

export const getFormatededHourObject = (timestamp, timezone) => {
  const localTimeString = new Date(timestamp * 1000)
    .toLocaleTimeString('en-US', {
      timeZone: timezone,
    })
    .split(':')
  return {
    hour: +localTimeString[0],
    format: localTimeString[localTimeString.length - 1].substr(-2).toLowerCase(),
  }
}
