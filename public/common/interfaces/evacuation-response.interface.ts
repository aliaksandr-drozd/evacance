import { LatLngTuple } from 'leaflet'

import { ITS } from './ts.interface'
import { IRecordId } from './record-id.interface'
import { BaggageOption } from '../enums'
import { LOCALE_MAP } from '../components'


export interface IEvacuationResponseForm {
  languages: (keyof typeof LOCALE_MAP)[]
  peopleCount: number
  contactData: string
  withPets: boolean
  withBaggage: BaggageOption
}

export interface IEvacuationResponseWaypoints {
  waypoints: [LatLngTuple, LatLngTuple]
}

export type IEvacuationResponse = IEvacuationResponseWaypoints & IEvacuationResponseForm & ITS & IRecordId
