import { LatLngTuple } from 'leaflet'

import { IUser } from './user.interface'
import { BaggageOption } from '../enums'
import { LANGUAGE_TYPE } from '../types'


export interface IEvacuationRequestForm {
  languages: LANGUAGE_TYPE[]
  peopleCount: number
  contactData: string
  withPets: boolean
  withBaggage: BaggageOption
  route: LatLngTuple[]
}

export interface IEvacuationRequestWaypoints {
  waypoints: [LatLngTuple, LatLngTuple]
}

export type IEvacuationRequest = IEvacuationRequestWaypoints & IEvacuationRequestForm & IUser
