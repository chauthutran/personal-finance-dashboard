"use client";

import React, { useState } from 'react';
import { DateRangePicker } from 'react-date-range';
import 'react-date-range/dist/styles.css'; // main style file
import 'react-date-range/dist/theme/default.css'; // theme css file
import { useAuth } from '@/contexts/AuthContext';
import * as Utils from "@/lib/utils";
import DatePicker from 'react-datepicker';
import * as Constant from "@/lib/constants";
import * as ReportService from "@/lib/services/reportService";
import { JSONObject } from '@/lib/definations';
import IncomeVsExpenseBarChart from '../report/incomeVsExpenseReport/IncomeVsExpenseBarChart';
import { useCategory } from '@/contexts/CategoryContext';


export default function DashboardPage() {

	const { user } = useAuth();
    const { expenseList, incomeList } = useCategory();
    const [requestToUpdate, setRequestToUpdate] = useState<number>(0);
	const [incomeVsExpenseChartData, setIncomeVsExpenseChartData] = useState<JSONObject | JSONObject[]>({});

    const getDateRange = (): JSONObject => {
        const curYear = new Date().getFullYear();

        return {
            startDate: `${curYear}-01-01T00:00:00`,
            endDate: `${curYear}-12-31T00:00:00`,
            year: curYear
        }
    }

    const handleUpdateChart = () => {
        let count = requestToUpdate + 1;
        setRequestToUpdate( count );
    }
    
    const generateIncomeVsExpenseReport = async() => {
        const curYear = new Date().getFullYear();

		const urlPath = "income-vs-expense";
		const payload = {
			userId: user!._id,
			startDate: dateRange.startDate,
			endDate: dateRange.endDate,
			periodType: Constant.REPORT_PERIOD_TYPE_MONTHLY
		}

		const tempChartData = await ReportService.retrieveAggregateData(urlPath, payload);

		if (tempChartData.errMsg === undefined) {
			setIncomeVsExpenseChartData(tempChartData);
		}
		else {
			// Show error message here
		}
	}

    const dateRange: JSONObject = getDateRange();

    return (
        <div className="container p-4">
            <div className="container mx-auto p-4">
                <h1 className="text-2xl font-bold mb-4">Dashboard</h1>
                
                <div className="bg-white shadow-md rounded-lg p-4 mb-6">
                    <h2 className="text-xl font-semibold mb-4">Income vs Expense Report</h2>
                    <IncomeVsExpenseBarChart data={incomeVsExpenseChartData} 
                        startDate={dateRange.startDate} 
                        endDate={dateRange.endDate} 
                        periodType={Constant.REPORT_PERIOD_TYPE_MONTHLY} 
                        categoryExpenseList={expenseList}
                        categoryIncomeList={incomeList} />
                </div>


                <div className="grid grid-cols-2 gap-4">
                    <div className="bg-white rounded-lg p-4 shadow-md">
                        {/* <CategoryWiseExppenseChart 
                            userId={user!._id} 
                            startDate={Utils.formatDate(startDate!.toISOString())} 
                            endDate={Utils.formatDate(endDate!.toISOString())} 
                            requestToUpdate={requestToUpdate} /> */}
                    </div>
                
                    <div className="bg-white rounded-lg p-4 shadow-md">
                        <h2 className="text-xl font-bold mb-4">Chart 2</h2>
                        {/* <ResponsiveContainer width="100%" height={300}>
                    <LineChart data={chartData2}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="date" />
                        <YAxis />
                        <Tooltip />
                        <Legend />
                        <Line type="monotone" dataKey="value" stroke="#8884d8" />
                    </LineChart>
                    </ResponsiveContainer> */}
                    </div>

                </div>
            </div>
        </div>
    );
};