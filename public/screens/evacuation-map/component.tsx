import React, { FC } from 'react'
import { useTranslation } from 'react-i18next'
import { useObservableState } from 'observable-hooks'
import { Container } from "typedi";
import { EvacuationStateService, SearchStateService } from "../../services";


export interface IEvacuationMapScreenComponentProps {
}

export const EvacuationMapScreenComponent: FC<IEvacuationMapScreenComponentProps> = ({
}) => {
  /*const { condition, results, isSearchPending } = useObservableState(Container.get(EvacuationStateService).state$)*/

  return (
    <>
      Evacuation Map
    </>
  )
}
