import React, { useState } from "react";
import {
  Bar,
  BarChart,
  CartesianGrid,
  XAxis,
  YAxis,
} from "recharts";
import {
  PieChart,
  Pie,
  Tooltip,
  Legend,
  Cell,
  ResponsiveContainer,
} from "recharts";
const renderCustomizedLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, percent, value }) => {
  const RADIAN = Math.PI / 180;
  const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
  const x = cx + radius * Math.cos(-midAngle * RADIAN);
  const y = cy + radius * Math.sin(-midAngle * RADIAN);

  return (
    <text x={x} y={y} fill="#fff" textAnchor="middle" dominantBaseline="central">
      {value}
    </text>
  );
};


export const Chart = ({ data }) => {
  return (
    <ResponsiveContainer width={"100%"} height={400}>
      <BarChart width={150} height={40} data={data}>
        <XAxis dataKey='name' tickFormatter={(value) => value.charAt(0).toUpperCase() + value.slice(1)} />
        <YAxis />
        <Tooltip
          cursor={false}
          contentStyle={{ textTransform: "capitalize" }}
        />
        <CartesianGrid strokeDasharray='3 3' />
        <Bar dataKey='total' fill='#0000FF' />
      </BarChart>
    </ResponsiveContainer>
  );
};


const PieApp = ({ data }) => {
  const COLORS = ["#0088FE", "#00C49F", "#FFBB28"];

  return (
    <ResponsiveContainer width="100%" height={400}>
      <PieChart>
        <Pie
          data={data}
          dataKey="value"
          nameKey="name"
          cx="50%"
          cy="50%"
          outerRadius={120}
          labelLine={false}     // remove long annoying label line
          label={renderCustomizedLabel} // <— custom centered label
        >
          {data.map((entry, index) => (
            <Cell key={index} fill={COLORS[index % COLORS.length]} />
          ))}
        </Pie>

        <Tooltip />
        <Legend formatter={(value) => value.charAt(0).toUpperCase() + value.slice(1)}/>
      </PieChart>
    </ResponsiveContainer>
  );
};


export default PieApp;

// const PieApp = () => {
//     const [activeIndex, setActiveIndex] = useState(-1);

//     const data = [
//         { name: 'Geeksforgeeks', students: 400 },
//         { name: 'Technical scripter', students: 700 },
//         { name: 'Geek-i-knack', students: 200 },
//         { name: 'Geek-o-mania', students: 1000 }
//     ];

//     const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];

//     const onPieEnter = (_, index) => {
//         setActiveIndex(index);
//     };

//     return (
//         <PieChart width={700} height={700}>
//             <Pie
//                 activeIndex={activeIndex}
//                 data={data}
//                 dataKey="students"
//                 outerRadius={250}
//                 fill="green"
//                 onMouseEnter={onPieEnter}
//                 style={{ cursor: 'pointer', outline: 'none' }} // Ensure no outline on focus
//             >
//                 {data.map((entry, index) => (
//                     <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
//                 ))}
//             </Pie>
//             <Tooltip />
//         </PieChart>
//     );
// }

// export default PieApp;

// const COLORS = ["#0088FE", "#FFBB28", "#00C49F"];

// export const StatusPieChart = ({ data }) => {
//   if (!data) return null; // SAME as priority chart

//   console.log("STAGE DATA:", data); 
//   // data = { todo: 3, "in progress": 5, completed: 2 }

//   // Convert stage object into pie-chart format
//   const chartData = [
//     { name: "Todo", value: data.todo || 0 },
//     { name: "In Progress", value: data["in progress"] || 0 },
//     { name: "Completed", value: data.completed || 0 },
//   ];

//   return (
//     <ResponsiveContainer width="100%" height={350}>
//       <PieChart>
//         <Pie
//           data={chartData}
//           cx="50%"
//           cy="50%"
//           outerRadius={120}
//           dataKey="value"
//           nameKey="name"
//           label
//         >
//           {chartData.map((entry, index) => (
//             <Cell key={index} fill={COLORS[index]} />
//           ))}
//         </Pie>

//         <Tooltip />
//         <Legend />
//       </PieChart>
//     </ResponsiveContainer>
//   );
// };