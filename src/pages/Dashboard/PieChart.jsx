import { PieChart, Pie, Cell, Tooltip } from "recharts";

const PieChartBox = ({ data }) => {
    const totalIncome = data.reduce((sum, i) => sum + (Number(i.income) || 0), 0);
    const totalExpense = data.reduce((sum, i) => sum + (Number(i.expense) || 0), 0);

    const chartData = [
        { name: "Income", value: totalIncome },
        { name: "Expense", value: totalExpense },
    ];

    return (
        <PieChart width={300} height={300}>
            <Pie data={chartData} dataKey="value">
                <Cell fill="#16a34a" />
                <Cell fill="#dc2626" />
            </Pie>
            <Tooltip />
        </PieChart>
    );
};

export default PieChartBox;