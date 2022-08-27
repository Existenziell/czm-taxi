import 'tailwindcss/tailwind.css'
import '../styles/globals.css'
import Head from 'next/head'
import 'mapbox-gl/dist/mapbox-gl.css'

function CZMTaxi({ Component, pageProps }) {
    return (
        <>
            <Head>
                <link rel='preconnect' href='https://fonts.googleapis.com' />
                <link rel='preconnect' href='https://fonts.gstatic.com' crossOrigin="true" />
                <link rel='stylesheet' href='https://fonts.googleapis.com/css2?family=Nunito&display=swap' />
            </Head>
            <Component {...pageProps} />
        </>
    )
}

export default CZMTaxi
