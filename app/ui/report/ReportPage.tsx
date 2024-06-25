import React, { useState, useEffect } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { useAuth } from '@/contexts/AuthContext';
import { JSONObject } from '@/lib/definations';
import * as Constant from "@/lib/constants";
import * as Utils from "@/lib/utils";
import * as ReportService from "@/lib/services/reportService";
import { Cell, Pie, PieChart } from 'recharts';


export default function ReportPage() {
	
	const { user } = useAuth();

	const [reportType, setReportType] = useState("");
	const [dataFrom, setDataFrom] = useState<string[]>([]);
    const [startDate, setStartDate] = useState<Date | null>(new Date());
    const [endDate, setEndDate] = useState<Date | null>(new Date());
    const [year, setYear] = useState<string>("");

	const [chartData, setChartData] = useState<JSONObject>({});


    const [requestToUpdate, setRequestToUpdate] = useState<number>(0);

    const handleUpdateChart = () => {
        let count = requestToUpdate + 1;
        setRequestToUpdate( count );
    }
    

	const setDataFromArr = (checked: boolean, value: string ) => {
		if( checked ) {
			dataFrom.push( value );
			setDataFrom( dataFrom );
		}
		else {
			const filteredArray = dataFrom.filter(item => item !== value);
			setDataFrom( filteredArray );
		}
	}
	
	const generateReport = async() => {
		let tempChartData: JSONObject = {};

		if( reportType == Constant.REPORT_TYPE_CATEGORY_WISE ) {
			if( dataFrom.indexOf("expense") >= 0 ) {
				tempChartData.expenseData = await ReportService.retrieveCategoryWiseExpenseData(user!._id, startDate!.toISOString(), endDate!.toISOString());
			}

			if( dataFrom.indexOf("income") >= 0 ) {
				// tempChartData.incomeData = await ReportService.retrieveCategoryWiseExpenseData(user!._id, startDate!.toISOString(), endDate!.toISOString());
			}

			if( dataFrom.indexOf("budget") >= 0 ) {
				// tempChartData.budgetData = await ReportService.retrieveCategoryWiseExpenseData(user!._id, startDate!.toISOString(), endDate!.toISOString());
			}
console.log("=========== tempChartData");
console.log(tempChartData);
			setChartData(tempChartData);
		}
		else if( reportType == Constant.REPORT_TYPE_MONTHLY_REPORT ) {

		}
	}


	console.log(chartData);

	return (
		<div className="container p-4">
			
			<div className="mb-4 bg-slate-200 shadow-lg p-1">
				<div className="flex px-3 py-5 items-center">
					<div className="mb-4">
						<label className="block text-gray-700 mb-2" htmlFor="reportType">
							Report type
						</label>
						<select value={reportType} onChange={(e) => setReportType(e.target.value)}>
							<option value="">[Please select]</option>
							<option value={Constant.REPORT_TYPE_CATEGORY_WISE}>Category Wise report</option>
							<option value={Constant.REPORT_TYPE_MONTHLY_REPORT}>Montly report</option>
						</select>
					</div>
				</div>

				{ reportType === Constant.REPORT_TYPE_CATEGORY_WISE && <div className="flex px-3 py-5 items-center">
					<div className="mb-4">
						<label className="block text-gray-700 mb-2" htmlFor="startDate">
							From
						</label>
						<DatePicker
							selected={startDate}
							onChange={(date: Date | null) => setStartDate(date)}
							dateFormat="yyyy-MM-dd"
						/>
					</div>
					<div className="mb-4 mx-4">
						<label className="block text-gray-700 mb-2" htmlFor="endDate">
							To
						</label>
						<DatePicker
							selected={endDate}
							onChange={(date: Date | null) => setEndDate(date)}
							dateFormat="yyyy-MM-dd"
						/>
					</div>
				</div> }


				{ reportType === Constant.REPORT_TYPE_MONTHLY_REPORT && <div className="flex px-3 py-5 items-center">
					<div className="mb-4 mx-4">
						<label className="block text-gray-700 mb-2" htmlFor="startDate">
							Year
						</label>
						<input
							type="number"
							id="year"
							value={year}
							onChange={(e) => setYear(e.target.value)}
							className="w-full p-2 border border-gray-300 rounded"
							required
						/>
					</div>
				</div> }

				<div className="flex px-3 py-5 items-center">
					<div className="mb-4">
						<label className="block text-gray-700 mb-2" htmlFor="dataFrom">
							Data from
						</label>
						<input type="checkbox" onClick={(e: React.MouseEvent<HTMLInputElement>) => setDataFromArr(e.currentTarget.checked, "expense") } />Expense
						<input type="checkbox" onClick={(e: React.MouseEvent<HTMLInputElement>) => setDataFromArr(e.currentTarget.checked, "income") } />Income
						<input type="checkbox" onClick={(e: React.MouseEvent<HTMLInputElement>) => setDataFromArr(e.currentTarget.checked, "budget") } />Budget
						
					</div>
				</div>

				<button className="ml-5 px-4 py-2  bg-green-700 rounded text-white" onClick={() => generateReport()} >Generate chart</button>
			</div>


			{!Utils.isEmptyJSON(chartData) && <div className="grid grid-cols-2 gap-4">
				<div className="bg-white rounded-lg p-4 shadow-md">
				<PieChart width={500} height={400}>
					{/* {chartData.expenseData !== null && <Pie
						dataKey="totalAmount"
						isAnimationActive={false}
						data={chartData.expenseData!}
						cx={"50%"}
						cy={"50%"}
						outerRadius={80}
						fill="#8884d8"
						label
						style={{ outline: 'none' }}
					>
						{chartData.expenseData!.map((entry, index) => (
							<Cell key={`cell-${index}`} fill={ReportService.COLORS[index % ReportService.COLORS.length]}  > </Cell>
						))}
					</Pie>} */}

					<Pie data={chartData.expenseData} dataKey="totalAmount" cx="50%" cy="50%" outerRadius={60} fill="#8884d8" />
          <Pie data={chartData.expenseData} dataKey="totalAmount" cx="50%" cy="50%" innerRadius={70} outerRadius={90} fill="#82ca9d" label />
        

					{/* {chartData.expenseData !== null && <CustomPie data={chartData.expenseData!} dataKey="totalAmount" /> }
					{chartData.incomeData !== null && <CustomPie data={chartData.incomeData!} dataKey="totalAmount" /> }
					{chartData.budgetData !== null && <CustomPie data={chartData.budgetData!} dataKey="totalAmount" /> } */}
					</PieChart>
				</div>
			</div>}

			


		</div>
	);
};