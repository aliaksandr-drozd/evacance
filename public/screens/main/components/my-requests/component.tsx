import React, { FC } from 'react'
import { Button, Dialog, Form } from 'antd-mobile'

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
  return (
    <Form className={ styles.title }>
      <Form.Header>Мои заявки</Form.Header>
      {
        requests.map((request) =>
          <div key={ request.id }>
            <Request request={ request } />
            <br />
            <br />
            <Button
              onClick={
                () => Dialog.confirm({
                content: 'Удалить заявку?',
                cancelText: 'Нет',
                confirmText: 'Да',
                onConfirm: () => onDelete(request.id)
              }) }
            >
              Удалить
            </Button>
          </div>
        )
      }
    </Form>
  )
}
