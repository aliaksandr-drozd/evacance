import { LatLngTuple } from 'leaflet'

import { BaggageOption } from '../enums'
import { LANGUAGE_TYPE } from '../types'


export interface ITransportationRequestForm {
  languages: LANGUAGE_TYPE[]
  peopleCount: number
  withPets: boolean
  withBaggage: BaggageOption
}

export interface ITransportationRequestWaypoints {
  waypoints: [LatLngTuple, LatLngTuple]
  segment: LatLngTuple[]
  tolerance: number
}

export type ITransportationRequest = ITransportationRequestWaypoints & ITransportationRequestForm
