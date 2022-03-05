import { BaggageOption } from '../../../../common/enums'


export interface ISearchRequestContract {
  luggage_size?: BaggageOption
  number_of_people?: number
  page?: number
  spoken_languages?: string
  with_pets?: string
  user_session?: string
}
