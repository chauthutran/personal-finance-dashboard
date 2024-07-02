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
// const data = [
//     { category: "Miscellaneous", 2023: 180, 2024: 180 },
//     { category: "Entertainment", 2023: 940, 2024: 940 },
//     { category: "Education", 2023: 500, 2024: 500 },
//     ...
// ];


export default function CategoryExpenseBarChart({ data, years }) {

    return (
        <ResponsiveContainer width="100%" height={500}>
            <BarChart
                width={1000}
                height={600}
                data={data}
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
                <Legend wrapperStyle={{paddingTop: "50px"}}/>
                {years.map((year, index) => (
                    <Bar key={year} dataKey={year} fill={ReportService.expenseColors[index % ReportService.expenseColors.length]} />
                ))}

            </BarChart>
        </ResponsiveContainer>)
}