import React, { FC } from 'react'
import useGeolocation from 'react-hook-geolocation'
import { DotLoading, Toast } from 'antd-mobile'
import { LatLngTuple } from 'leaflet'
import { useTranslation } from 'react-i18next'

import styles from './styles.module.less'


export const WithGeolocation: FC = ({ children }) => {
  const { t } = useTranslation()
  const geolocation = useGeolocation()
  const isGeolocationPending = (geolocation.latitude === null || geolocation.longitude === null) && !geolocation.error
  const position: LatLngTuple = [geolocation.latitude, geolocation.longitude]

  if (geolocation.error) {
    Toast.show({ content: 'Geolocation obtain error! Used default values.' })
  }

  const childrenWithProps = React.Children.map(children, child => {
    if (React.isValidElement(child)) {

      return React.cloneElement(child, {
        position: geolocation.latitude !== null && geolocation.longitude !== null && !geolocation.error ? position : null
      })
    }

    return child
  })

  return (
    <>
      {
        isGeolocationPending &&
        <div className={styles.loader}>
          <h1>Trying to get your location</h1>
          <DotLoading color="primary"/>
        </div>
      }

      { !isGeolocationPending && childrenWithProps }
    </>
  )
}
