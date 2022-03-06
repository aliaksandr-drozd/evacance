import React, { FC } from 'react'
import { DotLoading, NavBar } from 'antd-mobile'
import { useNavigate } from 'react-router'
import { useObservableState } from 'observable-hooks'
import { Container } from 'typedi'

import { EvacuationMapScreenComponent } from './component'
import { EvacuationStateService, WaitingPassengerState } from '../../services'
import styles from './styles.module.less'


export const EvacuationMapScreenContainer: FC = () => {
  const navigate = useNavigate()
  const { results, isSearchPending } = useObservableState(Container.get(EvacuationStateService).state$)
  const { data, isLoading } = useObservableState(Container.get(WaitingPassengerState).state$)


  return (
    <>
      <NavBar onBack={ () => navigate('/transportation-quiz') } />

      <EvacuationMapScreenComponent
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
