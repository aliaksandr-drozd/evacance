import React, { FC, useEffect } from 'react'
import { DotLoading, NavBar } from 'antd-mobile'
import { useNavigate } from 'react-router'
import { useObservableState } from 'observable-hooks'
import { Container } from 'typedi'
import { LatLngTuple } from 'leaflet'

import { DEFAULT_MAP_CENTER } from '../../common/consts'
import { EvacuationStateService, WaitingPassengerState } from '../../services'
import { EvacuationMapScreenComponent } from './component'
import styles from './styles.module.less'


export interface IEvacuationMapScreenContainerProps {
  position?: LatLngTuple
}

export const EvacuationMapScreenContainer: FC<IEvacuationMapScreenContainerProps> = ({ position }) => {
  const center = position ? position : DEFAULT_MAP_CENTER
  const navigate = useNavigate()
  const { results, isSearchPending } = useObservableState(Container.get(EvacuationStateService).state$)
  const { data, isLoading } = useObservableState(Container.get(WaitingPassengerState).state$)

  useEffect(() => {
    Container.get(EvacuationStateService).startSearch()
  }, [])

  return (
    <>
      <NavBar onBack={ () => navigate('/transportation-quiz') } />

      <EvacuationMapScreenComponent
        center={ center }
        waitingPassengers={ results }
        passengerData={ data }
        isPassengerDataLoading={ isLoading }
        onPassengerDataClose={ () => Container.get(WaitingPassengerState).close() }
        onPassengerDataOpen={ (id) => Container.get(WaitingPassengerState).open(id) }
      />

      {
        isSearchPending &&
        <div className={ styles.loader }>
          <DotLoading color="primary" />
        </div>
      }
    </>
  )
}

export { EvacuationMapScreenContainer as EvacuationMapScreen }
