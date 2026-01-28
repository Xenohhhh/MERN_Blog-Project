import { useNavigate } from "react-router-dom";
import { logout } from "../utils/auth.service";

const LogoutButton = () => {
    const navigate = useNavigate()

    const handleLogOut = () => {
        logout()
        navigate("/login", {replace: true})
    }

    return <button onClick={handleLogOut}>Logout</button>
}

export default LogoutButton;