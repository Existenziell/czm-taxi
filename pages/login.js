import { useRouter } from 'next/dist/client/router'
import { signInWithPopup, onAuthStateChanged } from 'firebase/auth'
import { useEffect } from 'react'
import { auth, provider } from '../app/config/firebase'
import Logo from '../app/components/Logo'

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
            </div>
            <h1>Pleasr login to access your account</h1>
            <div className="loginBtnContainer">
                <button className="btn" onClick={() => { signInWithPopup(auth, provider) }}><h2>Sign in with Google</h2></button>
            </div>
        </div>
    )
}

export default Login
