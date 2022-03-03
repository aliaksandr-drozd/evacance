import React, { FC } from 'react'
import { Container } from 'typedi'
import { useObservableState } from 'observable-hooks'

import { MyRequestsStateService } from '../../../../services'
import { MyRequestsComponent } from './component'


export const MyRequestsContainer: FC = () => {
  const { requests } = useObservableState(Container.get(MyRequestsStateService).state$)

  return (
    <>
      {
        !!requests.length && <MyRequestsComponent
          requests={ requests }
          onDelete={
            (id) => {
              Container.get(MyRequestsStateService).delete(id)
              /*Container.get(GunService).delete(id)*/
            }
          }
        />
      }
    </>
  )
}

export { MyRequestsContainer as MyRequests }
