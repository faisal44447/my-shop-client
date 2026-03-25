import { useEffect, useState } from "react";

const useCart = () => {

    const [cart, setCart] = useState([]);

    useEffect(() => {
        // localStorage থেকে cart load
        const savedCart = JSON.parse(localStorage.getItem("cart")) || [];
        setCart(savedCart);
    }, []);

    return [cart, setCart];
};

export default useCart;