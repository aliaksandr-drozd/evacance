import { LatLngTuple } from 'leaflet'

import { IUser } from './user.interface'
import { ITS } from './ts.interface'
import { IRecordId } from './record-id.interdace'
import { BaggageOption } from '../enums'


export interface IEvacuationResponseForm {
  languages: string[]
  peopleCount: number
  contactData: string
  withPets: boolean
  withBaggage: BaggageOption
}

export interface IEvacuationResponseWaypoints {
  waypoints: [LatLngTuple, LatLngTuple]
}

export type IEvacuationResponse = IEvacuationResponseWaypoints & IEvacuationResponseForm & IUser & ITS & IRecordId
