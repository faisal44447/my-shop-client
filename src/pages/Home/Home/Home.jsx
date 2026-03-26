import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import useAxiosSecure from "../../hooks/useAxiosSecure";


const Home = () => {
    const axiosSecure = useAxiosSecure();
    const [products, setProducts] = useState([]);

    useEffect(() => {
        const loadProducts = async () => {
            try {
                const res = await axiosSecure.get("/products");
                setProducts(res.data);
            } catch (error) {
                console.log(error);
            }
        };

        loadProducts();
    }, [axiosSecure]);

    return (
        <div>

            <div className="p-6">
                <h2 className="text-2xl font-bold mb-4">Latest Jewellery</h2>

                <div className="grid md:grid-cols-3 gap-5">
                    {products.slice(0, 6).map(item => (
                        <div key={item._id} className="bg-white shadow rounded-xl p-4">

                            <img
                                src={item.image}
                                className="h-40 w-full object-cover rounded"
                            />

                            <h3 className="font-bold mt-2">{item.name}</h3>

                            <p>💰 {item.price} ৳</p>
                            <p>🟡 {item.carat} Carat</p>

                            <Link to={`/product/${item._id}`}>
                                <button className="btn btn-sm btn-primary mt-2">
                                    View Details
                                </button>
                            </Link>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Home;