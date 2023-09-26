import { useRecoilValue, useSetRecoilState } from "recoil"
import LoginCard from "../components/Login"
import SignupCard from "../components/SignUpCard"
import authScreenAtom from "../atoms/authAtom"

const Auth = () => {
    const authScreenState = useRecoilValue(authScreenAtom);
    console.log(authScreenState)
    // useSetRecoilState(authScreenAtom);
    return (
        <div>
            {
                authScreenState === "login" ? <LoginCard /> : <SignupCard />
            }

        </div>
    )
}

export default Auth
