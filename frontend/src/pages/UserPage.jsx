import { useEffect, useState } from "react";
import UserHeader from "../components/UserHeader";
import { useParams } from "react-router-dom";
import useShowToast from "../hooks/useShowToast";
import { Flex, Spinner } from "@chakra-ui/react";
import Posts from '../components/Posts'
import { useRecoilState } from "recoil";
import postAtom from "../atoms/postAtom";

const UserPage = () => {
    const [user, setUser] = useState(null);
    const { username } = useParams();
    const showToast = useShowToast();
    const [loading, setLoading] = useState(true);
    const [posts, setPosts] = useRecoilState(postAtom)
    const [fetchingPosts, setFetchingPosts] = useState(true);


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



        const getPosts = async () => {
            setFetchingPosts(true);
            try {
                const res = await fetch(`/api/posts/user/${username}`);
                const data = await res.json();
                if (data.error) {
                    showToast('Error', data.error, 'error');
                    return;
                }
                setPosts(data);
            } catch (error) {
                showToast("Error", error.message, "error");
                setPosts([]);
            } finally {
                setFetchingPosts(false);
            }
        };
        getUser();
        getPosts();
    }, [username, showToast, setPosts]);
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

            {!fetchingPosts && posts.length === 0 && <h1>User has not posts.</h1>}
            {fetchingPosts && (
                <Flex justifyContent={"center"} my={12}>
                    <Spinner size={"xl"} />
                </Flex>
            )}

            {posts.map((post) => (
                <Posts key={post._id} post={post} postedBy={post.postedBy} />
            ))}
        </>
    )
}

export default UserPage
