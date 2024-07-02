import { JSONObject } from '@/lib/definations';
import React, { useCallback, useState } from 'react';
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  ResponsiveContainer,
  Legend,
  Sector,
} from 'recharts';

// // Sample aggregated data
// const data = [
//   {
//     year: 2023,
//     totalIncome: 7039,
//     totalExpense: 5534,
//     income: {
//       "Other ( Any other income sources not covered by the above categories. )": 39,
//       "Bonuses ( Extra income such as bonuses or incentives )": 200,
//       "Investments ( Income from investments such as dividends, interest, etc. )": 2300,
//       "Salary": 4500
//     },
//     expense: {
//       "Gifts & Donations": 120,
//       "Insurance": 2800,
//       "Entertainment": 940,
//       "Education": 500,
//       "Miscellaneous": 180,
//       "Personal Care ( Clothing, Haircuts, Gym, ... )": 680,
//       "Transportation": 314
//     }
//   }
// ];

// Colors for the pie chart segments
const COLORS = [
  '#FF6384', '#36A2EB', '#FFCE56', '#FF5733', '#33FF57', '#3357FF', '#F333FF', '#FF5733', '#FF8D33', '#33FFD7'
];

const renderActiveShape = (props: any) => {
    const RADIAN = Math.PI / 180;
    const {
      cx,
      cy,
      midAngle,
      innerRadius,
      outerRadius,
      startAngle,
      endAngle,
      fill,
      payload,
      percent,
      value
    } = props;
    const sin = Math.sin(-RADIAN * midAngle);
    const cos = Math.cos(-RADIAN * midAngle);
    const sx = cx + (outerRadius + 10) * cos;
    const sy = cy + (outerRadius + 10) * sin;
    const mx = cx + (outerRadius + 30) * cos;
    const my = cy + (outerRadius + 30) * sin;
    const ex = mx + (cos >= 0 ? 1 : -1) * 22;
    const ey = my;
    const textAnchor = cos >= 0 ? "start" : "end";
  
    return (
      <g>
        <text x={cx} y={cy} dy={8} textAnchor="middle" fill={fill}>
          {payload.name}
        </text>
        <Sector
          cx={cx}
          cy={cy}
          innerRadius={innerRadius}
          outerRadius={outerRadius}
          startAngle={startAngle}
          endAngle={endAngle}
          fill={fill}
        />
        <Sector
          cx={cx}
          cy={cy}
          startAngle={startAngle}
          endAngle={endAngle}
          innerRadius={outerRadius + 6}
          outerRadius={outerRadius + 10}
          fill={fill}
        />
        <path
          d={`M${sx},${sy}L${mx},${my}L${ex},${ey}`}
          stroke={fill}
          fill="none"
        />
        <circle cx={ex} cy={ey} r={2} fill={fill} stroke="none" />
        <text
          x={ex + (cos >= 0 ? 1 : -1) * 12}
          y={ey}
          textAnchor={textAnchor}
          fill="#333"
        >{`PV ${value}`}</text>
        <text
          x={ex + (cos >= 0 ? 1 : -1) * 12}
          y={ey}
          dy={18}
          textAnchor={textAnchor}
          fill="#999"
        >
          {`(Rate ${(percent * 100).toFixed(2)}%)`}
        </text>
      </g>
    );
  };
  
    
export default function CategoryExpensePieChart({data}) {
    const [activeIndex, setActiveIndex] = useState(0);
    const onPieEnter = useCallback(
      (_, index) => {
        setActiveIndex(index);
      },
      [setActiveIndex]
    );

    const transformData = (categories: JSONObject[]): JSONObject[] => {
        return categories.map((entry) => ({
          name: entry.category,
          value: entry.totalAmount,
        }));
      };


  
const transformedData = transformData(data.categories);

  return ( 
    <ResponsiveContainer width="100%" height={400}>
         <PieChart width={400} height={400}>
      <Pie
        activeIndex={activeIndex}
        activeShape={renderActiveShape}
        data={transformedData}
        cx={200}
        cy={200}
        innerRadius={70}
        outerRadius={100}
        fill="#8884d8"
        dataKey="value"
        onMouseEnter={onPieEnter}
      />
    </PieChart>



    {/* <PieChart>
      <Pie
        data={transformedData}
        dataKey="value"
        cx="50%"
        cy="50%"
        // labelLine={false}
        outerRadius={150}
        fill="#8884d8"
      >
        {transformedData.map((entry, index) => (
          <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
        ))}
      </Pie>
      <Tooltip />
      <Legend />
    </PieChart> */}
  </ResponsiveContainer>
  );
}