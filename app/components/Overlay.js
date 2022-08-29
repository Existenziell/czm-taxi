import { useEffect, useState } from "react"
import useApp from "../../context/AppContext"

const Overlay = () => {
  const { driverFound, newResponse } = useApp()
  const [open, setOpen] = useState(driverFound)

  return (
    open ?
      <div className="overlay">
        <h1>We found a driver for you!</h1>
        <p>Approx. arrival time at your location:</p>
        <h1>11min</h1>
        <button onClick={() => setOpen(false)} className='btn'>Close</button>
      </div>
      :
      ``
  )
}
export default Overlay
