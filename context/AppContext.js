import { createContext, useState, useContext, useEffect } from 'react'
import { useChannel } from "../components/RealtimeEffect"

const AppContext = createContext()
const useApp = () => useContext(AppContext)

export const AppProvider = ({ children }) => {
  const [notificationMsg, setNotificationMsg] = useState('')
  const [newResponse, setNewResponse] = useState('')
  const [receivedResponses, setResponses] = useState([])
  const [ctxMap, setCtxMap] = useState()
  const [driverFound, setDriverFound] = useState(false)
  const [user, setUser] = useState()

  // Listen on ably channel for new taxi request responses
  const [channel, ably] = useChannel("czmTaxi", (message) => {
    if (message.name === 'czmTaxiResponse') {
      // console.log("new Response:", message, user)
      setDriverFound(true)
      const history = receivedResponses.slice(-199)
      setResponses([...history, message])
    }
  })

  const broadcast = (name, data) => {
    channel.publish({ name, data })
  }

  const notify = (msg) => {
    const notification = document.querySelector('.notification')
    notification.classList.remove('-translate-y-20')
    setNotificationMsg(msg)
    setTimeout(() => {
      notification.classList.add('-translate-y-20')
    }, 2500)
  }

  const contextValue = {
    receivedResponses,
    setResponses,
    newResponse,
    setNewResponse,
    broadcast,
    ctxMap,
    setCtxMap,
    notificationMsg,
    setNotificationMsg,
    notify,
    driverFound,
    setDriverFound,
    user,
    setUser,
  }

  return (
    <AppContext.Provider value={contextValue}>
      {children}
    </AppContext.Provider>
  )
}

export default useApp
