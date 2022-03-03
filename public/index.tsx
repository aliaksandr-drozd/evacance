import 'reflect-metadata'
import 'abortcontroller-polyfill/dist/abortcontroller-polyfill-only'
import React from 'react'
import { render } from 'react-dom'
import 'leaflet-arrowheads'

// FIX LEAFLET MARKERS
import L from 'leaflet'
// @ts-ignore
import markerIcon2x from 'leaflet/dist/images/marker-icon-2x.png'
// @ts-ignore
import markerIcon from 'leaflet/dist/images/marker-icon.png'
// @ts-ignore
import markerShadow from 'leaflet/dist/images/marker-shadow.png'
// @ts-ignore
delete L.Icon.Default.prototype._getIconUrl
L.Icon.Default.mergeOptions({
  iconUrl: markerIcon,
  iconRetinaUrl: markerIcon2x,
  shadowUrl: markerShadow,
})
// END FIX LEAFLET MARKERS

import 'leaflet/dist/leaflet.css'

import './boot'

import { App } from './screens'


render(
  <App />,
  document.getElementById('root')
)
