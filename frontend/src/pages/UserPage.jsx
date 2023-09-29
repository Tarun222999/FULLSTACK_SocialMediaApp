
import { useEffect, useState } from "react"

import UserHeader from "../components/UserHeader"
import UserPost from "../components/userPost"
import { useParams } from "react-router-dom";
import useShowToast from "../hooks/useShowToast";
import { Flex, Spinner } from "@chakra-ui/react";
const UserPage = () => {
    const [user, setUser] = useState(null);

    const { username } = useParams();

    const showToast = useShowToast();
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const getUser = async () => {
            try {
                const res = await fetch(`/api/users/profile/${username}`);
                const data = await res.json();
                if (data.error) {
                    showToast('Error', data.error, 'error');
                }
                setUser(data);
            } catch (error) {
                showToast('Error', data.error, 'error');
            } finally {
                setLoading(false);
            }
        }
        getUser();
    }, [username, showToast]);
    if (!user && loading) {
        return (
            <Flex justifyContent={"center"}>
                <Spinner size={"xl"} />
            </Flex>
        );
    }
    if (!user && !loading) return <h1>User not found</h1>;


    return (
        <>

            <UserHeader user={user} />
            <UserPost likes={1200} replies={5431} postImage='/post1.png' postTitle='let talk aboth threads' />
            <UserPost likes={12223} replies={1341} postImage='/post2.png' postTitle='mern stack' />
            <UserPost likes={42320} replies={3431} postImage='/post3.png' postTitle='star boy' />

            <UserPost likes={1250} replies={51} postTitle='wow threads' />


        </>
    )
}

export default UserPage
