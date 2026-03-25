import { useContext } from "react";
import { AuthContext } from "../../providers/AuthProvider";
import { FaGoogle } from "react-icons/fa";
import { useNavigate, useLocation } from "react-router-dom";

const SocialLogin = () => {
    const { signInWithGoogle } = useContext(AuthContext);
    const navigate = useNavigate();
    const location = useLocation();

    const from = location.state?.from?.pathname || "/";

    const handleGoogle = () => {
        signInWithGoogle().then(() => {
            navigate(from, { replace: true });
        });
    };

    return (
        <div className="p-4">
            <button onClick={handleGoogle} className="btn w-full flex gap-2">
                <FaGoogle /> Continue with Google
            </button>
        </div>
    );
};

export default SocialLogin;