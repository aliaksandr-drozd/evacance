import React, { FC } from 'react'
import { useNavigate } from 'react-router'
import { NavBar } from 'antd-mobile'
import { useTranslation } from 'react-i18next'
import useGeolocation from 'react-hook-geolocation'


export const TransportationQuizScreen: FC = () => {
  const { t } = useTranslation()
  const navigate = useNavigate()
  const geolocation = useGeolocation()

  debugger


  return (
    <>
      <NavBar onBack={ () => navigate('/') } />

      {
        geolocation.latitude !== null && geolocation.latitude && <>
          Покажите всех, кого нужно отвезти, в радиусе 10 км:

        </>
      }




    </>
  )
}
