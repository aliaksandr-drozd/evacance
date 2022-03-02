import React, { FC } from 'react'
import { Button, Dialog, Form } from 'antd-mobile'
import { useTranslation } from 'react-i18next'

import { IEvacuationResponse } from '../../../../common/interfaces'
import { Request } from '../../../../common/components'
import styles from './styles.module.less'


export interface IMyRequestsComponentProps {
  requests: IEvacuationResponse[]
  onDelete: (id: string) => void
}

export const MyRequestsComponent: FC<IMyRequestsComponentProps> = ({
  requests,
  onDelete,
}) => {
  const { t } = useTranslation()

  return (
    <Form className={ styles.title }>
      <Form.Header>{ t('myRequests') }</Form.Header>
      {
        requests.map((request) =>
          <div key={ request.id }>
            <Request request={ request } />
            <br />
            <Button
              color="warning"
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
        )
      }
    </Form>
  )
}
