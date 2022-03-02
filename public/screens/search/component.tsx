import React, { FC } from 'react'
import { Form } from 'antd-mobile'
import { useTranslation } from 'react-i18next'

import { Request } from '../../common/components'
import { IEvacuationResponse } from '../../common/interfaces'


export interface ISearchScreenComponentProps {
  results: IEvacuationResponse[]
}

export const SearchScreenComponent: FC<ISearchScreenComponentProps> = ({
  results,
}) => {
  const { t } = useTranslation()

  return (
    <Form>
      <Form.Header>{ t('searchResults') }</Form.Header>
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
        !results.length && <div>{ t('noSearchResults') }</div>
      }
    </Form>
  )
}
