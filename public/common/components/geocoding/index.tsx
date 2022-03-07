import React, { useEffect } from 'react'
import { Control, LatLngLiteral, LatLngTuple } from 'leaflet'
import { useMap } from 'react-leaflet'


export const LeafletControlGeocoder = ({ onFound }: { onFound?: (location: LatLngTuple) => void }) => {
  const map = useMap()

  useEffect(() => {
    // @ts-ignore
    let geocoder = Control.Geocoder.nominatim()

    if (typeof URLSearchParams !== 'undefined' && location.search) {
      const params = new URLSearchParams(location.search)
      const geocoderString = params.get('geocoder')
      // @ts-ignore
      if (geocoderString && Control.Geocoder[geocoderString]) {
        // @ts-ignore
        geocoder = Control.Geocoder[geocoderString]()
      } else if (geocoderString) {
        console.warn('Unsupported geocoder', geocoderString)
      }
    }

    // @ts-ignore
    Control.geocoder({
      query: '',
      placeholder: 'Search here...',
      suggestTimeout: 500,
      queryMinLength: 3,
      defaultMarkGeocode: true,
      geocoder
    })
      .on('markgeocode', function (e: any) {
        const latlng: LatLngLiteral = e.geocode.center

        onFound && onFound([latlng.lat, latlng.lng])
      })
      .addTo(map)
  }, [])

  return null
}
