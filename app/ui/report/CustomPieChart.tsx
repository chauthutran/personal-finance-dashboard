import { JSONObject } from "@/lib/definations";
import { Cell, Legend, Pie, PieChart, Tooltip } from "recharts";
import * as ReportService from "@/lib/services/reportService";
import { useEffect } from "react";

export default function CustomPieChart({ expenseData, incomeData, budgetData, requestToUpdate = 0 }: { expenseData: JSONObject[] | undefined, incomeData: JSONObject[] | undefined, budgetData: JSONObject[] | undefined, requestToUpdate: number }) {

    useEffect(() => {
        console.log("Rending pie chart again");
    }, [requestToUpdate]);


    return (
        <>
        <PieChart width={1000} height={400}>
            {expenseData !== undefined &&
                <Pie
                    // isAnimationActive={false}
                    data={expenseData}
                    dataKey="totalAmount" 
                    cx="50%" cy="50%"
                    outerRadius={60}
                    fill="#8884d8"
                    
                    >
                    {/* {expenseData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={ReportService.COLORS[index % ReportService.COLORS.length]}>
                        </Cell>
                    ))} */}
                </Pie>}

                {expenseData !== undefined &&
                <Pie
                    // isAnimationActive={false}
                    data={expenseData}
                    dataKey="totalAmount" 
                    cx="50%" cy="50%"
                    innerRadius={70}
                    outerRadius={90}
                    label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`} 
                    fill="#88edd8" >
                    {expenseData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={ReportService.COLORS[index % ReportService.COLORS.length]}>
                        </Cell>
                    ))}
                </Pie>}

            {incomeData !== undefined &&
                <Pie
                    // isAnimationActive={false}
                    data={incomeData}
                    dataKey="totalAmount" 
                    cx="50%" cy="50%"
                    innerRadius={70}
                    outerRadius={90}
                    label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`} 
                    fill="#88edd8" >
                    {incomeData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={ReportService.COLORS[index % ReportService.COLORS.length]}>
                        </Cell>
                    ))}
                </Pie>}

            {budgetData !== undefined &&
                <Pie
                    data={budgetData}
                    dataKey="totalAmount"
                    cx="50%" cy="50%"
                    // cx={500} cy={200}
                    innerRadius={70}
                    outerRadius={90}
                    fill="#82ca9d"
                    // label
                    label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                >
                    {budgetData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={ReportService.COLORS[index % ReportService.COLORS.length]}>
                        </Cell>
                    ))}
                </Pie>
            }


            <Tooltip />

            <Legend
                // layout="vertical"
                // align="right"
                // verticalAlign="top"
                wrapperStyle={{ paddingLeft: '100px', paddingRight: '5px' }}
            />

        </PieChart>
        </>
    )
}