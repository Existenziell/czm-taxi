import 'tailwindcss/tailwind.css'
import '../styles/globals.css'
import 'mapbox-gl/dist/mapbox-gl.css'
import Head from 'next/head'
import { AppProvider } from '../context/AppContext'

function CZMTaxi({ Component, pageProps }) {
    return (
        <AppProvider>
            <Head>
                <title>CZMTaxi</title>
                <meta name='description' content='CZMTaxi | Taxi for Cozumel' />
                <link rel='preconnect' href='https://fonts.googleapis.com' />
                <link rel='preconnect' href='https://fonts.gstatic.com' crossOrigin="true" />
                <link rel='stylesheet' href='https://fonts.googleapis.com/css2?family=Nunito&display=swap' />
            </Head>
            <Component {...pageProps} />
        </AppProvider>
    )
}

export default CZMTaxi
