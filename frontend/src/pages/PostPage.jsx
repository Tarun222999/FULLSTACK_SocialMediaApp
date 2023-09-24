import { Avatar, Flex, Text, Image, Box, Divider, Button } from "@chakra-ui/react"
import { BsThreeDots } from "react-icons/bs"
import Actions from "../components/Actions"
import { useState } from "react"
import Comment from "../components/Comment"
const PostPage = () => {
    const [liked, setLiked] = useState(false);

    return (
        <>
            <Flex>
                <Flex w={'full'} alignItems={'center'} gap={3}>
                    <Avatar
                        src="/zuck-avatar.png"
                        size={'md'}
                        name="mark zuck"

                    />
                    <Flex>
                        <Text fontSize={'sm'} fontWeight={'bold'} >markzuckerburg</Text>
                        <Image src='/verified.png' w='4' h={4} ml={4} />
                    </Flex>

                </Flex>
                <Flex gap={4} alignItems={'center'} >
                    <Text fontSize={'sm'} color={'gray.light'}>
                        1d
                    </Text>
                    <BsThreeDots />
                </Flex>
            </Flex>
            <Text my={3}>Lets talk about threads</Text>
            <Box
                borderRadius={6}
                overflow={'hidden'}
                border={'1px solid '}
                borderColor={'gray.light'}

            >

                <Image
                    src='/post1.png'
                    w={'full'}


                />
            </Box>
            <Flex gap={3} my={3}>
                <Actions liked={liked} setLiked={setLiked} />
            </Flex>

            <Flex gap={2} alignItems={'center'}>
                <Text color={'gray.light'}
                    fontSize={'sm'}
                >3453 replies</Text>
                <Box w={0.5} borderRadius={'full'} bg={'gray.light'}></Box>
                <Text color={'gray.light'} fontSize={'sm'} >{200 + (liked ? 1 : 0)} likes</Text>
            </Flex>
            <Divider my={4} />

            <Flex justifyContent={'space-between'}>
                <Flex gap={2} alignItems={'center'}>
                    <Text fontSize={'2xl'}>#</Text>
                    <Text color={'gray.light'}>GET THE APP TO LIKE TO REPLY AND POST</Text>
                </Flex>
                <Button>
                    GET
                </Button>
            </Flex>
            <Divider my={4} />
            <Comment />
        </>
    )
}

export default PostPage
