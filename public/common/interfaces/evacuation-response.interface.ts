import { LatLngTuple } from 'leaflet'

import { ITS } from './ts.interface'
import { IRecordId } from './record-id.interface'
import { BaggageOption } from '../enums'
import { LANGUAGE_TYPE } from '../types'


export interface IEvacuationResponseForm {
  languages: LANGUAGE_TYPE[]
  peopleCount: number
  contactData: string
  withPets: boolean
  withBaggage: BaggageOption
}

export interface IEvacuationResponseWaypoints {
  waypoints: [LatLngTuple, LatLngTuple]
}

export type IEvacuationResponse = IEvacuationResponseWaypoints & IEvacuationResponseForm & ITS & IRecordId
