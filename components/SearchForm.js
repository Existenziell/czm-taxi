import { useRouter } from 'next/dist/client/router'
import { useState } from 'react'

const SearchForm = () => {
    const [pickup, setPickup] = useState('')
    const [dropoff, setDropoff] = useState('')
    const router = useRouter()

    const handleClick = (eo) => {
        eo.preventDefault()

        if (pickup && dropoff)
            router.push(`/confirm?pickup=${pickup}&dropoff=${dropoff}`)
    }

    return (
        <form>
            <div className="searchFormContainer">
                <div className="searchFormImgContainer">
                    <img style={{ width: "15px" }} src="https://img.icons8.com/ios-filled/50/9CA3AF/filled-circle.png" alt="Icon1" />
                    <img style={{ height: "30px" }} src="https://img.icons8.com/ios/50/9CA3AF/vertical-line.png" alt="Icon2" />
                    <img style={{ width: "15px" }} src="https://img.icons8.com/windows/50/000000/square-full.png" alt="Icon3" />
                </div>
                <div className="searchFormInputContainer">
                    <input onChange={(eo) => { setPickup(eo.target.value) }} style={{ marginBottom: '15px' }} type="text" name="pickup" className="input" placeholder="Enter pickup location" />
                    <input onChange={(eo) => { setDropoff(eo.target.value) }} type="text" name="whereto" className="input" placeholder="Where to?" />
                </div>
                <div className="searchFormAddBtnMajorContainer">
                    <div className="searchFormAddBtnMinorContainer">
                        <img src="https://img.icons8.com/ios/50/000000/plus-math.png" alt="Icon4" />
                    </div>
                </div>
            </div>
            <div className="searchSavedPlacesContainer">
                <div className="searchSavedPlacesImgContainer">
                    <img src="https://img.icons8.com/ios-filled/50/ffffff/star--v1.png" alt="Icon5" />
                </div>
                <h3>Saved Places</h3>
            </div>
            <button type="submit" onClick={(eo) => { handleClick(eo) }} className={(pickup && dropoff) ? "btn searchConfirmBtn" : "btn searchConfirmBtn disabled"}>Confirm Locations</button>
        </form>
    )
}

export default SearchForm
