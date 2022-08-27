import Link from 'next/link'
import actionBtns from '../../assets/files/actionBtns'
import { onAuthStateChanged, signOut } from 'firebase/auth'
import { auth } from '../../config/firebase'
import { useState, useEffect } from 'react'
import { useRouter } from 'next/dist/client/router'
import Logo from '../Logo'

const defaultUser = {
    name: 'Anonymous',
    profilePic: 'https://www.pngitem.com/pimgs/m/150-1503945_transparent-user-png-default-user-image-png-png.png'
}

const HomeBody = () => {
    const [user, setUser] = useState(defaultUser)
    const router = useRouter()

    useEffect(() => {
        return onAuthStateChanged(auth, (user) => {
            if (user) {
                setUser({
                    name: user.displayName,
                    // profilePic: user.photoURL,
                    profilePic: 'https://www.pngitem.com/pimgs/m/150-1503945_transparent-user-png-default-user-image-png-png.png'
                    // profilePic: user.photoURL ? user.photoURL : 'https://www.pngitem.com/pimgs/m/150-1503945_transparent-user-png-default-user-image-png-png.png'
                })
            }
            else {
                setUser(defaultUser)
                // router.push('/login')
            }
        })
    }, [])

    return (
        <div className="homeBody">
            <Header user={user} />
            <ActionButtons />
            {/* <button className="btn homeWhereToBtn" onClick={() => { Link }}>Where to?</button> */}
        </div>
    )
}

const Header = ({ user }) => {
    return (
        <div className="homeHeader">
            <Logo />
            <div className="homeProfileContainer">
                <p className="homeProfileName">{user.name}</p>
                <div className="homeProfilePicContainer" onClick={() => { signOut(auth) }}>
                    <img className="homeProfilePic" src={user.profilePic} alt='profile pic' />
                </div>
            </div>
        </div>
    )
}

const ActionButtons = () => {
    return (
        <div className="homeActionBtnsContainer">
            {
                actionBtns.map((btn, index) => {
                    return (
                        <Link href={btn.href} key={index}>
                            <button className='btn homeSingleActionBtnContainer'>
                                <img className="homeActionBtnImg" src={btn.img} alt={btn.title} />
                                <h4 className="homeActionBtnTitle">{btn.title}</h4>
                            </button>
                        </Link>
                    )
                })
            }
        </div>
    )
}

export default HomeBody
