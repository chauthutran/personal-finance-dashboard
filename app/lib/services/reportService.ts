import { JSONObject } from "@/lib/definations";
import * as Utils from '@/lib/utils';


export const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884D8', '#82ca9d'];
	
export const retrieveAggregateData = async (path: string, userId: string, startDate: string, endDate: string, dataFrom: string): Promise<JSONObject> => {

	const payload = {
		"userId" : userId,
		"startDate" : startDate,
		"endDate": endDate,
		"dataFrom": dataFrom
	}

	try {
		const response = await fetch(`api/report/${path}`, {
			method: "POST",
			headers: {
				"Content-type": "appliction/json"
			},
			body: JSON.stringify(payload)
		})

		if( !response.ok ){
			console.log("====================== response");
			console.log(response);
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
