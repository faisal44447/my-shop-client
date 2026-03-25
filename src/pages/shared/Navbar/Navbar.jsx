import { useContext } from "react";
import { AuthContext } from "../../../providers/AuthProvider";
import { Link, useNavigate } from "react-router-dom";

const Navbar = () => {
    const { user, logOut } = useContext(AuthContext);
    const navigate = useNavigate();

    const handleLogout = () => {
        logOut()
            .then(() => {
                alert("Logged out successfully!");
                navigate("/");
            })
            .catch((error) => console.error(error));
    };

    return (
        <div className="flex justify-between items-center p-4 bg-black text-white">
            <h1 className="text-xl font-bold">
                <Link to="/">Laivin Jewellers</Link>
            </h1>

            <div className="flex gap-4 items-center">
                <Link to="/">Home</Link>
                <Link to="/dashboard">Dashboard</Link>
                <Link to="/accounts">Accounts</Link>
                <Link to="/add-account">Add Account</Link>

                {user && (
                    <div className="flex items-center gap-2">
                        <img
                            src={user.photoURL || "https://i.ibb.co/4pDNDk1/avatar.png"}
                            className="w-8 h-8 rounded-full"
                        />
                        <span>{user.displayName || "User"}</span>
                    </div>
                )}

                {user ? (
                    <button onClick={handleLogout}>Logout</button>
                ) : (
                    <button onClick={() => navigate("/login")}>Login</button>
                )}
            </div>
        </div>
    );
};

export default Navbar;