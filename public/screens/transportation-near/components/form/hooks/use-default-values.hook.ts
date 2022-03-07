import { Dispatch, SetStateAction } from 'react'

import { DEFAULT_APP_LANGUAGE, DEFAULT_SEARCH_RADIUS } from '../../../../../common/consts'
import { ISearchInRadiusRequestForm } from '../../../../../common/interfaces'
import { useLocalStorage } from '../../../../../common/hooks'
import { BaggageOption } from '../../../../../common/enums'


type SetValue<T> = Dispatch<SetStateAction<T>>

export function useDefaultValues(): [ISearchInRadiusRequestForm, SetValue<ISearchInRadiusRequestForm>] {
  const [storedValue, setStoredValue] = useLocalStorage<ISearchInRadiusRequestForm>('TRANSPORTATION_NEAR', {
    radius: DEFAULT_SEARCH_RADIUS,
    languages: [DEFAULT_APP_LANGUAGE],
    peopleCount: 1,
    withBaggage: BaggageOption.SMALL_CAR,
    withPets: false
  })


  return [storedValue, setStoredValue]
}
