import { AddIcon } from '@chakra-ui/icons'
import {
    Button,

    Input,
    useColorModeValue,
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    ModalCloseButton,
    FormControl,
    Text,
    Textarea,
    useDisclosure,
    Flex,
    Image,
    CloseButton,
} from '@chakra-ui/react'
import React, { useRef, useState } from 'react'
import userPreviewImg from '../hooks/userPreviewImg'
import { BsFillImageFill } from "react-icons/bs";
import { useRecoilValue } from 'recoil';
import userAtom from '../atoms/userAtom';
import useShowToast from '../hooks/useShowToast';
const MAX_CHAR = 500
const CreatePost = () => {
    const { isOpen, onOpen, onClose } = useDisclosure()
    const [postText, setpostText] = useState('');
    const { handleImageChange, imgUrl, setImgUrl } = userPreviewImg();
    const [remchar, setRemChar] = useState(MAX_CHAR);
    const imageRef = useRef(null);
    const user = useRecoilValue(userAtom)
    const showToast = useShowToast();
    const [loading, setLoading] = useState(false);
    const handleTextChange = (e) => {
        const inputText = e.target.value;
        if (inputText.length > MAX_CHAR) {
            const trunctext = inputText.slice(0, MAX_CHAR);
            setpostText(trunctext);
            setRemChar(0);
        } else {
            setpostText(inputText);
            setRemChar(MAX_CHAR - inputText.length);
        }
    }

    const handleCreatePost = async () => {


        setLoading(true);

        try {
            const res = await fetch(`/api/posts/create`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({ postedBy: user._id, text: postText, img: imgUrl })
            })

            const data = await res.json();
            if (data.error) {
                showToast("Error", error, "error");
                return;
            }


            showToast('Success', "Thread Posted Succesfully", "success");
            onClose();
            setpostText("");
            setImgUrl("");

        } catch (error) {
            showToast("Error", error, "error");
        } finally {
            setLoading(false);
        }


    }
    return (
        <>
            <Button
                position={'fixed'}
                bottom={10}
                right={10}
                leftIcon={<AddIcon />}
                bg={useColorModeValue('gray.300', 'gray.dark')}
                onClick={onOpen}
            >
                Thread
            </Button>

            <Modal isOpen={isOpen} onClose={onClose}>
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader>Create Post</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody pb={6}>
                        <FormControl>
                            <Textarea
                                placeholder='Start a thread'
                                onChange={handleTextChange}
                                value={postText}


                            />
                            <Text
                                fontSize='xs'
                                textAlign={'right'}
                                m={'1'}
                                fontWeight={'bold'}
                                color={'gray.800'}
                            >
                                {remchar}/{MAX_CHAR}
                            </Text>

                            {/* hidde this input and use a useref to point the input */}
                            <Input
                                type='file'
                                hidden
                                ref={imageRef}
                                onChange={handleImageChange}
                            />

                            {/* use the above user ref to and trigger the click event */}
                            <BsFillImageFill
                                style={{ marginLeft: "5px", cursor: "pointer" }}
                                size={16}
                                onClick={() => imageRef.current.click()}


                            />
                        </FormControl>


                        {imgUrl && (
                            <Flex mt={5} w={'full'} position={'relative'}>
                                <Image
                                    src={imgUrl}
                                    alt='Selected img'


                                />

                                <CloseButton
                                    onClick={() => { setImgUrl('') }}
                                    bg={'gray.800'}
                                    top={2}
                                    right={2}
                                />



                            </Flex>



                        )}
                    </ModalBody>

                    <ModalFooter>
                        <Button colorScheme='blue' mr={3} onClick={handleCreatePost} isLoading={loading}>
                            Post
                        </Button>

                    </ModalFooter>
                </ModalContent>
            </Modal>


        </>
    )
}

export default CreatePost
