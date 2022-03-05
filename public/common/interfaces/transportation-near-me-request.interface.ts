import { BaggageOption } from '../enums'
import { LANGUAGE_TYPE } from '../types'


export interface ITransportationNearMeRequestForm {
  radius: number
  languages: LANGUAGE_TYPE[]
  peopleCount: number
  withPets: boolean
  withBaggage: BaggageOption
}

export type ITransportationNearMeRequest = ITransportationNearMeRequestForm
