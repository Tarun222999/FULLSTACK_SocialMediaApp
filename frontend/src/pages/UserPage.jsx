
import UserHeader from "../components/UserHeader"
import UserPost from "../components/userPost"
const UserPage = () => {
    return (
        <>

            <UserHeader />
            <UserPost likes={1200} replies={5431} postImage='/post1.png' postTitle='let talk aboth threads' />
            <UserPost likes={12223} replies={1341} postImage='/post2.png' postTitle='mern stack' />
            <UserPost likes={42320} replies={3431} postImage='/post3.png' postTitle='star boy' />

            <UserPost likes={1250} replies={51} postTitle='wow threads' />


        </>
    )
}

export default UserPage
