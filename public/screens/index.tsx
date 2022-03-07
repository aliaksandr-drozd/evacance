import React, { FC } from 'react'
import { BrowserRouter, Routes } from 'react-router-dom'
import { Route } from 'react-router'

import { WithGeolocation } from '../common/components'

import { EvacuateScreen } from './evacuate'
import { MainScreen } from './main'
import { SearchScreen } from './search'
import { TransportationScreen } from './transportation'
import { GDPRScreen } from './gdpr'
import { HelpScreen } from './help'
import { TransportationQuizScreen } from './transportation-quiz'
import { TransportationNearScreen } from './transportation-near'
import { SearchNearScreen } from './search-near'
import { EvacuationMapScreen } from './evacuation-map'
import { OtherVolunteerOrganizations } from './other-volunteer-organizations'

import './styles.module.less'


export const App: FC = () => {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={ <MainScreen /> } />

          <Route path="/transportation" element={ <TransportationScreen /> } />
          <Route path="/transportation/:lat1/:lng1/:lat2/:lng2/:tolerance" element={ <TransportationScreen /> } />
          <Route path="/transportation-quiz" element={ <TransportationQuizScreen /> } />
          <Route path="/transportation-near" element={ <TransportationNearScreen /> } />

          <Route path="/evacuate" element={ <WithGeolocation><EvacuateScreen /></WithGeolocation> } />
          <Route path="/evacuate/:lat1/:lng1/:lat2/:lng2" element={ <EvacuateScreen /> } />
          <Route path="/evacuation-map" element={ <EvacuationMapScreen /> } />

          <Route path="/search" element={ <SearchScreen /> } />
          <Route path="/search-near" element={ <SearchNearScreen /> } />

          <Route path="/other-volunteer-organizations" element={ <OtherVolunteerOrganizations /> } />
        </Routes>
      </BrowserRouter>

      <GDPRScreen />
      <HelpScreen />
    </>
  )
}
