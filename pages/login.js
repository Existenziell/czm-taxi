import { useRouter } from 'next/dist/client/router'
import { signInWithPopup, onAuthStateChanged } from 'firebase/auth'
import { useEffect } from 'react'
import { auth, provider } from '../config/firebase'
import Logo from '../components/Logo'

const Login = () => {
    const router = useRouter()

    useEffect(() => {
        onAuthStateChanged(auth, user => {
            if (user) {
                router.push('/')
            }
        })
    }, [router])

    return (
        <div className="loginContainer">
            <div className="loginLogoContainer">
                <Logo />
                <p className='mt-6'>Please login to continue</p>
                <button className="btn mt-1" onClick={() => { signInWithPopup(auth, provider) }}>Sign in with Google</button>
            </div>

        </div>
    )
}

export default Login
