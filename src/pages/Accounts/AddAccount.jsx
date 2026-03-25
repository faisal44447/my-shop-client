import useAxiosSecure from "../hooks/useAxiosSecure";

const AddAccount = () => {
    const axiosSecure = useAxiosSecure();

    const handleSubmit = (e) => {
        e.preventDefault();
        const form = e.target;

        const data = {
            date: form.date.value,
            expense: parseFloat(form.expense.value),
            income: parseFloat(form.income.value),
            loan: parseFloat(form.loan.value),
            cash: parseFloat(form.cash.value),
            stock: parseFloat(form.stock.value),
        };

        axiosSecure.post("/accounts", data).then(() => {
            alert("Added!");
            form.reset();
        });
    };

    return (
        <div>
            <h2 className="text-2xl mb-4">Add Account</h2>

            <form onSubmit={handleSubmit} className="space-y-2">
                <input name="date" type="date" required />
                <input name="expense" type="number" placeholder="Expense" />
                <input name="income" type="number" placeholder="Income" />
                <input name="loan" type="number" placeholder="Loan" />
                <input name="cash" type="number" placeholder="Cash" />
                <input name="stock" type="number" placeholder="Stock" />

                <button className="bg-green-500 px-3 text-white">
                    Add
                </button>
            </form>
        </div>
    );
};

export default AddAccount;