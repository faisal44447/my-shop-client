import { useEffect, useState } from "react";
import Swal from "sweetalert2";
import Chart from "./Chart";
import PieChartBox from "./PieChartBox";
import useAxiosSecure from "../hooks/useAxiosSecure";

import { FaEdit } from "react-icons/fa";
import { RiDeleteBinFill } from "react-icons/ri";

import * as XLSX from "xlsx";   // ✅ Excel
import { saveAs } from "file-saver"; // ✅ download

import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";

import SummaryCards from "./SummaryCards.jsx";

const Dashboard = () => {
    const axiosSecure = useAxiosSecure();

    const [data, setData] = useState([]);
    const [selectedItem, setSelectedItem] = useState(null);
    const [search, setSearch] = useState("");
    const [filter, setFilter] = useState("all");
    const [dark, setDark] = useState(false);

    // ✅ Load Data
    const loadData = async () => {
        const res = await axiosSecure.get("/accounts");
        setData(res.data);
    };

    useEffect(() => {
        loadData();
    }, []);

    // ✅ Delete
    const handleDelete = async (id) => {
        await axiosSecure.delete(`/accounts/${id}`);
        loadData();
    };

    // ✅ Edit
    const handleEdit = (item) => {
        setSelectedItem(item);
    };

    // ✅ Safe number
    const getValue = (value) => {
        return isNaN(value) || value === "" ? value : parseFloat(value);
    };

    // ✅ Update
    const handleUpdate = async (e) => {
        e.preventDefault();
        const form = e.target;

        const updatedData = {
            date: form.date.value,
            expense: getValue(form.expense.value),
            income: getValue(form.income.value),
            loan: getValue(form.loan.value),
            cash: getValue(form.cash.value),
            stock: getValue(form.stock.value),
        };

        await axiosSecure.patch(`/accounts/${selectedItem._id}`, updatedData);
        setSelectedItem(null);
        loadData();

        Swal.fire("Updated!", "", "success");
    };

    // ✅ Excel Export
    const exportToExcel = () => {
        const worksheet = XLSX.utils.json_to_sheet(data);
        const workbook = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(workbook, worksheet, "Accounts");

        const excelBuffer = XLSX.write(workbook, {
            bookType: "xlsx",
            type: "array",
        });

        const file = new Blob([excelBuffer], {
            type: "application/octet-stream",
        });

        saveAs(file, "accounts.xlsx");
    };

    // ✅ PDF Export (FIXED)
    const exportToPDF = () => {
        const doc = new jsPDF();

        doc.text("Accounts Report", 14, 10);

        const tableColumn = [
            "Date",
            "Expense",
            "Income",
            "Loan",
            "Cash",
            "Stock",
        ];

        const tableRows = data.map((item) => [
            new Date(item.date).toLocaleString(),
            item.expense,
            item.income,
            item.loan,
            item.cash,
            item.stock,
        ]);

        autoTable(doc, {
            head: [tableColumn],
            body: tableRows,
        });

        doc.save("accounts.pdf");
    };

    // ✅ Filter
    const filteredData = data.filter((item) => {
        const matchSearch =
            item.date?.includes(search) ||
            String(item.income).includes(search);

        const today = new Date().toDateString();
        const itemDate = new Date(item.date).toDateString();

        if (filter === "today") return itemDate === today;
        if (filter === "month") {
            return new Date(item.date).getMonth() === new Date().getMonth();
        }

        return matchSearch;
    });

    // ✅ Chart Data
    const chartData = filteredData.map((item) => ({
        ...item,
        income: Number(item.income) || 0,
        expense: Number(item.expense) || 0,
    }));

    return (
        <div className={dark ? "p-6 bg-black text-white min-h-screen" : "p-6"}>

            {/* 🔍 SEARCH + BUTTON */}
            <div className="flex gap-3 mb-4 flex-wrap">
                <input
                    type="text"
                    placeholder="Search..."
                    className="input input-bordered"
                    onChange={(e) => setSearch(e.target.value)}
                />

                <select
                    className="select select-bordered"
                    onChange={(e) => setFilter(e.target.value)}
                >
                    <option value="all">All</option>
                    <option value="today">Today</option>
                    <option value="month">This Month</option>
                </select>

                <button onClick={exportToExcel} className="btn btn-primary">
                    Excel
                </button>

                <button onClick={exportToPDF} className="btn btn-secondary">
                    PDF
                </button>

                <button
                    onClick={() => setDark(!dark)}
                    className="btn btn-outline"
                >
                    {dark ? "☀️ Light" : "🌙 Dark"}
                </button>
            </div>

            {/* Summary */}
            <SummaryCards data={chartData} />

            {/* Charts */}
            <div className="grid md:grid-cols-2 gap-6">
                <Chart data={chartData} />
                <PieChartBox data={chartData} />
            </div>

            {/* Table */}
            <div className={`overflow-x-auto mt-6 shadow rounded-xl ${dark ? "bg-gray-800" : "bg-white"}`}>
                <table className="table table-zebra">
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
                        {filteredData.map((item) => (
                            <tr key={item._id}>
                                <td>{new Date(item.date).toLocaleString()}</td>
                                <td>{item.expense}</td>
                                <td>{item.income}</td>
                                <td>{item.loan}</td>
                                <td>{item.cash}</td>
                                <td>{item.stock}</td>

                                <td className="flex gap-2">
                                    <button
                                        onClick={() => handleDelete(item._id)}
                                        className="btn btn-error btn-sm"
                                    >
                                        <RiDeleteBinFill />
                                    </button>

                                    <button
                                        onClick={() => handleEdit(item)}
                                        className="btn btn-info btn-sm"
                                    >
                                        <FaEdit />
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {/* Edit Form */}
            {selectedItem && (
                <form onSubmit={handleUpdate} className="mt-6 space-x-2">
                    <input
                        name="date"
                        type="datetime-local"
                        defaultValue={selectedItem.date?.slice(0, 16)}
                        className="input input-bordered"
                    />

                    <input name="expense" defaultValue={selectedItem.expense} className="input input-bordered" />
                    <input name="income" defaultValue={selectedItem.income} className="input input-bordered" />
                    <input name="loan" defaultValue={selectedItem.loan} className="input input-bordered" />
                    <input name="cash" defaultValue={selectedItem.cash} className="input input-bordered" />
                    <input name="stock" defaultValue={selectedItem.stock} className="input input-bordered" />

                    <button className="btn btn-success">Update</button>
                </form>
            )}
        </div>
    );
};

export default Dashboard;