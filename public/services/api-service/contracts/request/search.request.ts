import { BaggageOption } from '../../../../common/enums'
import { LANGUAGE_TYPE } from '../../../../common/types'


export interface ISearchRequest {
  luggage_size: BaggageOption
  number_of_people: number
  page?: number
  spoken_languages: LANGUAGE_TYPE
  with_pets: boolean
}
