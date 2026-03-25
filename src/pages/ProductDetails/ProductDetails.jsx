import { useEffect, useState, useContext } from "react";
import { useParams } from "react-router-dom";
import Swal from "sweetalert2";
import useAxiosSecure from "../hooks/useAxiosSecure";
import { CartContext } from "../../providers/CartProvider";

const ProductDetails = () => {
    const { id } = useParams();
    const axiosSecure = useAxiosSecure();
    const [product, setProduct] = useState(null);

    const { addToCart } = useContext(CartContext); // ✅ use context

    useEffect(() => {
        axiosSecure.get(`/products/${id}`).then(res => {
            setProduct(res.data);
        });
    }, [id]);

    // ✅ ONLY context (NO localStorage)
    const handleAddToCart = () => {
        addToCart(product);

        Swal.fire({
            position: "top-end",
            icon: "success",
            title: "Added to cart",
            showConfirmButton: false,
            timer: 1500
        });
    };

    if (!product) return <p className="text-center mt-10">Loading...</p>;

    return (
        <div className="p-6 max-w-3xl mx-auto bg-white shadow rounded-xl">

            <img
                src={product.image}
                className="w-full h-64 object-cover rounded"
            />

            <h2 className="text-2xl font-bold mt-4">{product.name}</h2>

            <p>💰 {product.price} ৳</p>
            <p>🟡 {product.carat}</p>

            <button
                onClick={handleAddToCart}
                className="btn btn-primary mt-4"
            >
                🛒 Add to Cart
            </button>
        </div>
    );
};

export default ProductDetails;