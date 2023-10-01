import { Flex, Spinner, Text } from '@chakra-ui/react'
import React, { useEffect, useState } from 'react'
import useShowToast from "../hooks/useShowToast"
import Posts from '../components/Posts'
const HomePage = () => {
    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(true);
    const showToast = useShowToast();
    useEffect(() => {
        const getFeedPosts = async () => {
            setLoading(true);
            try {
                const res = await fetch('api/posts/feed');
                const data = await res.json();

                if (data.error) {
                    showToast("Error", error, "error");
                    return;
                }
                console.log(data);
                setPosts(data);
            } catch (error) {
                showToast("Error", error, "error");
            } finally {
                setLoading(false);
            }
        }

        getFeedPosts();
    }, [showToast]);
    return (
        <>

            {loading && (
                <Flex justify={'center'}>
                    <Spinner size={'xl'} />
                </Flex>
            )}
            {
                !loading && posts.length === 0 && <h1>Follow some users to see the feed</h1>
            }

            {
                posts.map((post) => (
                    <Posts key={post._id} post={post} postedBy={post.postedBy} />
                ))
            }
        </>
    )
}

export default HomePage
