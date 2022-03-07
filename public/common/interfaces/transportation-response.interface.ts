import { LatLngTuple } from 'leaflet'

import { BaggageOption } from '../enums'
import { ITS } from './ts.interface'
import { IRecordId } from './record-id.interface'
import { LOCALE_MAP } from '../components'


export interface ITransportationResponseForm {
  languages: (keyof typeof LOCALE_MAP)[]
  peopleCount: number
  contactData: string
  withPets: boolean
  withBaggage: BaggageOption
}

export interface ITransportationResponseWaypoints {
  waypoints: [LatLngTuple, LatLngTuple]
}

export type ITransportationResponse = ITransportationResponseForm & ITransportationResponseWaypoints & ITS & IRecordId
