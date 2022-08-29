import { useEffect } from 'react'
import { useRouter } from 'next/dist/client/router'
import useAuthentication from '../../lib/auth'

const Booked = () => {
    const router = useRouter()
    useAuthentication()
    useEffect(() => {
        setTimeout(() => {
            router.push('/')
        }, 3000)
    }, [router])

    return (
        <div className="bookedContainer">
            <svg style={{ width: 100, margin: '60 auto 0' }} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <h1>Request Received</h1>
            <p>We&apos;ll notify you as soon as we find a driver<br />Have a safe journey</p>
        </div>
    )
}

export default Booked
