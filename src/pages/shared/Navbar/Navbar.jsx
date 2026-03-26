import { useContext } from "react";
import { AuthContext } from "../../../providers/AuthProvider";
import { CartContext } from "../../../providers/CartProvider";
import { Link, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

const Navbar = () => {
    const { user, logOut } = useContext(AuthContext);
    const { cart } = useContext(CartContext);
    const navigate = useNavigate();

    const handleLogout = async () => {
        await axios.post("http://localhost:5000/logout", {}, {
            withCredentials: true,
        });

        logOut(); 
    };

    return (
        <div className="flex justify-between items-center p-4 text-black font-bold glass">

            {/* LOGO */}
            <h1 className="text-xl font-bold">
                <Link to="/">Laivin Jewellers</Link>
            </h1>

            {/* MENU */}
            <div className="flex gap-4 items-center">

                <Link to="/home" onClick={() => window.scrollTo(0, 0)}>Home</Link>

                <Link to="/products">Products</Link>
                <Link to="/add-product">Add Product</Link>

                <Link to="/dashboard">Dashboard</Link>
                <Link to="/accounts">Accounts</Link>
                <Link to="/add-account">Add Account</Link>

                {/* CART */}
                <Link to="/cart">
                    Cart ({cart.length}) 🛒
                </Link>

                {/* AUTH */}
                {user ? (
                    <button onClick={handleLogout}>Logout</button>
                ) : (
                    <button onClick={() => navigate("/login")}>
                        Login
                    </button>
                )}
            </div>
        </div>
    );
};

export default Navbar;