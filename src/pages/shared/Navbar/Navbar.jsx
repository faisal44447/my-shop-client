import { useContext } from "react";
import { AuthContext } from "../../../providers/AuthProvider";
import { CartContext } from "../../../providers/CartProvider";
import { Link, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

const Navbar = () => {
    const { user, logOut } = useContext(AuthContext);
    const { cart } = useContext(CartContext); // ✅ LIVE CART
    const navigate = useNavigate();

    const handleLogout = () => {
        logOut()
            .then(() => {
                Swal.fire("Logged out!", "", "success");
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
                <Link to="/products">Products</Link>
                <Link to="/add-product">AddProduct</Link>
                 <Link to="/dashboard">Dashboard</Link>
                <Link to="/accounts">Accounts</Link>
                <Link to="/add-account">Add Account</Link>

                {/* ✅ LIVE CART COUNT */}
                <Link to="/cart">
                    Cart ({cart.length}) 🛒
                </Link>

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