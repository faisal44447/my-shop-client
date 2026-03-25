import { useEffect, useState } from "react";
import Swal from "sweetalert2";
import useAxiosSecure from "../hooks/useAxiosSecure";
import { Link } from "react-router-dom";

const Products = () => {
    const axiosSecure = useAxiosSecure();
    const [products, setProducts] = useState([]);
    const [editItem, setEditItem] = useState(null);

    const loadData = async () => {
        const res = await axiosSecure.get("/products");
        setProducts(res.data);
    };

    useEffect(() => {
        loadData();
    }, []);

    // DELETE
    const handleDelete = (id) => {
        Swal.fire({
            title: "Are you sure?",
            icon: "warning",
            showCancelButton: true,
        }).then(async (result) => {
            if (result.isConfirmed) {
                await axiosSecure.delete(`/products/${id}`);
                loadData();

                Swal.fire("Deleted!", "", "success");
            }
        });
    };

    // UPDATE
    const handleUpdate = async (e) => {
        e.preventDefault();
        const form = e.target;

        const updated = {
            name: form.name.value,
            price: form.price.value,
            carat: form.carat.value,
        };

        await axiosSecure.patch(`/products/${editItem._id}`, updated);

        setEditItem(null);
        loadData();

        Swal.fire("Updated!", "", "success");
    };

    return (
        <div className="p-4 border border-4 rounded-lg shadow-lg">

            <h2 className="text-3xl font-bold my-4 text-center">Products</h2>

            {/* Cards */}
            <div className="grid md:grid-cols-3 gap-5">
                {products.map(item => (
                    <div key={item._id} className="bg-white shadow rounded-xl p-4">

                        <div className="h-40 w-full bg-gray-100 flex items-center justify-center rounded">
                            <img
                                src={item.image}
                                className="h-full object-contain"
                            />
                        </div>
                        <h3 className="text-lg text-center font-bold mt-2">{item.name}</h3>

                        <p className="text-center">💰 {item.price} ৳</p>
                        <p className="text-center">🟡 {item.carat}</p>
                        <p className="text-sm mx-auto items-center justify-center text-center text-gray-500">
                            {new Date(item.createdAt).toLocaleString()}
                        </p>

                        <div className="flex mx-auto items-center justify-center gap-2 mt-3">

                            <Link to={`/product/${item._id}`}>
                                <button className="btn btn-sm btn-primary">
                                    Details
                                </button>
                            </Link>

                            <button
                                onClick={() => setEditItem(item)}
                                className="btn btn-sm btn-info"
                            >
                                Edit
                            </button>

                            <button
                                onClick={() => handleDelete(item._id)}
                                className="btn btn-sm btn-error"
                            >
                                Delete
                            </button>
                        </div>
                    </div>
                ))}
            </div>

            {/* EDIT FORM */}
            {editItem && (
                <form onSubmit={handleUpdate} className="mt-6 space-x-2">

                    <input name="name" defaultValue={editItem.name} className="input input-bordered" />

                    <input name="price" defaultValue={editItem.price} className="input input-bordered" />

                    <select name="carat" defaultValue={editItem.carat} className="select select-bordered">
                        <option value="18K">18K</option>
                        <option value="22K">22K</option>
                        <option value="24K">24K</option>
                    </select>

                    <button className="btn btn-success">Update</button>
                </form>
            )}
        </div>
    );
};

export default Products;