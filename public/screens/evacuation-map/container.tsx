import React, { FC } from 'react'
import { NavBar } from 'antd-mobile'
import { useNavigate } from 'react-router'

import { EvacuationMapScreenComponent } from './component'


export const EvacuationMapScreenContainer: FC = () => {
  const navigate = useNavigate()


  return (
    <>
      <NavBar onBack={ () => navigate('/') } />
      <EvacuationMapScreenComponent
      />
    </>
  )
}

export { EvacuationMapScreenContainer as EvacuationMapScreen }
