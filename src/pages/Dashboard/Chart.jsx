import {
    LineChart,
    Line,
    XAxis,
    YAxis,
    Tooltip,
    CartesianGrid,
    ResponsiveContainer,
} from "recharts";

const Chart = ({ data }) => {
    return (
        <div className="bg-white p-5 rounded-xl shadow mt-6">
            <h2 className="text-xl font-bold mb-4">
                Financial Overview
            </h2>

            <ResponsiveContainer width="100%" height={300}>
                <LineChart data={data}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="date" />
                    <YAxis />
                    <Tooltip />

                    <Line type="monotone" dataKey="income" stroke="#16a34a" />
                    <Line type="monotone" dataKey="expense" stroke="#dc2626" />
                    <Line type="monotone" dataKey="cash" stroke="#2563eb" />
                </LineChart>
            </ResponsiveContainer>
        </div>
    );
};

export default Chart;

