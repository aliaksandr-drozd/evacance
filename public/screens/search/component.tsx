import React, { FC } from 'react'
import { Form } from 'antd-mobile'

import { Request } from '../../common/components'
import { IEvacuationResponse } from '../../common/interfaces'


export interface ISearchScreenComponentProps {
  results: IEvacuationResponse[]
}

export const SearchScreenComponent: FC<ISearchScreenComponentProps> = ({
  results,
}) => {
  return (
    <Form>
      <Form.Header>Результат поиска:</Form.Header>
      {
        results.map((request, index) => (
          <Form.Item
            label={ `#${index + 1}` }
            key={ request.id }
          >
            <Request request={ request } />
          </Form.Item>
        ))
      }
      {
        !results.length && <div>Нет результатов</div>
      }
    </Form>
  )
}
