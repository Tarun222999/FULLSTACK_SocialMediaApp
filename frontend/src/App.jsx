import { Box, Button } from "@chakra-ui/react"
import { Container } from "@chakra-ui/react"
import { Navigate, Route, Routes } from "react-router-dom"
import UserPage from './pages/UserPage'
import PostPage from "./pages/PostPage"
import Header from "./components/Header"
import HomePage from "./pages/HomePage"
import Auth from "./pages/Auth"
import { useRecoilValue } from "recoil"
import userAtom from "./atoms/userAtom"
import LogoutButton from "./components/LogoutButton"
import UpdateProfilePage from "./pages/UpdateProfilePage"
import CreatePost from "./components/CreatePost"
import ChatPage from "./pages/ChatPage"
function App() {

  const user = useRecoilValue(userAtom);
  return (
    <Box position={'relative'} width={'full'}>
      <Container maxW='620px'>
        <Header />
        <Routes>
          <Route path="/" element={user ? <HomePage /> : <Navigate to='/auth' />} />
          <Route path="/auth" element={!user ? <Auth /> : <Navigate to='/' />} />
          <Route path="/update" element={user ? <UpdateProfilePage /> : <Navigate to='/auth' />} />
          <Route path='/:username' element={user ? (
            <>
              <UserPage />
              <CreatePost />
            </>
          ) : (<UserPage />)} />
          <Route path='/:username/post/:pid' element={user ? <PostPage /> : <Navigate to='/auth' />} />
          <Route path='/chat' element={user ? <ChatPage /> : <Navigate to={"/auth"} />} />
        </Routes>

        {/* {user && <CreatePost />} */}
      </Container>

    </Box>
  )
}

export default App
