import Swal from "sweetalert2";
import useAxiosSecure from "../hooks/useAxiosSecure";

const AddProduct = () => {
    const axiosSecure = useAxiosSecure();

    const handleSubmit = (e) => {
        e.preventDefault();
        const form = e.target;

        const product = {
            name: form.name.value,
            image: form.image.value,
            price: form.price.value,
            carat: form.carat.value,
        };

        axiosSecure.post("/products", product).then(() => {
            Swal.fire("Added!", "Product added successfully", "success");
            form.reset();
        });
    };

    return (
        <div className="border border-4 border-black m-5 p-4 rounded-lg shadow-xl">
            <h2 className="font-bold text-3xl text-center mx-auto my-5">Add Product</h2>
            <form onSubmit={handleSubmit} className="p-6 space-y-3">
                <input name="name" placeholder="Name" className="input input-bordered w-full" />
                <input name="image" placeholder="Image URL" className="input input-bordered w-full" />
                <input name="price" placeholder="Price" className="input input-bordered w-full" />
                <input name="carat" placeholder="Carat (18k/22k)" className="input input-bordered w-full" />

                <button className="btn btn-primary w-full">Add Product</button>
            </form>
        </div>
    );
};

export default AddProduct;