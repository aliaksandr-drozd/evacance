import React, { FC } from 'react'

import { IWaitingPassengersResponse } from '../../common/interfaces'
import { Map } from '../../common/components'
import { DEFAULT_MAP_CENTER } from '../../common/consts'


export interface IEvacuationMapScreenComponentProps {
  waitingPassengers: IWaitingPassengersResponse[]
}

export const EvacuationMapScreenComponent: FC<IEvacuationMapScreenComponentProps> = ({
  waitingPassengers,
}) => {

  return (
    <Map
      center={ DEFAULT_MAP_CENTER }
      whenCreated={ () => {} }
    />
  )
}
