import {
    Avatar,
    Box,
    Flex,
    VStack,
    Text,
    MenuButton,
    Menu, MenuList,
    Portal,
    MenuItem,
    useToast
} from "@chakra-ui/react"
import { Link } from "react-router-dom"
import { BsInstagram } from "react-icons/bs";
import { CgMoreO } from "react-icons/cg";
const UserHeader = () => {

    const toast = useToast();
    const copyUrl = () => {
        const currentURL = window.location.href;
        navigator.clipboard.writeText(currentURL).then(() => {
            toast({ description: 'Copied' })
        })
    }
    return <VStack gap={4} alignItems={'start'}>
        <Flex justifyContent={'space-between'} w={'full'}>
            <Box>
                <Text fontSize={'2xl'} fontWeight={'bold'}>
                    Mark Zuckerberg
                </Text>
                <Flex gap={2} alignItems={'center'}>
                    <Text fontSize={'sm'}>markzuck</Text>
                    <Text fontSize={'sm'}
                        bg={'gray.dark'}
                        color={'gray.light'}
                        p={1}
                        borderRadius={'full'}
                    >threads.net</Text>

                </Flex>
            </Box>
            <Box>
                <Avatar
                    name="Mark Zuckerberg"
                    src="/zuck-avatar.png"
                    size={

                        {
                            base: 'md',
                            md: 'xl'
                        }
                    }
                />
            </Box>
        </Flex>
        <Text>Co-founder exec chairmen and Ceo of meta</Text>
        <Flex w={'full'} justifyContent={'space-between'}>
            <Flex gap={2} alignItems={'center'}>
                <Text color={'gray.light'}>1M follwers</Text>
                <Box w={1} h={1} bg={'gray.light'} borderRadius={'full'}></Box>
                <Link color="gray.light">instagram.com</Link>
            </Flex>
            <Flex>
                <Box className="icons-container">
                    <BsInstagram size={24} cursor={'pointer'} />
                </Box>
                <Box className="icons-container">
                    <Menu>
                        <MenuButton>
                            <CgMoreO size={24} cursor={'pointer'} />
                        </MenuButton>
                        <Portal>
                            <MenuList>
                                <MenuItem bg={'gray.dark'} onClick={copyUrl}>Copy Link</MenuItem>
                            </MenuList>
                        </Portal>
                    </Menu>

                </Box>
            </Flex>
        </Flex>


        <Flex w={'full'}>
            <Flex flex={1}
                borderBottom={'1.5px solid white'}
                justifyContent={'center'}
                pb={3}
                cursor={'pointer'}

            >
                <Text>Threads</Text>
            </Flex>
            <Flex flex={1}
                borderBottom={'1px solid grey'}
                justifyContent={'center'}
                pb={3}
                cursor={'pointer'}
                color={'gray.light'}
            >
                <Text>Replies</Text>
            </Flex>
        </Flex>

    </VStack>
}

export default UserHeader
