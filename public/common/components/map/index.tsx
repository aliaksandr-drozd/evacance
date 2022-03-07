import React, { FC, useState } from 'react'
import { MapContainer, TileLayer } from 'react-leaflet'
import { LatLngTuple, Browser, Map as LeafletMap } from 'leaflet'

import styles from './styles.module.less'


export interface IMapProps {
  center: LatLngTuple
  whenCreated?: (map: LeafletMap) => void
}

export const Map: FC<IMapProps> = ({
  center,
  children,
  whenCreated,
}) => {
  const [isCreated, setIsCreated] = useState<boolean>(false)
  const onCreate = (map: LeafletMap) => {
    setIsCreated(true)

    whenCreated && whenCreated(map)
  }

  return (
    <MapContainer
      center={ center }
      minZoom={ 2 }
      zoomSnap={ 0 }
      zoom={ 6 }
      zoomAnimation={ true }
      className={ styles.map }
      bounceAtZoomLimits={ false }
      scrollWheelZoom={ !Browser.mobile }
      doubleClickZoom={ !Browser.mobile }
      closePopupOnClick={ true }
      dragging={ true }
      touchZoom={ Browser.mobile }
      boxZoom={ true }
      whenCreated={ onCreate }
      tap={ !Browser.mobile }
      gestureHandling={ Browser.mobile }
    >
      <TileLayer url={ process.env.TILE_SERVER } />
      { isCreated && children }
    </MapContainer>
  )
}
