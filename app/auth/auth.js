import { useRouter } from 'next/dist/client/router'
import { useEffect } from 'react'
import { onAuthStateChanged } from 'firebase/auth'

import { auth } from '../config/firebase'
import useApp from '../../context/AppContext'

const useAuthentication = () => {
    const { setUser } = useApp()
    const router = useRouter()

    useEffect(() => {
        return onAuthStateChanged(auth, (user) => {
            setUser(user)
            if (!user)
                router.push('/login')
        })
    }, [])
}

export default useAuthentication
