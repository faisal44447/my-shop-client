import { useEffect, useState } from "react";
import useAxiosSecure from "../hooks/useAxiosSecure";
import { RiDeleteBinFill } from "react-icons/ri";
import { FaEdit } from "react-icons/fa";
import { MdBrowserUpdated } from "react-icons/md";



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

    // 🔥 function: text + number support
    const getValue = (value) => {
        return isNaN(value) || value === "" ? value : parseFloat(value);
    };

    // update
    const handleUpdate = (e) => {
        e.preventDefault();
        const form = e.target;

        const updatedData = {
            expense: getValue(form.expense.value),
            income: getValue(form.income.value),
            loan: getValue(form.loan.value),
            cash: getValue(form.cash.value),
            stock: getValue(form.stock.value),
        };

        axiosSecure
            .patch(`/accounts/${selectedItem._id}`, updatedData)
            .then(() => {
                setSelectedItem(null);
                loadData();
            });
    };

    return (
        <div className="p-4">
            <h2 className="text-2xl font-bold mb-4">All Accounts</h2>

            <div className="overflow-x-auto">
                <table className="table table-xs table-zebra">
                    <thead>
                        <tr>
                            <th>তারিখ</th>
                            <th>খরচ</th>
                            <th>আয়</th>
                            <th>ঋণ</th>
                            <th>নগদ</th>
                            <th>মজুদ</th>
                            <th>করণীয়</th>
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
                                        className="btn btn-xs btn-error"
                                    >
                                        <RiDeleteBinFill />
                                    </button>

                                    <button
                                        onClick={() => handleEdit(item)}
                                        className="btn btn-xs btn-info"
                                    >
                                        <FaEdit />
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {/* EDIT FORM */}
            {selectedItem && (
                <form
                    onSubmit={handleUpdate}
                    className="mt-6 flex flex-wrap gap-2"
                >
                    <input
                        className="input input-bordered input-sm"
                        name="expense"
                        defaultValue={selectedItem.expense}
                    />
                    <input
                        className="input input-bordered input-sm"
                        name="income"
                        defaultValue={selectedItem.income}
                    />
                    <input
                        className="input input-bordered input-sm"
                        name="loan"
                        defaultValue={selectedItem.loan}
                    />
                    <input
                        className="input input-bordered input-sm"
                        name="cash"
                        defaultValue={selectedItem.cash}
                    />
                    <input
                        className="input input-bordered input-sm"
                        name="stock"
                        defaultValue={selectedItem.stock}
                    />

                    <button className="btn btn-success btn-sm">
                        <MdBrowserUpdated />
                    </button>
                </form>
            )}
        </div>
    );
};

export default Accounts;