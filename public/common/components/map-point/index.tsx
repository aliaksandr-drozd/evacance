import React, { FC } from 'react'
import { LatLngTuple } from 'leaflet'
import { MapContainer, Marker, TileLayer } from 'react-leaflet'

import styles from './styles.module.less'


type IMapPointProps = {
  center: LatLngTuple
}

export const MapPoint: FC<IMapPointProps> = ({ center }) => {
  return (
    <div className={ styles.screenWrapper }>
      <MapContainer
        center={ center }
        zoom={ 10 }
        scrollWheelZoom={ false }
        className={ styles.map }
        zoomControl={ false }
        doubleClickZoom={ false }
        closePopupOnClick={ false }
        dragging={ false }
        touchZoom={ false }
      >
        <TileLayer url={ process.env.TILE_SERVER } />
        <Marker position={ center } />
      </MapContainer>
      <div className={ styles.overlay } />
    </div>
  )
}
