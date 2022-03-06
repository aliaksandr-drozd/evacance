import React, { FC } from 'react'
import MarkerClusterGroup from 'react-leaflet-markercluster'
import { Marker } from 'react-leaflet'
import { divIcon, point } from 'leaflet'

import { IWaitingPassengersResponse } from '../../common/interfaces'
import { Map } from '../../common/components'
import { DEFAULT_MAP_CENTER } from '../../common/consts'


export interface IEvacuationMapScreenComponentProps {
  waitingPassengers: IWaitingPassengersResponse[]
}

export const EvacuationMapScreenComponent: FC<IEvacuationMapScreenComponentProps> = ({
  waitingPassengers,
}) => {

  return (
    <Map
      center={ DEFAULT_MAP_CENTER }
      whenCreated={ () => {} }
    >
      <MarkerClusterGroup
        iconCreateFunction={
          (cluster) => {
            const children = cluster.getAllChildMarkers()
            const className = 'custom-marker shipping-point'
            let count = 0

            children.map((i) => count += +(i.options.title || 0))

            return divIcon({ html: `<span>${ count }</span>`, className, iconSize: point(20, 34) })
          }
        }
      >
        {
          waitingPassengers.map((passenger) =>
            <Marker
              position={ passenger.point }
              key={ passenger.id }
              title={ passenger.peopleCount.toString() }
              icon={
                divIcon({
                  className: 'custom-marker',
                  html: `<span>${passenger.peopleCount}</span>`,
                  iconSize: [20, 20],
                  iconAnchor: [10, 10]
                })
              }
            />
          )
        }
      </MarkerClusterGroup>
    </Map>
  )
}
