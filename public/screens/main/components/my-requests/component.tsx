import React, { FC, useState } from 'react'
import { Button, Card, Dialog, Form, Popup } from 'antd-mobile'
import { useTranslation } from 'react-i18next'

import { IEvacuationResponse } from '../../../../common/interfaces'
import { Request } from '../../../../common/components'
import styles from './styles.module.less'
import { Container } from "typedi";
import { ApiService, MyRequestsStateService } from "../../../../services";


export interface IMyRequestsComponentProps {
  isRequestPending: boolean
  requests: IEvacuationResponse[]
  onDelete: (id: string) => void
  onComplete: (id: string) => void
}

export const MyRequestsComponent: FC<IMyRequestsComponentProps> = ({
  isRequestPending,
  requests,
  onDelete,
  onComplete,
}) => {
  const { t } = useTranslation()
  const [isPopupVisible, setIsPopupVisible] = useState(false)
  const [id, setId] = useState('')

  return (
    <Form className={ styles.title }>
      <Form.Header>{ t('myRequests') }</Form.Header>
      {
        requests.map((request) =>
          <div key={ request.id }>
            <Request request={ request }>
              <div style={ { display: 'flex', gap: '10px' } }>
                <Button
                  color="primary"
                  loading={ isRequestPending }
                  onClick={
                    () => {
                      setId(request.id)
                      setIsPopupVisible(true)
                    }
                  }
                >
                  { t('requestExtend') }
                </Button>
                <Button
                  color="primary"
                  loading={ isRequestPending }
                  onClick={
                    () => Dialog.confirm({
                      content: t('areYouSure'),
                      cancelText: t('no'),
                      confirmText: t('yes'),
                      onConfirm: () => onComplete(request.id)
                    }) }
                >
                  { t('transportFound') }
                </Button>
                <Button
                  color="warning"
                  loading={ isRequestPending }
                  onClick={
                    () => Dialog.confirm({
                      content: t('deleteConfirm'),
                      cancelText: t('no'),
                      confirmText: t('yes'),
                      onConfirm: () => onDelete(request.id)
                    }) }
                >
                  { t('delete') }
                </Button>
              </div>
            </Request>

            <Popup
              visible={ isPopupVisible }
              onMaskClick={ () => setIsPopupVisible(false) }
              bodyStyle={{
                borderTopLeftRadius: '8px',
                borderTopRightRadius: '8px',
                minHeight: '40vh',
              }}
            >
              <Card extra={ t('requestExtend') }>
                <Button
                  block
                  color="primary"
                  loading={ isRequestPending }
                  onClick={
                    async () => {
                      await Container.get(ApiService).extendRequest(id, 10800)
                      await Container.get(MyRequestsStateService).get()

                      setIsPopupVisible(false)
                    }
                  }
                >
                  { t('3h') }
                </Button>
                <br/>
                <Button
                  block
                  color="primary"
                  loading={ isRequestPending }
                  onClick={
                    async () => {
                      await Container.get(ApiService).extendRequest(id, 86400)
                      await Container.get(MyRequestsStateService).get()

                      setIsPopupVisible(false)
                    }
                  }
                >
                  { t('24h') }
                </Button>
                <br/>
                <Button
                  block
                  color="warning"
                  loading={ isRequestPending }
                  onClick={
                    () => setIsPopupVisible(false)
                  }
                >
                  { t('cancel') }
                </Button>
              </Card>
            </Popup>

          </div>
        )
      }
    </Form>
  )
}
