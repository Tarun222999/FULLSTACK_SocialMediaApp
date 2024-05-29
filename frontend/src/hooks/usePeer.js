
import { useState,useEffect, useRef } from "react"
import { useParams } from 'react-router-dom'
import {Peer} from 'peerjs'
import { useSocket } from "../../context/SocketContext"
const usePeer=()=>{
    const {socket}=useSocket()
    const [peer, setPeer] = useState(null)
    const [myId, setMyId] = useState('')
    const isPeerset=useRef(false)
    const {roomId}=useParams()
    useEffect(()=>{
        if(isPeerset.current || !roomId || !socket) return;
        isPeerset.current=true
        const conn = new Peer();
        setPeer(conn)

        conn.on("open", (id) => {
         
            setMyId(id)
            socket?.emit('join-room',roomId,id)
        });
        
    },[roomId,socket])
    return {
        peer,myId
    }
}


export default usePeer