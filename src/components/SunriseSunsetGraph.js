import { ResponsiveContainer, AreaChart, Area, XAxis, Tooltip } from 'recharts'
function SunriseSunsetGraph({ start, end, timezone }) {
  var data = []
  const time = [1, 2, 3, 4, 5, 6, 7, 8, 9, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23]

  const getFormatededHour = (timestamp) => {
    const localTimeString = new Date(timestamp * 1000)
      .toLocaleTimeString('en-US', {
        timeZone: timezone,
      })
      .split(':')
    return localTimeString[localTimeString.length - 1].substr(-2) === 'PM'
      ? +localTimeString[0] + 12
      : +localTimeString[0]
  }

  var a = getFormatededHour(start)
  var b = getFormatededHour(end)
  const midTime = parseInt((a + b) / 2)
  data = [
    { name: a - 1, value: 0 },
    { name: '', value: 0 },
    { name: midTime, value: 1 },
    { name: '', value: 0 },
    { name: b - 1, value: 0 },
  ]
  //   console.log({ dataset })

  return (
    <ResponsiveContainer>
      <AreaChart data={data}>
        <defs>
          <linearGradient id='time' x1='0' y1='0' x2='0' y2='1'>
            <stop offset='5%' stopColor='#F7E0AF' stopOpacity={0.6} />
            <stop offset='90%' stopColor='#F7E0AF' stopOpacity={0.1} />
          </linearGradient>
        </defs>
        <XAxis dataKey='name' tickLine={false} />
        <Area
          type='basisClosed'
          dataKey='value'
          stroke='#FEDB41'
          fillOpacity={1}
          fill='url(#time)'
        />
      </AreaChart>
    </ResponsiveContainer>
  )
}

export default SunriseSunsetGraph
