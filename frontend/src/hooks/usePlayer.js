
import { useState } from "react"

import { cloneDeep } from 'lodash'
import { useSocket } from "../../context/SocketContext"
const usePlayer=(myId,roomId)=>{
    const {socket}=useSocket()

    const [players, setPlayers] = useState({})

    const playersCopy=cloneDeep(players)

    
    const playerHighlighted = playersCopy[myId]
    delete playersCopy[myId]

    const nonHighlightedPlayers = playersCopy

    const toggleAudio=()=>{
        setPlayers((prev)=>{
            const copy=cloneDeep(prev)
            copy[myId].muted =!copy[myId].muted
            return {...copy}
        })
       
        socket.emit('user-toggle-audio', myId, roomId)
        console.log("toggle audio below emit")
    }

    const toggleVideo = () => {
        console.log("I toggled my video")
        setPlayers((prev) => {
            const copy = cloneDeep(prev)
            copy[myId].playing = !copy[myId].playing
            return {...copy}
        })
        socket.emit('user-toggle-video', myId, roomId)
    }
    return {
        players,
        setPlayers,
        playerHighlighted,
        nonHighlightedPlayers,
        toggleAudio,
        toggleVideo
    }
}




export default usePlayer