import { Avatar, Box, Flex, Image, Text } from "@chakra-ui/react"
import { useState } from "react"
import { BsThreeDots } from "react-icons/bs"
import { Link } from "react-router-dom"
import Actions from "./Actions"


const UserPost = ({ likes, replies, postImage, postTitle }) => {
    const [liked, setLiked] = useState(false);
    return (
        <Link to={'/mark/post/1'}>
            <Flex gap={3} mb={4} py={5}>
                <Flex flexDirection={'column'} alignItems={'center'}>
                    < Avatar size={'md'} name="mark" src='/zuck-avatar.png' />
                    <Box w={'1px'} h={'full'} bg={'gray.light'} my={2} >

                    </Box>
                    <Box position={'relative'} w={'full'}>
                        <Avatar
                            size={'xs'}
                            name="john"
                            src='https://bit.ly/dan-abramov'
                            position={'absolute'}
                            top={'0px'}
                            left={'14px'}
                            padding={'2px'}

                        />
                        <Avatar
                            size={'xs'}
                            name="john"
                            src='https://bit.ly/tioluwani-kolawole'
                            position={'absolute'}
                            bottom={'-5px'}
                            right='12px'
                            padding={'2px'}

                        />
                        <Avatar
                            size={'xs'}
                            name="john"
                            src='https://bit.ly/kent-c-dodds'
                            position={'absolute'}
                            top={'0px'}
                            left={'4px'}
                            padding={'2px'}

                        />
                    </Box>
                </Flex>
                <Flex flex={1} flexDirection={'column'} gap={2}>
                    <Flex justifyContent={'space-between'} w={'full'}>
                        <Flex w='full' alignItems={'center'}>
                            <Text fontSize={'sm'} fontWeight={'bold'}>markzuck</Text>
                            <Image
                                src="/verified.png"
                                w={4}
                                h={4}
                                ml={1}

                            />
                        </Flex>
                        <Flex gap={4} alignItems={'center'}>
                            <Text fontStyle={'sm'}
                                color={'gray.light'}

                            >
                                1D
                            </Text>
                            <BsThreeDots />
                        </Flex>

                    </Flex>

                    <Text>
                        {postTitle}
                    </Text>
                    {
                        postImage && (


                            <Box
                                borderRadius={6}
                                overflow={'hidden'}
                                border={'1px solid '}
                                borderColor={'gray.light'}

                            >

                                <Image
                                    src={postImage}
                                    w={'full'}


                                />
                            </Box>


                        )
                    }

                    <Flex gap={3} my={1}>
                        <Actions liked={liked} setLiked={setLiked} />
                    </Flex>


                    <Flex gap={2} alignItems={'center'}>
                        <Text color={'gray.light'} fontSize={'sm'} >{likes} likes</Text>
                        <Box w={0.5} borderRadius={'full'} bg={'gray.light'}></Box>
                        <Text color={'gray.light'} fontSize={'sm'} >{replies} replies</Text>

                    </Flex>
                </Flex>

            </Flex>
        </Link>
    )
}

export default UserPost
