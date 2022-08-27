import Link from 'next/link'
import useAuthentication from '../../app/auth/auth'

const Booked = () => {
    useAuthentication()

    return (
        <div className="bookedContainer">
            <svg style={{ width: 100, margin: '0 auto', marginTop: 40 }} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>

            <h1>Request Received</h1>
            <p>We&apos;ll notify you as soon as we find a driver<br />Have a safe journey</p>

            <div className="bookedHomeBtnContainer">
                <Link href="/" passHref>
                    <button className="btn bookedHomeBtn">Home</button>
                </Link>
            </div>
        </div>
    )
}

export default Booked
