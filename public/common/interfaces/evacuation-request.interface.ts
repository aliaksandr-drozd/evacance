import { LatLngTuple } from 'leaflet'

import { IUser } from './user.interface'
import { BaggageOption } from '../enums'
import { LOCALE_MAP } from '../components'


export interface IEvacuationRequestForm {
  lifetime: number
  languages: (keyof typeof LOCALE_MAP)[]
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
