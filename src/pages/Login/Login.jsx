import { useContext, useEffect, useState } from "react";
import {
    LoadCanvasTemplate,
    loadCaptchaEnginge,
    validateCaptcha,
} from "react-simple-captcha";
import { AuthContext } from "../../providers/AuthProvider";
import { Link, useLocation, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { CiRead } from "react-icons/ci";
import SocialLogin from "../shared/SocialLogin";
import axios from "axios"; // ✅ ADD THIS

const Login = () => {
    const { signIn, resetPassword } = useContext(AuthContext);
    const [showPassword, setShowPassword] = useState(false);
    const [disabled, setDisabled] = useState(true);

    const navigate = useNavigate();
    const location = useLocation();
    const from = location.state?.from?.pathname || "/";

    useEffect(() => {
        loadCaptchaEnginge(6);
    }, []);

    const handleLogin = async (e) => {
        e.preventDefault();
        const email = e.target.email.value;
        const password = e.target.password.value;

        try {
            // 🔥 Firebase Login
            const result = await signIn(email, password);
            const user = result.user;

            // 🔥 JWT CREATE (VERY IMPORTANT)
            await axios.post(
                "http://localhost:5000/jwt",
                { email: user.email },
                { withCredentials: true }
            );

            Swal.fire("Login Success!", "", "success");

            navigate(from, { replace: true });

        } catch (err) {
            Swal.fire(err.message);
        }
    };

    // captcha
    const handleCaptcha = (e) => {
        if (validateCaptcha(e.target.value)) {
            setDisabled(false);
        } else {
            setDisabled(true);
        }
    };

    // forgot password
    const handleForgotPassword = () => {
        const email = prompt("Enter your email:");
        if (!email) return;

        resetPassword(email)
            .then(() => {
                Swal.fire("Password reset email sent!");
            })
            .catch((err) => Swal.fire(err.message));
    };

    return (
        <div className="hero min-h-screen">
            <div className="card w-96 shadow-xl bg-base-100">
                <form onSubmit={handleLogin} className="card-body">

                    <input name="email" placeholder="Email" className="input input-bordered" />

                    <div className="relative">
                        <input
                            type={showPassword ? "text" : "password"}
                            name="password"
                            placeholder="Password"
                            className="input input-bordered w-full"
                        />
                        <span
                            onClick={() => setShowPassword(!showPassword)}
                            className="absolute right-3 top-3 cursor-pointer"
                        >
                            <CiRead />
                        </span>
                    </div>

                    <button
                        type="button"
                        onClick={handleForgotPassword}
                        className="text-blue-500 text-sm text-left"
                    >
                        Forgot password?
                    </button>

                    <LoadCanvasTemplate />

                    <input
                        onBlur={handleCaptcha}
                        placeholder="Enter captcha"
                        className="input input-bordered"
                    />

                    <button disabled={disabled} className="btn btn-primary">
                        Login
                    </button>

                    <p>
                        New here? <Link to="/signup">Signup</Link>
                    </p>

                </form>

                <SocialLogin />
            </div>
        </div>
    );
};

export default Login;