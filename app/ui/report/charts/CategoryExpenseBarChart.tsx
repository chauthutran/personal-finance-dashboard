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
import * as ReportService from "@/lib/services/reportService";
import * as Utils from "@/lib/utils";

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
    
    /**
    # The transformed data should be in the format suitable for a bar chart:
    # {
    #     "Miscellaneous": {2023: 180, 2024: 180},
    #     "Entertainment": {2023: 940, 2024: 940},
    #     "Education": {2023: 500, 2024: 500},
    # ...
    # }
    */
    const transformData = (): JSONObject[] => {

        let result: JSONObject[] = [];
        // return categories.map((entry) => ({
        //   category: entry.category,
        //   totalAmount: entry.totalAmount,
        // }));

        for( let i=0; i<data.length; i++ ) {
            const yearData = data[i];

            const year = yearData.year;
            const categories = yearData.categories;

            for( let j=0; j<categories.length; j++ ) {
                const categoryData = categories[j];
                const categoryName = categoryData.category;
                const totalAmount = categoryData.totalAmount;
                
                let found = Utils.findItemFromList(result, categoryName, "category");
                if( found === null ){
                    var item: JSONObject = {};
                    item.category = categoryName;
                    item[year] = totalAmount;
                    result.push(item);
                }
                else {
                    found[year] = totalAmount;
                }
                
                // result[categoryName][year] = totalAmount;
            }
        }

        return result;
    };

    const transformedData = transformData();
    const years = data.map((item) => item.year);
//     const chartData = years.map(year => {
//         const entry: { [key: string]: number } = { year };
//         Object.keys(transformedData).forEach(category => {
//           entry[category] = transformedData[category][year] || 0;
//         });
//         return entry;
//       })
  
console.log(" ---------------------- transformedData: ");
console.log(years);

function getRandomColor() {
    const letters = '0123456789ABCDEF';
    let color = '#';
    for (let i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
  }

  return ( <ResponsiveContainer width="100%" height={500}>
    {/* <BarChart
      width={500}
      height={300}
      data={transformedData}
      margin={{
        top: 20, right: 30, left: 20, bottom: 5,
      }}
    >
      <CartesianGrid strokeDasharray="3 3" />
      <XAxis dataKey="category" />
      <YAxis />
      <Tooltip />
      <Legend />
      {Object.keys(transformedData).map((category, index) => ( 
        <Bar key={category} dataKey={category} fill={ReportService.expenseColors[index % ReportService.COLORS.length]} />
      ))}
    </BarChart> */}
     <BarChart
      width={1000}
      height={600}
      data={transformedData}
      margin={{
        top: 20, right: 30, left: 20, bottom: 5,
      }}
    >
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
      {years.map((year, index) => ( 
        <Bar key={year} dataKey={year} fill={ReportService.expenseColors[index % ReportService.expenseColors.length]} />
      ))}

    </BarChart>
  </ResponsiveContainer> )
}