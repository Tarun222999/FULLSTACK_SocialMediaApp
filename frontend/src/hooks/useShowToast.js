import { useToast } from "@chakra-ui/react";
import React from "react";
import { useCallback } from "react";

const useShowToast = () => {
    const toast = useToast();
    const showToast = useCallback((title, description, status) => {
        toast({
            title,
            description,
            isClosable: true,
            duration: 3000,
            status
        })
    }, [toast]);
    return showToast;
}

export default useShowToast