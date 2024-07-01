// category-vise-expense-report

import { JSONObject } from '@/lib/definations';
import React from 'react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer
} from 'recharts';

// // Sample aggregated data
// const data1 = [
//   {
//     year: 2023,
//     totalIncome: 7039,
//     totalExpense: 5534,
//     income: {
//       "Other ( Any other income sources not covered by the above categories. )": 39,
//       "Bonuses ( Extra income such as bonuses or incentives )": 200,
//       "Investments ( Income from investments such as dividends, interest, etc. )": 2300,
//       "Salary": 4500,
//     },
//     expense: {
//       "Gifts & Donations": 120,
//       "Insurance": 2800,
//       "Entertainment": 940,
//       "Education": 500,
//       "Miscellaneous": 180,
//       "Personal Care ( Clothing, Haircuts, Gym, ... )": 680,
//       "Transportation": 314,
//     },
//   },
//   // More yearly data
// ];


export default function CategoryExpenseBarChart({data}) {
    
    const transformData = (categories: JSONObject): JSONObject[] => {
        return categories.map((entry) => ({
          category: entry.category,
          totalAmount: entry.totalAmount,
        }));
      };


  
const transformedData = transformData(data.categories);
console.log(transformedData);

  return ( <ResponsiveContainer width="100%" height={500}>
    <BarChart data={transformedData} 
    margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
      <CartesianGrid strokeDasharray="3 3" />
      <XAxis 
				dataKey="category" 
				interval={0}
				angle={-45}
				textAnchor="end"
				tick={{ fontSize: 12 }}
			/>
      <YAxis />
      <Tooltip />
      <Legend />
      <Bar dataKey="totalAmount" fill="#8884d8" />
    </BarChart>
  </ResponsiveContainer> )
}