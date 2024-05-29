import { useSocket } from '../../context/SocketContext'
import useMediaStream from '../hooks/useMediaStream'
import usePeer from '../hooks/usePeer'
import Player from '../components/Player'
import { useEffect } from 'react'
import { Box, Button, Flex, Input } from '@chakra-ui/react'
import { useParams } from 'react-router-dom'
import usePlayer from '../hooks/usePlayer'
import Bottom from '../components/Player/Bottom'
import { cloneDeep } from 'lodash'
function VideoChat() {
    const { socket } = useSocket()
    const { peer, myId } = usePeer()
    const { roomId } = useParams()
    const { stream } = useMediaStream()
    const { players, setPlayers,
        playerHighlighted,
        nonHighlightedPlayers, toggleAudio, toggleVideo } = usePlayer(myId, roomId)

    useEffect(() => {

        if (!socket || !peer || !stream) return;
        const handleUserConnected = (newUser) => {
            console.log(`user connected in room with userid ${newUser}`)

            const call = peer.call(newUser, stream)

            call.on('stream', (incomingStream) => {
                console.log(`incoming stream from ${newUser}`);

                setPlayers((prev) => ({
                    ...prev,
                    [newUser]: {
                        url: incomingStream,
                        muted: false,
                        playing: true,
                    }
                }))

            })

        }
        socket.on('user-connect', handleUserConnected)

        return () => {
            socket.off('user-connect', handleUserConnected)
        }
    }, [peer, socket, stream])


    useEffect(() => {
        if (!socket) return;

        const handleToggleAudio = (userId) => {
            console.log(`user with id ${userId} toggled audio`);
            setPlayers((prev) => {
                const copy = cloneDeep(prev);
                console.log(copy[userId].muted)
                copy[userId].muted = !copy[userId].muted;
                return { ...copy };
            });
        };


        const handleToggleVideo = (userId) => {
            console.log(`user with id ${userId} toggled video`);
            setPlayers((prev) => {
                const copy = cloneDeep(prev);
                copy[userId].playing = !copy[userId].playing;
                return { ...copy };
            });
        };


        socket.on('user-toggle-audio', handleToggleAudio);
        socket.on('user-toggle-video', handleToggleVideo);

        return () => {
            socket.off('user-toggle-audio', handleToggleAudio);
            socket.off('user-toggle-video', handleToggleVideo);

        };
    }, [players, setPlayers, socket]);

    useEffect(() => {

        if (!peer || !stream) return

        peer.on('call', (call) => {
            const { peer: callerId } = call;

            call.answer(stream)

            call.on('stream', (incomingStream) => {
                console.log(`incoming stream from ${callerId}`);
                setPlayers((prev) => ({
                    ...prev,
                    [callerId]: {
                        url: incomingStream,
                        muted: false,
                        playing: true,
                    }
                }))


            })
        })
    }, [peer, setPlayers, stream])


    useEffect(() => {
        if (!stream || !myId) return;

        console.log(`setting my stream ${myId}`);

        setPlayers((prev) => ({
            ...prev,
            [myId]: {
                url: stream,
                muted: true,
                playing: true,
            }
        }))
    }, [myId, setPlayers, stream])
    return (
        <div>
            Video Chat
            <Flex

                gap={4}
                flexDirection={{
                    base: 'row',
                    md: 'row'
                }}


            >
                <Box boxShadow='dark-lg' mb="10px" rounded='md' bg='gray' maxW="350px"
                    maxH="450px"
                >
                    <Box ml="20px">
                        {
                            playerHighlighted && <Player
                                url={playerHighlighted.url}
                                muted={playerHighlighted.muted}
                                playing={playerHighlighted.playing}

                            />
                        }
                        <Bottom
                            muted={playerHighlighted?.muted}
                            playing={playerHighlighted?.playing}
                            toggleAudio={toggleAudio}
                            toggleVideo={toggleVideo}



                        />
                    </Box>



                </Box>
                <Flex

                    gap={4}
                    flexDirection={{
                        base: 'row',
                        md: 'row'
                    }}
                >
                    {
                        Object.keys(nonHighlightedPlayers).map((playerId) => {
                            const { url, muted, playing } = players[playerId]
                            return <Box borderColor='gray.100' boxShadow='dark-lg' bg='gray.900' key={playerId} rounded='md' maxW="350px"
                                maxH="450px"
                                pt={'20px'}
                                pl={'15px'}
                            >
                                <Player

                                    url={url}
                                    muted={muted}
                                    playing={playing}

                                />
                            </Box>
                        })
                    }
                </Flex>


            </Flex>
        </div>
    )
}

export default VideoChat
