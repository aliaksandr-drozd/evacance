import React, { FC } from 'react'
import { Button, Dialog, Form, Space } from 'antd-mobile'
import { useTranslation } from 'react-i18next'

import { IEvacuationResponse } from '../../../../common/interfaces'
import { Request } from '../../../../common/components'
import styles from './styles.module.less'


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

  return (
    <Form className={ styles.title }>
      <Form.Header>{ t('myRequests') }</Form.Header>
      {
        requests.map((request) =>
          <div key={ request.id }>
            <Request request={ request }>
              <Space block>
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
              </Space>
            </Request>
          </div>
        )
      }
    </Form>
  )
}
