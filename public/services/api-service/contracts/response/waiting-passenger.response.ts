import { Point } from 'geojson'

import { BaggageOption } from '../../../../common/enums'
import { LOCALE_MAP } from '../../../../common/components'


export interface IWaitingPassengerResponseContract {
  id: string
  last_active_at: string
  spoken_languages: (keyof typeof LOCALE_MAP)[]
  number_of_people: number
  with_pets: boolean
  comment: string
  luggage_size: BaggageOption
  waypoints: {
    order: number
    point: Point
  }[]
}
