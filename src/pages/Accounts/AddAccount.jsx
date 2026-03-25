import useAxiosSecure from "../hooks/useAxiosSecure";

const AddAccount = () => {
    const axiosSecure = useAxiosSecure();

    const handleSubmit = (e) => {
        e.preventDefault();
        const form = e.target;

        // function: text + number handle
        const getValue = (value) => {
            return isNaN(value) || value === "" ? value : parseFloat(value);
        };

        const data = {
            date: form.date.value,
            expense: getValue(form.expense.value),
            income: getValue(form.income.value),
            loan: getValue(form.loan.value),
            cash: getValue(form.cash.value),
            stock: getValue(form.stock.value),
        };

        axiosSecure.post("/accounts", data).then(() => {
            alert("Added!");
            form.reset();
        });
    };

    return (
        <div>
            <h2 className="text-4xl text-center font-bold my-5">
                Add Account
            </h2>

            <form
                onSubmit={handleSubmit}
                className="space-y-3 grid grid-cols-1 border-4 border-black rounded-lg shadow-lg p-5 mx-auto w-1/2"
            >
                <input
                    className="input input-bordered text-center"
                    name="date"
                    type="datetime-local"
                    required
                />

                <input
                    className="input input-bordered text-center"
                    name="expense"
                    type="text"
                    placeholder="Expense - খরচ"
                />

                <input
                    className="input input-bordered text-center"
                    name="income"
                    type="text"
                    placeholder="Income - আয়"
                />

                <input
                    className="input input-bordered text-center"
                    name="loan"
                    type="text"
                    placeholder="Loan - ঋণ"
                />

                <input
                    className="input input-bordered text-center"
                    name="cash"
                    type="text"
                    placeholder="Cash - নগদ টাকা"
                />

                <input
                    className="input input-bordered text-center"
                    name="stock"
                    type="text"
                    placeholder="Stock - মজুদ"
                />

                <button className="btn btn-success">
                    Add
                </button>
            </form>
        </div>
    );
};

export default AddAccount;