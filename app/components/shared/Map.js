import { useEffect } from 'react'
import { accessToken } from '../../config/config'
import { addMarker } from '../../helpers/Helpers'
import Head from 'next/head'
import mapboxgl from 'mapbox-gl'
mapboxgl.accessToken = accessToken

const Map = ({ pickupCoordinates, dropoffCoordinates }) => {

    useEffect(() => {
        const map = new mapboxgl.Map({
            container: 'map',
            style: 'mapbox://styles/mapbox/dark-v10',
            zoom: 9,
            center: [-86.9, 20.44]
        })

        if ((pickupCoordinates && dropoffCoordinates) && (pickupCoordinates.length && dropoffCoordinates.length)) {
            map.setCenter(pickupCoordinates)
            addMarker(map, pickupCoordinates)
            addMarker(map, dropoffCoordinates)
            map.on('load', () => { map.fitBounds([pickupCoordinates, dropoffCoordinates], { padding: 125 }) })
        }
    }, [pickupCoordinates, dropoffCoordinates])

    return (
        <>
            <Head>
                <title>CZMTaxi</title>
                <meta name='description' content='CZMTaxi | Taxi for Cozumel' />
                <link href='https://api.mapbox.com/mapbox-gl-js/v1.12.0/mapbox-gl.css' rel='stylesheet' />
            </Head>
            <div id="map" style={{ flex: 1, height: '50vh' }} />
        </>
    )
}

export default Map
