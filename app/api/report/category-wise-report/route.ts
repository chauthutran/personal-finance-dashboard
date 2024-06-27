
import { mongoose } from "@/lib/db"; // Have to have this import so that we can connect database
import { JSONObject } from "@/lib/definations";
import * as Utils from "@/lib/utils";
import { NextRequest, NextResponse } from "next/server";
import * as Constant from "@/lib/constants";
import Transaction from "@/lib/schemas/Transaction.schema";
 
interface ReportData {
	category: string;
	name: string;
	totalAmount: number;
	details: JSONObject[],
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
			&& payload.dataFrom.indexOf("expense") < 0 ) ) {
		errArr.push(`Please define at least one 'dataFrom', 'income' or 'expense'`);
	}


	if( errArr.length > 0 ) {
		return NextResponse.json({errMsg: errArr.join("; ")}, { status: 200 });
	}

	let reportData: JSONObject = {};
	if( payload.dataFrom.indexOf("income") >= 0 ) {
		reportData.incomeData = await getReportData(payload.userId, payload.startDate, payload.endDate, "income");
	}
	
	if( payload.dataFrom.indexOf("expense") >= 0 ) {
		reportData.expenseData = await getReportData(payload.userId, payload.startDate, payload.endDate, "expense");
	}
	
	return NextResponse.json(reportData, { status: 200 });
}


const getReportData = async(userId: string, startDate: string, endDate: string, categoryType: string): Promise<ReportData[]> => {
	const reportData: ReportData[] = await Transaction.aggregate([
		{
			$match: {
				userId: new mongoose.Types.ObjectId(userId),
				date: {
					$gte: new Date(startDate),
					$lte: new Date(endDate)
				},
			}
		},
		{
			$lookup: {
				from: 'categories',
				localField: 'categoryId',
				foreignField: '_id',
				as: 'categoryInfo'
			}
		},
		{
			$unwind: {
				path: '$categoryInfo',
				preserveNullAndEmptyArrays: false
			}
		},
		{
			$match: {
			  'categoryInfo.type': categoryType
			}
		},
		{
			$group: {
				_id: '$categoryId',
				totalAmount: { $sum: '$amount' },
				categoryType: { $first: "$categoryInfo.type" },
				name: { $first: "$categoryInfo.name" }
			},
		},
		{
			$project: {
				_id: 0,
				category: '$_id',
				totalAmount: 1,
				categoryType: 1,
				name: 1
			},
		},
	]);
	
	return reportData;
}
