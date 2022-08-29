import Link from 'next/link'
import useApp from '../context/AppContext'
import Map from '../components/Map'
import Overlay from '../components/Overlay'
import actionBtns from '../lib/actionBtns'
import { onAuthStateChanged, signOut } from 'firebase/auth'
import { auth } from '../config/firebase'
import { useState, useEffect } from 'react'
import Logo from '../components/Logo'

const defaultUser = {
    name: 'Anonymous',
    profilePic: 'https://www.pngitem.com/pimgs/m/150-1503945_transparent-user-png-default-user-image-png-png.png'
}

const HomeBody = () => {
    const [user, setUser] = useState(defaultUser)

    useEffect(() => {
        return onAuthStateChanged(auth, (user) => {
            if (user) {
                setUser({
                    name: user.displayName,
                    // profilePic: user.photoURL,
                    profilePic: 'https://www.pngitem.com/pimgs/m/150-1503945_transparent-user-png-default-user-image-png-png.png'
                })
            }
            else {
                setUser(defaultUser)
            }
        })
    }, [])

    return (
        <div className="homeBody">
            <Header user={user} />
            <ActionButtons />
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
                        <Link href={btn.href} key={index} passHref>
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

export default function Home() {
    const { driverFound } = useApp()
    return (
        <>
            <div className="homeContainer bg-logo">
                <div className="homeMap sharedMap">
                    <Map />
                </div>
                <HomeBody />
            </div>
            {driverFound && <Overlay />}
        </>
    )
}
