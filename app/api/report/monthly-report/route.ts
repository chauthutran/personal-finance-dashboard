
import { mongoose } from "@/lib/db"; // Have to have this import so that we can connect database
import { JSONObject } from "@/lib/definations";
import Budget from "@/lib/schemas/Budget.schema";
import Expense from "@/lib/schemas/Expense.schema";
import Income from "@/lib/schemas/Income.schema";
import * as Utils from "@/lib/utils";
import { NextRequest, NextResponse } from "next/server";


interface MonthlyData {
	totalAmount: number;
	details: JSONObject[],
	month: number,
	year: number
}


export async function POST( request: NextRequest ) {
	
	const payload: JSONObject = await request.json();

	// Check parametters
	let errArr: string[] = [];
	if (!mongoose.Types.ObjectId.isValid(payload.userId)) {
		errArr.push("Invalid user ID");
	}

	if (payload.startDate == undefined ) {
		errArr.push("Start date is missing");
	}
	else if(!Utils.isValidDate(payload.startDate) ) {
		errArr.push("Start date is invalid");
	}

	if (payload.endDate == undefined ) {
		errArr.push("End date is missing");
	}
	else if(!Utils.isValidDate(payload.endDate) ) {
		errArr.push("End date is invalid");
	}

	if (payload.dataFrom == undefined 
		|| (payload.dataFrom.indexOf("income") < 0 
			&& payload.dataFrom.indexOf("budget") < 0  
			&& payload.dataFrom.indexOf("expense") < 0 ) ) {
		errArr.push(`Please define at least one 'dataFrom', such as 'income', 'budget' or 'expense'`);
	}

	if( errArr.length > 0 ) {
		return NextResponse.json({errMsg: errArr.join("; ")}, { status: 200 });
	}


	let reportData: JSONObject = {};
	if( payload.dataFrom.indexOf("income") >= 0 ) {
		reportData.incomeData = await getIncomeData(payload.userId, payload.startDate, payload.endDate);
	}
	
	if( payload.dataFrom.indexOf("expense") >= 0 ) {
		reportData.expenseData = await getExpenseData(payload.userId, payload.startDate, payload.endDate);
	}

	if( payload.dataFrom.indexOf("budget") >= 0 ) {
		reportData.budgetData = await getBudgetData(payload.userId, payload.startDate, payload.endDate);
	}

	return NextResponse.json(reportData, { status: 200 });
}


const getIncomeData = async(userId: string, startDate: string, endDate: string): Promise<MonthlyData[]>  => {
	
	const reportData: MonthlyData[] = await Income.aggregate([
		{
			$match: {
				userId: new mongoose.Types.ObjectId(userId),
				date: {
					$gte: new Date(startDate),
					$lte: new Date(endDate)
				}
			}
		  },
		  {
			$group: {
			  _id: {
				year: { $year: "$date" },
				month: { $month: "$date" }
			  },
			  totalAmount: { $sum: "$amount" },
			  details: { $push: "$$ROOT" },
			}
		  },
		  {
			$sort: { "_id.month": 1 }
		  },
		  {
			$project: {
			  _id: 0,
			  month: "$_id.month",
			  year: "$_id.year",
			  totalAmount: 1,
			  details: 1
			}
		  }
	]);

	return reportData;
}

const getExpenseData = async(userId: string, startDate: string, endDate: string): Promise<MonthlyData[]> => {
	
	const reportData: MonthlyData[] = await Expense.aggregate([
		{
			$match: {
				userId: new mongoose.Types.ObjectId(userId),
				date: {
					$gte: new Date(startDate),
					$lte: new Date(endDate)
				}
			}
		  },
		  {
			$group: {
			  _id: {
				year: { $year: "$date" },
				month: { $month: "$date" }
			  },
			  totalAmount: { $sum: "$amount" },
			  details: { $push: "$$ROOT" },
			}
		  },
		  {
			$sort: { "_id.month": 1 }
		  },
		  {
			$project: {
			  _id: 0,
			  month: "$_id.month",
			  year: "$_id.year",
			  totalAmount: 1,
			  details: 1
			}
		  }
	]);

	return reportData;
}

const getBudgetData = async(userId: string, startDate: string, endDate: string): Promise<MonthlyData[]> => {
	const startMonth = parseInt( startDate.substring(5, 7) );
	const startYear = parseInt( startDate.substring(0, 4));
	const endMonth = parseInt( endDate.substring(5, 7) );
	const endYear = parseInt( endDate.substring(0, 4) );

	const reportData: MonthlyData[] = await Budget.aggregate([
		{
			$match: {
				userId: new mongoose.Types.ObjectId(userId),
				month: {
					$gte: startMonth,
					$lte: endMonth
				},
				year: {
					$gte: startYear,
					$lte: endYear
				},
			}
		  },
		  {
			$group: {
			  _id: {
				year: "$year" ,
				month: "$month"
			  },
			  totalAmount: { $sum: "$amount" },
			  details: { $push: "$$ROOT" },
			}
		  },
		  {
			$sort: { "_id.month": 1 }
		  },
		  {
			$project: {
			  _id: 0,
			  month: "$_id.month",
			  year: "$_id.year",
			  totalAmount: 1,
			  details: 1
			}
		  }
	]);

	return reportData;
}