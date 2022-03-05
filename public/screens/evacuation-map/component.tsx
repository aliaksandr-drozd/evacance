import React, { FC } from 'react'
import { useObservableState } from 'observable-hooks'
import { Container } from 'typedi'

import { EvacuationStateService } from '../../services'


export interface IEvacuationMapScreenComponentProps {
}

export const EvacuationMapScreenComponent: FC<IEvacuationMapScreenComponentProps> = ({
}) => {
  const { results, isSearchPending } = useObservableState(Container.get(EvacuationStateService).state$)

  return (
    <>
      Evacuation Map
    </>
  )
}
