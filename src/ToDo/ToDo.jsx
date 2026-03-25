// import { useNavigate } from "react-router-dom";
// import Swal from "sweetalert2";
// import useAxiosSecure from "../../hooks/useAxiosSecure";

// const AddAccount = () => {
//     const axiosSecure = useAxiosSecure();
//     const navigate = useNavigate();

//     const handleSubmit = async (e) => {
//         e.preventDefault();
//         const form = e.target;

//         const data = {
//             date: form.date.value,
//             expense: parseFloat(form.expense.value),
//             income: parseFloat(form.income.value),
//             loan: parseFloat(form.loan.value),
//             cash: parseFloat(form.cash.value),
//             stock: parseFloat(form.stock.value),
//         };

//         try {
//             await axiosSecure.post("/accounts", data);

//             Swal.fire({
//                 icon: "success",
//                 title: "Account Added!",
//                 timer: 1500,
//             });

//             form.reset();
//             navigate("/dashboard");
//         } catch (error) {
//             console.error(error);
//             Swal.fire("Error!", "Failed to add account", "error");
//         }
//     };

//     return (
//         <div className="p-6 max-w-xl mx-auto">
//             <h2 className="text-2xl font-bold mb-4">Add Account</h2>

//             <form onSubmit={handleSubmit} className="space-y-3">

//                 <input name="date" type="date" required className="input input-bordered w-full" />

//                 <input name="expense" type="number" placeholder="Expense" className="input input-bordered w-full" />

//                 <input name="income" type="number" placeholder="Income" className="input input-bordered w-full" />

//                 <input name="loan" type="number" placeholder="Loan" className="input input-bordered w-full" />

//                 <input name="cash" type="number" placeholder="Cash" className="input input-bordered w-full" />

//                 <input name="stock" type="number" placeholder="Stock" className="input input-bordered w-full" />

//                 <button className="btn btn-primary w-full">Add Account</button>
//             </form>
//         </div>
//     );
// };

// export default AddAccount;

// ************************************************************************************************************

// const SummaryCards = ({ data }) => {

//     const totalExpense = data.reduce((sum, item) => sum + (item.expense || 0), 0);
//     const totalIncome = data.reduce((sum, item) => sum + (item.income || 0), 0);
//     const totalCash = data.reduce((sum, item) => sum + (item.cash || 0), 0);

//     return (
//         <div className="grid grid-cols-1 md:grid-cols-3 gap-4">

//             <div className="bg-red-400 p-4 rounded text-white">
//                 <h3>Total Expense</h3>
//                 <p className="text-xl font-bold">{totalExpense}</p>
//             </div>

//             <div className="bg-green-400 p-4 rounded text-white">
//                 <h3>Total Income</h3>
//                 <p className="text-xl font-bold">{totalIncome}</p>
//             </div>

//             <div className="bg-blue-400 p-4 rounded text-white">
//                 <h3>Total Cash</h3>
//                 <p className="text-xl font-bold">{totalCash}</p>
//             </div>

//         </div>
//     );
// };

// export default SummaryCards;

// **************************************************************************************************************

// import { LineChart, Line, XAxis, YAxis, Tooltip, CartesianGrid } from "recharts";

// const Chart = ({ data }) => {
//     return (
//         <div className="mt-6 bg-white p-4 shadow rounded">
//             <h3 className="mb-3 font-bold">Income vs Expense</h3>

//             <LineChart width={600} height={300} data={data}>
//                 <CartesianGrid strokeDasharray="3 3" />
//                 <XAxis dataKey="date" />
//                 <YAxis />
//                 <Tooltip />
//                 <Line type="monotone" dataKey="income" stroke="#4CAF50" />
//                 <Line type="monotone" dataKey="expense" stroke="#F44336" />
//             </LineChart>
//         </div>
//     );
// };

// export default Chart;

// ************************************************************************************************

