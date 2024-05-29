
import { Mic, Video, PhoneOff, MicOff, VideoOff } from "lucide-react";


import { Box, Button, Flex, Input } from '@chakra-ui/react'
const Bottom = (props) => {
    const { muted, playing, toggleAudio, toggleVideo, leaveRoom } = props;

    return (
        <Flex

            gap={4}
            flexDirection={{
                base: 'row',
                md: 'row'
            }}


        >

            {muted ? (
                <MicOff


                    onClick={toggleAudio}
                />
            ) : (
                <Mic onClick={toggleAudio} />
            )}
            {playing ? (
                <Video onClick={toggleVideo} />
            ) : (
                <VideoOff


                    onClick={toggleVideo}
                />
            )}
            <PhoneOff onClick={leaveRoom} />
        </Flex>
    );
};

export default Bottom;