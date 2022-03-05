import React, { FC, useState } from 'react'
import { Container } from 'typedi'
import { useObservableState } from 'observable-hooks'
import { Toast } from 'antd-mobile'
import { useTranslation } from 'react-i18next'

import { ApiService, MyRequestsStateService } from '../../../../services'
import { MyRequestsComponent } from './component'


export const MyRequestsContainer: FC = () => {
  const { t } = useTranslation()
  const { requests } = useObservableState(Container.get(MyRequestsStateService).state$)
  const [isRequestPending, setRequestPending] = useState(false)

  return (
    <>
      {
        !!requests.length && <MyRequestsComponent
          isRequestPending={ isRequestPending }
          requests={ requests }
          onComplete={
            async (id: string) => {
              setRequestPending(true)

              const result = await Container.get(ApiService).completeRequest(id)

              if (!result) {
                Toast.show({ content: t('somethingWentWrong') })
              } else {
                Container.get(MyRequestsStateService).delete(id)
              }

              await Container.get(MyRequestsStateService).get()
              setRequestPending(false)
            }
          }
          onDelete={
            async (id) => {
              setRequestPending(true)

              const result = await Container.get(ApiService).deleteRequest(id)

              if (!result) {
                Toast.show({ content: t('somethingWentWrong') })
              } else {
                Container.get(MyRequestsStateService).delete(id)
              }

              await Container.get(MyRequestsStateService).get()
              setRequestPending(false)
            }
          }
        />
      }
    </>
  )
}

export { MyRequestsContainer as MyRequests }
