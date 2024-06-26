import { createContext, useContext, useEffect, useState } from "react";

import { useRecoilValue } from "recoil";
import io from "socket.io-client";
import userAtom from "../src/atoms/userAtom";


const SocketContext = createContext();
export const useSocket = () => {
    return useContext(SocketContext)
}

export const SocketContextProvider = ({ children }) => {
    const user = useRecoilValue(userAtom);
    const [socket, setSocket] = useState(null);
    const [onlineUsers, setOnlineUsers] = useState([]);

    useEffect(() => {
        const socket = io("http://localhost:5000", {
            query: {
                userId: user?._id,
            },
        });
        setSocket(socket);
        console.log(socket)
        socket.on("getOnlineUsers", (users) => {
            setOnlineUsers(users);
        });

        return () => socket && socket.close();
    }, [user?._id])
    console.log(onlineUsers);
    return (
        <SocketContext.Provider value={{ socket, onlineUsers }}>
            {children}
        </SocketContext.Provider>
    )
}