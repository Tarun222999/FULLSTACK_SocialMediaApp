import { useToast } from "@chakra-ui/react";
import React from "react";

const useShowToast = () => {
    const toast = useToast();
    const showToast = (title, description, status) => {
        toast({
            title,
            description,
            isClosable: true,
            duration: 3000,
            status
        })
    }
    return showToast;
}

export default useShowToast