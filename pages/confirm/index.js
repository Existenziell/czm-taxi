import Link from 'next/link'
import Map from '../../app/components/shared/Map'
import ConfirmBody from '../../app/components/confirm/ConfirmBody'
import useAuthentication from '../../app/auth/auth'
import { useRouter } from 'next/dist/client/router'
import { getCoordinates } from '../../app/helpers/Helpers'
import { useEffect, useState } from 'react'

const Confirm = () => {
    useAuthentication()

    const [pickupCoordinates, setPickupCoordinates] = useState([])
    const [dropoffCoordinates, setDropoffCoordinates] = useState([])
    const [isloading, setIsLoading] = useState(true)
    const router = useRouter()

    useEffect(() => {
        const locations = router.query
        setLocation(locations)
    }, [router.query])

    const setLocation = async (locations) => {
        const pickup = await getCoordinates(locations.pickup)
        const dropOff = await getCoordinates(locations.dropoff)
        setPickupCoordinates(pickup)
        setDropoffCoordinates(dropOff)
        setIsLoading(false)
    }

    if (isloading) {
        return (
            <div className="centered">Loading...</div>
        )
    }

    return (
        <div className="confirmContainer">
            <Link href="/search" passHref>
                <div className="confirmBackBtnContainer">
                    <button className="btn confirmBackBtn">
                        <img src="https://img.icons8.com/ios-filled/50/000000/left.png" alt="back" />
                    </button>
                </div>
            </Link>
            <div className="confirmMap sharedMap">
                <Map pickupCoordinates={pickupCoordinates} dropoffCoordinates={dropoffCoordinates} />
            </div>
            <ConfirmBody pickupCoordinates={pickupCoordinates} dropoffCoordinates={dropoffCoordinates} />
        </div>
    )
}

export default Confirm
