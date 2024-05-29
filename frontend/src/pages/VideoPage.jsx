import { useState } from 'react';

import { v4 as uuidv4 } from 'uuid'
import { useNavigate } from 'react-router-dom'
import { Box, Button, Flex, Input } from '@chakra-ui/react'
function VideoPage() {
    // const { socket } = useSocket()
    // const {peer,myId}=usePeer()

    const [roomId, setRoomId] = useState('')
    const navigate = useNavigate()
    const createAndJoin = () => {
        const roomId = uuidv4()
        navigate(`/videochat/${roomId}`)
    }


    const joinRoom = () => {
        if (roomId) navigate(`/videochat/${roomId}`)
        else {
            alert("Please provide a valid room id")
        }
    }
    return (
        <Box>
            <Flex
                gap={4}
                flexDirection={{
                    base: 'column',
                    md: 'column'
                }}
            >
                <Flex gap={1}
                    flexDirection={{
                        base: 'column',
                        md: 'column'
                    }}>
                    <h1>Video Chat</h1>
                    <Flex
                        gap={1}
                        flexDirection={{
                            base: 'row',
                            md: 'row'
                        }}
                    >
                        <Input placeholder='Enter roomid'
                            value={roomId}
                            onChange={(e) => setRoomId(e?.target?.value)}
                        />
                        <Button
                            onClick={joinRoom}
                        >Join Room</Button>
                    </Flex>
                </Flex>

                <span>---or----</span>
                <Button
                    onClick={createAndJoin}
                >Create a new room</Button>
            </Flex>
        </Box>
    )
}

export default VideoPage
