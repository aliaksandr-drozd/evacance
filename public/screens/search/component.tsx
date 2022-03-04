import React, { FC } from 'react'
import { Card, FloatingPanel, Form, Space } from 'antd-mobile'
import { useTranslation } from 'react-i18next'

import { Request } from '../../common/components'
import { IEvacuationResponse } from '../../common/interfaces'


export interface ISearchScreenComponentProps {
  results: IEvacuationResponse[]
  isSearchPending: boolean
}

export const SearchScreenComponent: FC<ISearchScreenComponentProps> = ({
  results,
  isSearchPending,
}) => {
  const { t } = useTranslation()

  return (
    <>
      {
        isSearchPending &&
        <FloatingPanel
          anchors={ [100, 100] }
          handleDraggingOfContent={ false }
          style={ { background: '#FAA0A0' } }
        >
          <Card>
            <h2 style={ { margin: 0 } }>{ t('searchInProgress') }</h2>
          </Card>
        </FloatingPanel>
      }
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
    </>
  )
}
