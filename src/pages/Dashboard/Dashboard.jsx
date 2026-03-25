import { useEffect, useState } from "react";
import Swal from "sweetalert2";
import SummaryCards from "./SummaryCards.jsx";
import Chart from "./Chart.jsx";
import useAxiosSecure from "../hooks/useAxiosSecure.jsx";

const Dashboard = () => {
    const axiosSecure = useAxiosSecure();

    const [data, setData] = useState([]);
    const [selectedItem, setSelectedItem] = useState(null);
    const [loading, setLoading] = useState(true);

    // ✅ Load Data
    const loadData = async () => {
        try {
            setLoading(true);
            const res = await axiosSecure.get("/accounts");
            setData(res.data);
        } catch (error) {
            console.error(error);
            Swal.fire("Error!", "Failed to load data", "error");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        loadData();
    }, []);

    // ✅ DELETE
    const handleDelete = (id) => {
        Swal.fire({
            title: "Are you sure?",
            text: "This will delete the data!",
            icon: "warning",
            showCancelButton: true,
        }).then(async (result) => {
            if (result.isConfirmed) {
                await axiosSecure.delete(`/accounts/${id}`);
                loadData();
                Swal.fire("Deleted!", "Data deleted", "success");
            }
        });
    };

    // ✅ EDIT
    const handleEdit = (item) => {
        setSelectedItem(item);
    };

    // ✅ UPDATE
    const handleUpdate = async (e) => {
        e.preventDefault();
        const form = e.target;

        const updatedData = {
            expense: parseFloat(form.expense.value),
            income: parseFloat(form.income.value),
            loan: parseFloat(form.loan.value),
            cash: parseFloat(form.cash.value),
            stock: parseFloat(form.stock.value),
        };

        try {
            await axiosSecure.patch(`/accounts/${selectedItem._id}`, updatedData);
            setSelectedItem(null);
            loadData();

            Swal.fire({
                icon: "success",
                title: "Updated Successfully",
                timer: 1500,
            });
        } catch (error) {
            console.error(error);
            Swal.fire("Error!", "Update failed", "error");
        }
    };

    // ✅ Loading
    if (loading) {
        return <p className="text-center mt-10 text-xl">Loading...</p>;
    }

    return (
        <div className="p-6">

            {/* Summary */}
            <SummaryCards data={data} />

            {/* Chart */}
            <Chart data={data} />

            {/* No Data */}
            {data.length === 0 && (
                <p className="text-center mt-5 text-gray-500">
                    No Data Found
                </p>
            )}

            {/* Table */}
            <div className="overflow-x-auto bg-white shadow rounded-xl mt-6">
                <table className="table w-full">
                    <thead className="bg-gray-200">
                        <tr>
                            <th>Date</th>
                            <th>Expense</th>
                            <th>Income</th>
                            <th>Loan</th>
                            <th>Cash</th>
                            <th>Stock</th>
                            <th>Action</th>
                        </tr>
                    </thead>

                    <tbody>
                        {data.map((item) => (
                            <tr key={item._id}>
                                <td>{item.date}</td>
                                <td>{item.expense}</td>
                                <td>{item.income}</td>
                                <td>{item.loan}</td>
                                <td>{item.cash}</td>
                                <td>{item.stock}</td>
                                <td className="flex gap-2">
                                    <button
                                        onClick={() => handleDelete(item._id)}
                                        className="btn btn-sm btn-error"
                                    >
                                        Delete
                                    </button>

                                    <button
                                        onClick={() => handleEdit(item)}
                                        className="btn btn-sm btn-info"
                                    >
                                        Edit
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {/* ✅ EDIT FORM */}
            {selectedItem && (
                <form
                    onSubmit={handleUpdate}
                    className="mt-6 bg-white p-4 shadow rounded"
                >
                    <h3 className="text-lg font-bold mb-3">Edit Data</h3>

                    <input
                        name="expense"
                        defaultValue={selectedItem.expense}
                        className="input input-bordered mr-2"
                    />
                    <input
                        name="income"
                        defaultValue={selectedItem.income}
                        className="input input-bordered mr-2"
                    />
                    <input
                        name="loan"
                        defaultValue={selectedItem.loan}
                        className="input input-bordered mr-2"
                    />
                    <input
                        name="cash"
                        defaultValue={selectedItem.cash}
                        className="input input-bordered mr-2"
                    />
                    <input
                        name="stock"
                        defaultValue={selectedItem.stock}
                        className="input input-bordered mr-2"
                    />

                    <button className="btn btn-primary mt-2">
                        Update
                    </button>
                </form>
            )}
        </div>
    );
};

export default Dashboard;