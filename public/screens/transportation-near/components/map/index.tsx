import React, { FC, useMemo } from 'react'
import { LatLngTuple, Map as LeafletMap } from 'leaflet'
import { Circle, Marker } from 'react-leaflet'

import { LeafletControlGeocoder, Map } from '../../../../common/components'


export interface IMapComponentProps {
  radius: number
  center: LatLngTuple
  markerPosition: LatLngTuple
  whenCreated: (map: LeafletMap) => void
  onMarkerLocationChange: (position: LatLngTuple) => void
}

const MapComponent: FC<IMapComponentProps> = ({
  radius,
  center,
  markerPosition,
  whenCreated,
  onMarkerLocationChange,
}) => {
  const mapCenter = useMemo(() => center, [])

  return (
    <Map
      center={ mapCenter }
      whenCreated={ whenCreated }
    >
      <LeafletControlGeocoder />

      <Circle
        center={ markerPosition }
        radius={ radius * 1000 }
      />

      <Marker
        eventHandlers={
          {
            dragend: (e) => {
              const coords = e.target.getLatLng()
              const tuple: [number, number] = [coords.lat, coords.lng]

              onMarkerLocationChange(tuple)
            }
          }
        }
        position={ markerPosition }
        draggable
      />
    </Map>
  )
}

export { MapComponent as Map }
