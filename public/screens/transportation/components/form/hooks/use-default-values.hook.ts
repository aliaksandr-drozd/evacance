import { Dispatch, SetStateAction } from 'react'

import { DEFAULT_APP_LANGUAGE } from '../../../../../common/consts'
import { ITransportationRequestForm } from '../../../../../common/interfaces'
import { useLocalStorage } from '../../../../../common/hooks'
import { BaggageOption } from '../../../../../common/enums'


type SetValue<T> = Dispatch<SetStateAction<T>>

export function useDefaultValues(): [ITransportationRequestForm, SetValue<ITransportationRequestForm>] {
  const [storedValue, setStoredValue] = useLocalStorage<ITransportationRequestForm>('T2', {
    languages: [DEFAULT_APP_LANGUAGE],
    peopleCount: 1,
    withBaggage: BaggageOption.SMALL_CAR,
    withPets: false
  })


  return [storedValue, setStoredValue]
}
