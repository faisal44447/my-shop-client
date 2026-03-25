import React from 'react';

const SummaryCards = ({ data }) => {

    const totalIncome = data?.reduce((sum, item) => sum + (item.income || 0), 0);
    const totalExpense = data?.reduce((sum, item) => sum + (item.expense || 0), 0);
    const profit = totalIncome - totalExpense;

    return (
        <div className="grid md:grid-cols-3 gap-6 mb-6">

            <div className="bg-green-500 text-white p-5 rounded-xl shadow">
                <h2 className="text-xl">Total Income</h2>
                <p className="text-2xl font-bold">৳ {totalIncome}</p>
            </div>

            <div className="bg-red-500 text-white p-5 rounded-xl shadow">
                <h2 className="text-xl">Total Expense</h2>
                <p className="text-2xl font-bold">৳ {totalExpense}</p>
            </div>

            <div className="bg-blue-500 text-white p-5 rounded-xl shadow">
                <h2 className="text-xl">Profit / Loss</h2>
                <p className="text-2xl font-bold">৳ {profit}</p>
            </div>

        </div>
    );
};

export default SummaryCards;