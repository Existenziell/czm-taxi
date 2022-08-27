import Lottie from 'react-lottie'
import Link from 'next/link'
import useAuthentication from '../../app/auth/auth'

const Booked = () => {
    useAuthentication()

    return (
        <div className="bookedContainer">
            <Lottie options={{ animationData: require('../../app/assets/lottie/done.json'), loop: false }} />
            <h1>Request Received</h1>
            <p>We&apos;ll notify you as soon as we find a driver</p>
            <p>Have a safe journey</p>
            <div className="bookedHomeBtnContainer">
                <Link href="/" passHref>
                    <button className="btn bookedHomeBtn"><h1>Home</h1></button>
                </Link>
            </div>
        </div>
    )
}

export default Booked
