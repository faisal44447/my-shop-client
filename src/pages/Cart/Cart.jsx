import { useEffect, useState } from "react";
import Swal from "sweetalert2";

const Cart = () => {
    const [cart, setCart] = useState([]);

    useEffect(() => {
        const stored = JSON.parse(localStorage.getItem("cart")) || [];
        setCart(stored);
    }, []);

    const handleRemove = (id) => {
        const updated = cart.filter(item => item._id !== id);
        setCart(updated);
        localStorage.setItem("cart", JSON.stringify(updated));

        Swal.fire("Removed!", "Item removed from cart", "success");
    };

    const total = cart.reduce((sum, item) => sum + Number(item.price), 0);

    return (
        <div className="p-6">
            <h2 className="text-2xl font-bold mb-4">🛒 Cart</h2>

            {cart.length === 0 ? (
                <p>No items in cart</p>
            ) : (
                <>
                    <div className="space-y-4">
                        {cart.map(item => (
                            <div key={item._id} className="flex justify-between items-center bg-white p-4 shadow rounded">

                                <div className="flex gap-3 items-center">
                                    <img src={item.image} className="w-16 h-16 object-cover rounded" />
                                    <div>
                                        <h3 className="font-bold">{item.name}</h3>
                                        <p>{item.price} ৳</p>
                                    </div>
                                </div>

                                <button
                                    onClick={() => handleRemove(item._id)}
                                    className="btn btn-error btn-sm"
                                >
                                    Remove
                                </button>
                            </div>
                        ))}
                    </div>

                    <h3 className="mt-6 text-xl font-bold">
                        Total: {total} ৳
                    </h3>
                </>
            )}
        </div>
    );
};

export default Cart;