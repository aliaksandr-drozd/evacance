import React, { FC } from 'react'
import MarkerClusterGroup from 'react-leaflet-markercluster'
import { Marker, Popup } from 'react-leaflet'
import { divIcon, point } from 'leaflet'

import { IWaitingPassengerResponse, IWaitingPassengersResponse } from '../../common/interfaces'
import { Map, Request } from '../../common/components'
import { DEFAULT_MAP_CENTER } from '../../common/consts'
import styles from "./styles.module.less";
import { DotLoading } from "antd-mobile";


export interface IEvacuationMapScreenComponentProps {
  waitingPassengers: IWaitingPassengersResponse[]
  isPassengerDataLoading: boolean
  passengerData?: IWaitingPassengerResponse
  onPassengerDataOpen: (id: string) => void
  onPassengerDataClose: () => void
}

export const EvacuationMapScreenComponent: FC<IEvacuationMapScreenComponentProps> = ({
  waitingPassengers,
  isPassengerDataLoading,
  passengerData,
  onPassengerDataOpen,
  onPassengerDataClose,
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
              eventHandlers={ {
                popupopen: () => {
                  onPassengerDataOpen(passenger.id)
                },
                popupclose: onPassengerDataClose
              } }
              icon={
                divIcon({
                  className: 'custom-marker',
                  html: `<span>${passenger.peopleCount}</span>`,
                  iconSize: [20, 20],
                  iconAnchor: [10, 10]
                })
              }
            >
              <Popup>
                {
                  isPassengerDataLoading &&
                  <span style={ { fontSize: '60px' } }>
                    <DotLoading color="primary" />
                  </span>
                }
                {
                  !!passengerData &&
                  <Request
                    isFromHidden
                    request={ passengerData }
                  />
                }
              </Popup>
            </Marker>
          )
        }
      </MarkerClusterGroup>
    </Map>
  )
}
