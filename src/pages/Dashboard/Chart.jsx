import React from 'react';
import { Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis, CartesianGrid  } from 'recharts';

const Chart = ({ data }) => {
    return (
        <div className="bg-white p-5 rounded-xl shadow mt-6">
            <h2 className="text-xl mb-4 font-bold">Income vs Expense</h2>
            <ResponsiveContainer width="100%" height={300}>
                <LineChart data={data}> <CartesianGrid />
                    <XAxis dataKey="date" /> <YAxis />
                    <Tooltip />
                    <Line type="monotone" dataKey="income" />
                    <Line type="monotone" dataKey="expense" />
                </LineChart>
            </ResponsiveContainer>
        </div>
    );
};

export default Chart;

