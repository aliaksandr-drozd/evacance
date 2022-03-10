import { Dispatch, SetStateAction } from 'react'

import { DEFAULT_APP_LANGUAGE } from '../../../../../common/consts'
import { ISearchInRadiusRequestForm } from '../../../../../common/interfaces'
import { useLocalStorage } from '../../../../../common/hooks'
import { BaggageOption } from '../../../../../common/enums'


type SetValue<T> = Dispatch<SetStateAction<T>>

export function useDefaultValues(): [ISearchInRadiusRequestForm, SetValue<ISearchInRadiusRequestForm>] {
  const [storedValue, setStoredValue] = useLocalStorage<ISearchInRadiusRequestForm>('T1', {
    languages: [DEFAULT_APP_LANGUAGE],
    peopleCount: 1,
    withBaggage: BaggageOption.SMALL_CAR,
    withPets: false
  })


  return [storedValue, setStoredValue]
}
