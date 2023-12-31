import { Flex, Spinner, Text } from '@chakra-ui/react'
import React, { useEffect, useState } from 'react'
import useShowToast from "../hooks/useShowToast"
import Posts from '../components/Posts'
import { useRecoilState } from 'recoil'
import postAtom from '../atoms/postAtom'
const HomePage = () => {
    const [posts, setPosts] = useRecoilState(postAtom);
    const [loading, setLoading] = useState(true);
    const showToast = useShowToast();
    useEffect(() => {
        const getFeedPosts = async () => {
            setPosts([]);
            setLoading(true);
            try {
                const res = await fetch('api/posts/feed');
                const data = await res.json();

                if (data.error) {
                    showToast("Error", error, "error");
                    return;
                }

                setPosts(data);
            } catch (error) {
                showToast("Error", error, "error");
            } finally {
                setLoading(false);
            }
        }

        getFeedPosts();
    }, [showToast, setPosts]);
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
