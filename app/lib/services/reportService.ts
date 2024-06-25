import { JSONObject } from "@/lib/definations";

export const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884D8', '#82ca9d'];

	
export const retrieveCategoryWiseExpenseData = async (userId: string, startDate: string, endDate: string): Promise<JSONObject[] | string> => {
	const response = await fetch(`api/report/category-wise-expense?userId=${userId}&startDate=${startDate}&endDate=${endDate}`);

	if (response.ok) {
		var jsonResponse: any = await response.json();
		if (jsonResponse.message == undefined) { // success
			const aggregateData = jsonResponse as JSONObject[];
			return aggregateData;
		}
		else { // fail
			return jsonResponse.message;
		}
	}

	return "Error while loading expense data";
}



export const retrieveMonthExpenseData = async (userId: string, year: string): Promise<JSONObject[] | string> => {
	const startDate = `${year}-01-01T00:00:00`;
	const endDate = `${year}-12-31T00:00:00`;

	const response = await fetch(`api/report/monthly-expense-report?userId=${userId}&startDate=${startDate}&endDate=${endDate}`);

	if (response.ok) {
		var jsonResponse: any = await response.json();
		if (jsonResponse.message == undefined) { // run successfully.
			const aggregateData = jsonResponse as JSONObject[];
			return aggregateData;
		}
		else { // fail
			return jsonResponse.message;
		}
	}

	return "Error while loading expense data";

}