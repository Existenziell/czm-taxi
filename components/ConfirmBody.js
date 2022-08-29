import rides from '../lib/carList'
import useApp from '../context/AppContext'
import { getDirections } from '../lib/mapHelpers'
import { useState, useEffect } from 'react'
import { useRouter } from 'next/dist/client/router'

const ConfirmBody = ({ pickup, pickupCoordinates, dropoff, dropoffCoordinates }) => {
    const [directions, setDirections] = useState({})
    const [isLoading, setIsLoading] = useState(true)
    const [pickupC, setPickupC] = useState()
    const [dropoffC, setDropoffC] = useState()

    useEffect(() => {
        setCoords()
    }, [pickupCoordinates, dropoffCoordinates])

    const setCoords = async () => {
        const coordinates = `${pickupCoordinates[0]},${pickupCoordinates[1]};${dropoffCoordinates[0]},${dropoffCoordinates[1]}`
        const data = await getDirections('driving', coordinates)
        setDirections(data)
        setPickupC(`${pickupCoordinates[0]},${pickupCoordinates[1]}`)
        setDropoffC(`${dropoffCoordinates[0]},${dropoffCoordinates[1]}`)
        setIsLoading(false)
    }

    if (isLoading) return <div className="centered">Loading...</div>

    if (directions) {
        return (
            <div className="confirmBody">
                <div className="confirmHeaderContainer"><p>Please choose a ride</p></div>
                <RideSelection directions={directions} pickup={pickup} dropoff={dropoff} pickupCoordinates={pickupC} dropoffCoordinates={dropoffC} />
            </div>
        )
    } else {
        return (
            <div className="confirmBody">
                <h2 style={{ textAlign: 'center', marginTop: 50 }}>No rides found...</h2>
            </div>
        )
    }
}

const RideSelection = ({ directions, pickup, dropoff, pickupCoordinates, dropoffCoordinates }) => {
    const { broadcast } = useApp()
    const [selected, setSelected] = useState(0)
    const router = useRouter()

    const handleClick = (index) => {
        setSelected(index)
    }

    const handleConfirm = (ride) => {
        const payload = {
            user: 'Leon',
            ride: ride.service,
            distance: directions.distance,
            duration: directions.duration,
            price: (directions.distance * ride.multiplier).toFixed(2),
            pickup: pickup,
            dropoff: dropoff,
            pickupCoordinates: pickupCoordinates,
            dropoffCoordinates: dropoffCoordinates,
        }
        broadcast("czmTaxiRequest", payload)
        router.push('/confirm/booked')
    }

    return (
        <>
            <div className="confirmRideSelectionContainer">
                {
                    rides.map((ride, index) => {
                        return (
                            <div onClick={() => { handleClick(index) }} className={(selected === index) ? "confirmRideContainer selected" : "confirmRideContainer"} key={index}>
                                <div className="confirmRideProfileContainer">
                                    <img className="confirmRideImg" src={ride.imgUrl} alt={ride.service} />
                                    <div>
                                        <h3 className="confirmRideName">{ride.service}</h3>
                                        <p className="confirmRideArrivalTime">{ride.time} min away</p>
                                    </div>
                                </div>
                                <p className="confirmRidePrice">
                                    ${(directions.distance * ride.multiplier).toFixed(2)}
                                </p>
                            </div>
                        )
                    })
                }
            </div>
            <button onClick={() => handleConfirm(rides[selected])} className="confirmConfirmBtn btn">Confirm {rides[selected].service}</button>
        </>
    )
}

export default ConfirmBody
