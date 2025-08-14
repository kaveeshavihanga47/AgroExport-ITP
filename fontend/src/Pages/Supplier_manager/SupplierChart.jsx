import React from "react";
import { PieChart, Pie, Cell, Tooltip, Legend } from "recharts";

const SupplierChart = ({ suppliers }) => {
  const categoryData = suppliers.reduce((acc, supplier) => {
    const category = supplier.category;
    if (!acc[category]) {
      acc[category] = 0;
    }
    acc[category]++;
    return acc;
  }, {});

  const data = Object.keys(categoryData).map(category => ({
    name: category,
    value: categoryData[category],
  }));

  const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];

  return (
    <PieChart width={400} height={400}>
      <Pie
        data={data}
        cx={200}
        cy={200}
        labelLine={false}
        outerRadius={80}
        fill="#8884d8"
        dataKey="value"
        label
      >
        {data.map((entry, index) => (
          <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
        ))}
      </Pie>
      <Tooltip />
      <Legend />
    </PieChart>
  );
};

export default SupplierChart;
