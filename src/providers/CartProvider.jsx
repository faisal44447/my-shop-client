import { createContext, useEffect, useState } from "react";

export const CartContext = createContext();

const CartProvider = ({ children }) => {
    const [cart, setCart] = useState([]);

    // ✅ Load cart from localStorage (first time)
    useEffect(() => {
        const savedCart = JSON.parse(localStorage.getItem("cart")) || [];
        setCart(savedCart);
    }, []);

    // ✅ Save cart to localStorage (every change)
    useEffect(() => {
        localStorage.setItem("cart", JSON.stringify(cart));
    }, [cart]);

    // ✅ Add to cart
    const addToCart = (product) => {
        setCart(prev => [...prev, product]);
    };

    // ✅ Remove from cart
    const removeFromCart = (id) => {
        const updatedCart = cart.filter(item => item._id !== id);
        setCart(updatedCart);
    };

    return (
        <CartContext.Provider value={{ cart, addToCart, removeFromCart }}>
            {children}
        </CartContext.Provider>
    );
};

export default CartProvider;