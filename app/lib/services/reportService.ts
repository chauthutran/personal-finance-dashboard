import { JSONObject } from "@/lib/definations";
import * as Utils from '@/lib/utils';
import * as Constant from "@/lib/constants";


// export const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884D8', '#82ca9d'];
	
export const COLORS = ['#4CAF50', '#F44336', '#2196F3', '#9E9E9E'];


export const retrieveAggregateData = async (path: string, payload: JSONObject): Promise<JSONObject> => {

	try {
		const response = await fetch(`api/report/${path}`, {
			method: "POST",
			headers: {
				"Content-type": "appliction/json"
			},
			body: JSON.stringify(payload)
		})

		if( !response.ok ){
			return ({ errMsg: "Network response was not ok"});
		}
		else {
			var jsonResponse: JSONObject = await response.json();
			if (jsonResponse.errMsg == undefined) { // run successfully.
				return jsonResponse;
			}
			else { // fail
				return jsonResponse.errMsg;
			}
		}
	}
	catch( err ) {
		return ({ errMsg: Utils.getErrMessage(err)});
	}

}

export const generateColor = (num: number) => {
	const r = Math.floor(Math.sin(num) * 128 + 128);
	const g = Math.floor(Math.sin(num + 2) * 128 + 128);
	const b = Math.floor(Math.sin(num + 4) * 128 + 128);
	return `rgb(${r}, ${g}, ${b})`;
}

export const transformReportData_IncomeVSExpense = (data: JSONObject, startDate: Date, endDate: Date ): JSONObject[] => {
	var transformedData: JSONObject[] = [];
	const incomeData = data.incomeData;
	const expenseData = data.expenseData;

	const monthList = Utils.getMonthListFromDateRange(startDate, endDate);

	for( var i=0; i< monthList.length; i++ ) {
		const monthInfo = monthList[i];
		const income = incomeData.filter((item) => (item.month === monthInfo.month && item.year === monthInfo.year));
		const expense = expenseData.filter((item) => (item.month === monthInfo.month && item.year === monthInfo.year));
		
		const incomeVal = (income === undefined || income.length == 0) ? 0 : income[0].totalAmount;
		const expenseVal = (expense === undefined || expense.length == 0 ) ? 0 : expense[0].totalAmount;
		transformedData.push({
			name: monthInfo.displayName,
			Income: incomeVal,
			Expense: expenseVal
		})
	}

	return transformedData;
}


export const transformReportData_BudgetVSActual = ( reportData: JSONObject ): JSONObject[] => {
	var transformedData: JSONObject[] = [];
	var data = reportData.data;

	for( var i=0; i< data.length; i++ ) {
		const item = data[i];
		
		transformedData.push({
			name: item.categoryName,
			Budget: item.budgetAmount,
			Expense: item.expenseAmount,
			// remainingAmount: item.remainingAmount
		})
	}
	
	return transformedData;
}


export const transformReportData_CategoryMonthly = ( reportData: JSONObject, startDate: Date, endDate: Date ): JSONObject => {
	var transformedData: JSONObject[] = [];
	
	// Add empty items if missing and conver the "name" of items to readable names of months
	const monthList = Utils.getMonthListFromDateRange(startDate, endDate);
	const data = reportData.data;

	for( var i=0; i< monthList.length; i++ ) {
		const monthInfo = monthList[i];
		const itemList = data.filter((item) => (item.month === monthInfo.month && item.year === monthInfo.year));
		
		const totals = (itemList === undefined || itemList.length == 0) ? 0 : itemList[0].totals;
	
		transformedData.push({
			name: monthInfo.displayName,
			...totals
		})
	}

	console.log(transformedData);
	return transformedData;
}
