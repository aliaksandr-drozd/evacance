import React, { FC, useState } from 'react'
import { useNavigate } from 'react-router'
import { Button, Card, Divider, NavBar, Slider } from 'antd-mobile'
import { useTranslation } from 'react-i18next'
import useGeolocation from 'react-hook-geolocation'


export const TransportationQuizScreen: FC = () => {
  const [radius, setRadius] = useState(50)
  const { t } = useTranslation()
  const navigate = useNavigate()
  const geolocation = useGeolocation()

  return (
    <>
      <NavBar onBack={ () => navigate('/') } />

      {
        geolocation.latitude !== null && geolocation.latitude &&
        <>
          <Card>
            <h3>Покажите всех, кого нужно отвезти, в радиусе { radius } км от меня:</h3>
            <Slider
              min={ 20 }
              max={ 500 }
              defaultValue={ radius }
              onAfterChange={ (v) => setRadius(v as number) }
            />
            <br />
            <br />
            <Button
              color="primary"
              block
            >
              Показать тех, кто рядом
            </Button>
          </Card>
          <Divider />
        </>
      }

      <Card>
        <Button
          block
          color="primary"
        >
          Покажите где нужна помощь на карте
        </Button>

        <Divider />

        <Button
          block
          color="primary"
          onClick={ () => navigate('/transportation') }
        >
          Я готов помочь тем, кому по пути со мной
        </Button>
      </Card>


    </>
  )
}
