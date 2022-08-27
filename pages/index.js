import Map from '../app/components/shared/Map'
import HomeBody from '../app/components/home/HomeBody'

export default function Home() {
    return (
        <div className="homeContainer">
            <div className="homeMap sharedMap">
                <Map />
            </div>
            <HomeBody />
        </div>
    )
}
