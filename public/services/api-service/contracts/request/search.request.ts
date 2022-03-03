import { BaggageOption } from '../../../../common/enums'


export interface ISearchRequest {
  luggage_size: BaggageOption
  number_of_people: number
  page?: number
  spoken_languages: string
  with_pets: boolean
}
