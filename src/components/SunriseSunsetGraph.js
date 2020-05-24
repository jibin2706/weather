import { useEffect, useState } from 'react'
import { ResponsiveContainer, AreaChart, Area, XAxis } from 'recharts'
import { getFormatededHourObject } from '../utils'

function SunriseSunsetGraph({ start, end, timezone }) {
  const [data, setData] = useState([])

  useEffect(() => {
    const a = getFormatededHourObject(start, timezone)
    const b = getFormatededHourObject(end, timezone)
    const midTime = parseInt((a.hour + b.format == 'pm' ? b.hour + 12 : b.hour) / 2)
    console.log(a.hour, b.format == 'pm' ? b.hour + 12 : b.hour)
    var data = [
      { name: a.hour - 1 + a.format, value: 0 },
      { name: '', value: 0 },
      { name: midTime > 12 ? 12 - midTime + 'pm' : midTime + 'am', value: 1 },
      { name: '', value: 0 },
      { name: b.hour + 1 + b.format, value: 0 },
    ]
    setData(data)
  }, [start, end, timezone])

  return (
    <ResponsiveContainer>
      <AreaChart data={data} margin={{ left: 18, right: 10 }}>
        <defs>
          <linearGradient id='time' x1='0' y1='0' x2='0' y2='1'>
            <stop offset='5%' stopColor='#F7E0AF' stopOpacity={0.6} />
            <stop offset='90%' stopColor='#F7E0AF' stopOpacity={0.1} />
          </linearGradient>
        </defs>
        <XAxis dataKey='name' tickLine={false} />
        <Area type='basisClosed' dataKey='value' stroke='#FEDB41' fill='url(#time)' />
      </AreaChart>
    </ResponsiveContainer>
  )
}

export default SunriseSunsetGraph
