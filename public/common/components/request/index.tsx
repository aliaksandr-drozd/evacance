import React, { FC } from 'react'
import { Badge, Card, Divider, Space } from 'antd-mobile'
import { useTranslation } from 'react-i18next'

import { IEvacuationResponse } from '../../interfaces'
import { MapPoint } from '../map-point'
import { BaggageMatch } from "../baggage-match";
import { LanguageMatch } from "../languages-match";


export interface IRequestProps {
  request: IEvacuationResponse
}

export const Request: FC<IRequestProps> = ({
  request,
  children,
}) => {
  const { t } = useTranslation()

  return (
    <div key={ request.id }>
      <Card>
        <Space direction="vertical">
          <table>
            <tbody>
            <tr>
              <td>
                <Badge content={ t('from') } />
              </td>
              <td>
                <Badge content={ t('to') } />
              </td>
            </tr>
            <tr>
              <td>
                <MapPoint center={ request.waypoints[0] } />
              </td>
              <td>
                <MapPoint center={ request.waypoints[1] } />
              </td>
            </tr>
            <tr>
              <td colSpan={ 2 }>
                <strong>{ t('peopleCount') }</strong> { request.peopleCount }<br />
                <strong>{ t('languages') }</strong> <Space>{ request.languages.map((l) => <LanguageMatch key={ l } languageCode={ l } />) }</Space><br />
                <strong>{ t('withPets') }</strong> { request.withPets ? t('yes') : t('no') }<br />
                <strong><BaggageMatch option={ request.withBaggage } /></strong><br />
                <strong>{ t('description') }</strong> { request.contactData }<br />
              </td>
            </tr>
            </tbody>
          </table>

          { children }
        </Space>
      </Card>
      <Divider />
    </div>
  )
}
