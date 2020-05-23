import React, { useState, useEffect } from 'react'
import clsx from 'clsx'
import styles from './SearchBar.module.css'
import cities from '../../public/searchCities.json'
import SearchList from './SearchList'

function SearchBar({ location, setLocation }) {
  // TODO: need to use geocoding api to get address for coordinates
  const [searchText, setSearchText] = useState('Mumbai, Maharashtra')
  const [searchList, setSearchList] = useState([])

  useEffect(() => {
    if (searchText.length <= 1) {
      setSearchList([])
      return
    }

    var list = cities.filter((city) => {
      return city.name.toLowerCase().includes(searchText)
    })
    setSearchList(list)
  }, [searchText])

  const selectPlace = (place, coord) => {
    setSearchText(place)
    setLocation({ lat: coord.lat, long: coord.lon })
    setSearchList([])
  }

  return (
    <div className={styles.searchContainer}>
      <svg className={clsx(styles.icons, styles.iconLocation)} viewBox='0 0 512 512'>
        <path d='M256 0C153.755 0 70.573 83.182 70.573 185.426c0 126.888 165.939 313.167 173.004 321.035 6.636 7.391 18.222 7.378 24.846 0 7.065-7.868 173.004-194.147 173.004-321.035C441.425 83.182 358.244 0 256 0zm0 278.719c-51.442 0-93.292-41.851-93.292-93.293S204.559 92.134 256 92.134s93.291 41.851 93.291 93.293-41.85 93.292-93.291 93.292z' />
      </svg>
      <input
        className={styles.searchInput}
        type='text'
        placeholder='Search'
        onChange={(e) => setSearchText(e.target.value.toLowerCase())}
        value={searchText}
      />
      <button className={styles.searchBtn}>
        <svg className={clsx(styles.icons, styles.iconSearch)} viewBox='0 0 511.999 511.999'>
          <path d='M508.874 478.708L360.142 329.976c28.21-34.827 45.191-79.103 45.191-127.309C405.333 90.917 314.416 0 202.666 0S0 90.917 0 202.667s90.917 202.667 202.667 202.667c48.206 0 92.482-16.982 127.309-45.191l148.732 148.732c4.167 4.165 10.919 4.165 15.086 0l15.081-15.082c4.165-4.166 4.165-10.92-.001-15.085zM202.667 362.667c-88.229 0-160-71.771-160-160s71.771-160 160-160 160 71.771 160 160-71.771 160-160 160z' />
        </svg>
      </button>

      <section className={styles.searchListContainer}>
        {searchList.map((place) => (
          <SearchList key={place.id} selectPlace={selectPlace} data={place} keyword={searchText} />
        ))}
      </section>
    </div>
  )
}

export default SearchBar
