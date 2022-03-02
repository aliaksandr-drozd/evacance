import { IUser } from './user.interface'
import { BaggageOption } from '../enums'


export interface IEvacuationRequestForm {
  languages: string
  peopleCount: number
  contactData: string
  withPets: boolean
  withBaggage: BaggageOption
}

export interface IEvacuationRequestWaypoints {
  waypoints: string
}

export type IEvacuationRequest = IEvacuationRequestWaypoints & IEvacuationRequestForm & IUser
