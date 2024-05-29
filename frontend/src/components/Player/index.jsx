import { Box, Flex } from '@chakra-ui/react'
import ReactPlayer from 'react-player'


const Player = (props) => {
    const { url, muted, playing, isActive } = props;
    return (
        <Box display="flex" alignItems="center" justifyContent="space-between">



            <Flex
                gap={4}
                flexDirection={{
                    base: 'row',
                    md: 'row'
                }}

            >

                <ReactPlayer
                    width="85%"
                    height="100%"
                    url={url}
                    muted={muted}
                    playing={playing}

                />
            </Flex>

        </Box>
    )
}



export default Player