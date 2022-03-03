import { LatLngTuple } from 'leaflet'

import { BaggageOption } from '../enums'
import { LANGUAGE_TYPE } from '../types'
import { ITS } from './ts.interface'
import { IRecordId } from './record-id.interface'


export interface ITransportationResponseForm {
  languages: LANGUAGE_TYPE[]
  peopleCount: number
  contactData: string
  withPets: boolean
  withBaggage: BaggageOption
}

export interface ITransportationResponseWaypoints {
  waypoints: [LatLngTuple, LatLngTuple]
}

export type ITransportationResponse = ITransportationResponseForm & ITransportationResponseWaypoints & ITS & IRecordId
