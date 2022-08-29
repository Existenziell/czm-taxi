import Map from '../app/components/shared/Map'
import HomeBody from '../app/components/home/HomeBody'
import useApp from '../context/AppContext'
import Overlay from '../app/components/Overlay'

export default function Home() {
    const { driverFound } = useApp()
    return (
        <>
            <div className="homeContainer bg-brand">
                <div className="homeMap sharedMap">
                    <Map />
                </div>
                <HomeBody />
            </div>
            {driverFound && <Overlay />}
        </>
    )
}
