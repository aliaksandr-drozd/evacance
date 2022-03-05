import React, { FC } from 'react'
import { DotLoading, NavBar } from 'antd-mobile'
import { useNavigate } from 'react-router'
import { useObservableState } from 'observable-hooks'
import { Container } from 'typedi'

import { EvacuationMapScreenComponent } from './component'
import { EvacuationStateService } from '../../services'


export const EvacuationMapScreenContainer: FC = () => {
  const navigate = useNavigate()
  const { results, isSearchPending } = useObservableState(Container.get(EvacuationStateService).state$)


  return (
    <>
      <NavBar onBack={ () => navigate('/') } />
      <div style={{ fontSize: 124, textAlign: 'center' }}>
        <DotLoading />
      </div>

      <EvacuationMapScreenComponent
      />
    </>
  )
}

export { EvacuationMapScreenContainer as EvacuationMapScreen }
