import Lottie from 'react-lottie'
import Link from 'next/link'
import rides from '../../assets/files/carList'
import { getDirections } from '../../helpers/Helpers'
import { useState, useEffect } from 'react'
import { useChannel } from '../../../components/RealtimeEffect'
import RealtimeComponent from '../../../components/RealtimeComponent'
import { useRouter } from 'next/dist/client/router'

const ConfirmBody = ({ pickupCoordinates, dropoffCoordinates }) => {
    const [directions, setDirections] = useState({})
    const [isLoading, setIsLoading] = useState(true)
    const [pickup, setPickup] = useState()
    const [dropoff, setDropoff] = useState()

    useEffect(async () => {
        const coordinates = `${pickupCoordinates[0]},${pickupCoordinates[1]};${dropoffCoordinates[0]},${dropoffCoordinates[1]}`
        const data = await getDirections('driving', coordinates)
        setDirections(data)
        setPickup(`${pickupCoordinates[0]},${pickupCoordinates[1]}`)
        setDropoff(`${dropoffCoordinates[0]},${dropoffCoordinates[1]}`)
        setIsLoading(false)
    }, [pickupCoordinates, dropoffCoordinates])

    if (isLoading) {
        return (
            <div className="confirmBody">
                <Lottie options={{ animationData: require('../../assets/lottie/loading.json') }} />
            </div>
        )
    }

    if (directions) {
        return (
            <div className="confirmBody">
                <Header />
                <RideSelection directions={directions} pickup={pickup} dropoff={dropoff} />
            </div>
        )
    }
    else {
        return (
            <div className="confirmBody">
                <h2 style={{ textAlign: 'center', marginTop: 50 }}>No rides found...</h2>
                <h2 style={{ textAlign: 'center', marginTop: 5 }}>Prefer riding this instead?</h2>
                <Lottie width='100%' height='50%' options={{ animationData: require('../../assets/lottie/dragon.json') }} />
            </div>
        )
    }
}

const Header = () => {
    return (
        <div className="confirmHeaderContainer">
            <p>Please chose a ride</p>
        </div>
    )
}

const RideSelection = ({ directions, pickup, dropoff }) => {
    const [selected, setSelected] = useState(0)
    const [receivedMessages, setMessages] = useState([])
    const router = useRouter()

    const handleClick = (index) => {
        setSelected(index)
    }

    const [channel, ably] = useChannel("czmTaxi", (message) => {
        const history = receivedMessages.slice(-199)
        setMessages([...history, message])
    })

    const broadcast = async () => {
        const msg = `Request from ${`Leon`} | Selected: ${rides[selected].service} | Price: $${(directions.distance * rides[selected].multiplier).toFixed(2)} | Pickup: ${pickup} | Dropoff: ${dropoff}`
        // console.log(msg, rides[selected])
        channel.publish({ name: "czmTaxiRequest", data: msg })
        router.push('/confirm/booked')
    }

    return (
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
                            <p className="confirmRidePrice">{`$${(directions.distance * ride.multiplier).toFixed(2)}`}</p>
                        </div>
                    )
                })
            }
            <button onClick={broadcast} className="confirmConfirmBtn btn">Confirm {rides[selected].service}</button>
        </div>
    )
}

export default ConfirmBody
