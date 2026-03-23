import { Link } from "react-router-dom";
import shopLogo from "../../../assets/shopLogo.jpg";

const Navbar = () => {
    const navOptions = (
        <>
            <li><Link to="/">Home</Link></li>
        </>
    );

    return (
        <div className="navbar bg-base-100">
            {/* LEFT */}
            <div className="navbar-start mb-5">
                <div className="dropdown">
                    <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-5 w-5"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="M4 6h16M4 12h8m-8 6h16"
                            />
                        </svg>
                    </div>

                    <ul
                        tabIndex={0}
                        className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow"
                    >
                        {navOptions}
                    </ul>
                </div>

                {/* LOGO */}
                <Link to='/'>
                    <img src={shopLogo} alt="Shop Logo" className="w-[60px]  rounded-xl border-2 border-yellow-500"
                    />
                </Link>
            </div>

            {/* CENTER */}
            <div className="navbar-center hidden lg:flex">
                <ul className="menu menu-horizontal px-1">
                    {navOptions}
                </ul>
            </div>

            {/* RIGHT */}
            <div className="navbar-end">
                <button className="btn">Login</button>
            </div>
        </div>
    );
};

export default Navbar;