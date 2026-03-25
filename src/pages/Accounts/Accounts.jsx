import { useEffect, useState } from "react";
import useAxiosSecure from "../hooks/useAxiosSecure";

const Accounts = () => {
    const [data, setData] = useState([]);
    const [selectedItem, setSelectedItem] = useState(null);
    const axiosSecure = useAxiosSecure();

    // load data
    const loadData = () => {
        axiosSecure.get("/accounts").then((res) => {
            setData(res.data);
        });
    };

    useEffect(() => {
        loadData();
    }, []);

    // delete
    const handleDelete = (id) => {
        axiosSecure.delete(`/accounts/${id}`).then(() => {
            loadData();
        });
    };

    // edit
    const handleEdit = (item) => {
        setSelectedItem(item);
    };

    // update
    const handleUpdate = (e) => {
        e.preventDefault();
        const form = e.target;

        const updatedData = {
            expense: parseFloat(form.expense.value),
            income: parseFloat(form.income.value),
            loan: parseFloat(form.loan.value),
            cash: parseFloat(form.cash.value),
            stock: parseFloat(form.stock.value),
        };

        axiosSecure
            .patch(`/accounts/${selectedItem._id}`, updatedData)
            .then(() => {
                setSelectedItem(null);
                loadData();
            });
    };

    return (
        <div>
            <h2 className="text-2xl font-bold mb-4">All Accounts</h2>

            <table className="table w-full">
                <thead>
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
                                    className="bg-red-500 px-2 text-white"
                                >
                                    Delete
                                </button>

                                <button
                                    onClick={() => handleEdit(item)}
                                    className="bg-blue-500 px-2 text-white"
                                >
                                    Edit
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>

            {/* EDIT FORM */}
            {selectedItem && (
                <form onSubmit={handleUpdate} className="mt-5 space-x-2">
                    <input name="expense" defaultValue={selectedItem.expense} />
                    <input name="income" defaultValue={selectedItem.income} />
                    <input name="loan" defaultValue={selectedItem.loan} />
                    <input name="cash" defaultValue={selectedItem.cash} />
                    <input name="stock" defaultValue={selectedItem.stock} />

                    <button className="bg-green-500 px-3 text-white">
                        Update
                    </button>
                </form>
            )}
        </div>
    );
};

export default Accounts;