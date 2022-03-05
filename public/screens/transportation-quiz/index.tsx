import React, { FC } from 'react'
import { useNavigate } from 'react-router'
import { Button, Card, Divider, NavBar } from 'antd-mobile'
import { useTranslation } from 'react-i18next'
import useGeolocation from 'react-hook-geolocation'
import { Container } from "typedi";
import { EvacuationStateService } from "../../services";


export const TransportationQuizScreen: FC = () => {
  const { t } = useTranslation()
  const navigate = useNavigate()
  const geolocation = useGeolocation()

  return (
    <>
      <NavBar onBack={ () => navigate('/') } />

      {
        geolocation.latitude !== null && geolocation.longitude !== null &&
        <>
          <Card>
            <Button
              color="primary"
              block
              onClick={ () => navigate('/transportation-near') }
            >
              { t('nextToMe') }
            </Button>
          </Card>
          <Divider />
        </>
      }
      {/*{
        !geolocation.error && geolocation.latitude === null &&
        <>


          <Divider />
        </>
      }*/}

      <Card>
        <Button
          block
          color="primary"
          onClick={
            () => {
              Container.get(EvacuationStateService).startSearch()
              navigate('/evacuation-map')
            }
          }
        >
          { t('onTheMap') }
        </Button>

        <Divider />

        <Button
          block
          color="primary"
          onClick={ () => navigate('/transportation') }
        >
          { t('alongTheWay') }
        </Button>
      </Card>


    </>
  )
}
