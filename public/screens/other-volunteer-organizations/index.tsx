import React, { FC } from 'react'
import { Card, Divider, NavBar } from 'antd-mobile'
import { useNavigate } from 'react-router'

import { ICanHelpIcon } from '../../common/components'


export const OtherVolunteerOrganizations: FC = () => {
  const navigate = useNavigate()

  return (
    <>
      <NavBar onBack={ () => navigate('/') } />

      <Card>
        <a
          href="https://icanhelp.host/"
          target="_blank"
          style={ { marginLeft: '10px' } }
        >
          <ICanHelpIcon size={ 150 } />
        </a>

        <Divider />
      </Card>
    </>
  )
}
