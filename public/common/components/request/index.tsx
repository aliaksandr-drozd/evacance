import React, { FC } from 'react'

import { IEvacuationResponse } from '../../interfaces'
import { MapPoint } from '../map-point'


export interface IRequestProps {
  request: IEvacuationResponse
}

export const Request: FC<IRequestProps> = ({ request }) => {
  return (
    <div key={ request.id }>
      <MapPoint center={ request.waypoints[1] } />
      <strong>Человек:</strong> { request.peopleCount }<br />
      <strong>Языки:</strong> { request.languages.join(',') }<br />
      <strong>Много багажа:</strong> { request.withBaggage ? 'Да' : 'Нет' }<br />
      <strong>С животными:</strong> { request.withPets ? 'Да' : 'Нет' }<br />
      <strong>Контакты:</strong> { request.contactData }<br />
    </div>
  )
}
