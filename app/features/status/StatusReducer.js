
import * as Utils from "@/lib/utils";
import * as Constant from "@/lib/constants";

const initialState = {
	status: "",
	type: "",
	message: ""
}

const StatusReducer = (state = initialState, action) => {

	let newState = Utils.cloneJSONObject( state );

	if( action.type == Constant.LOGIN_FAILURE 
		|| action.type == Constant.FETCH_BUDGET_lIST_FAILURE
		|| action.type == Constant.SAVE_BUDGET_FAILURE ) 
	{
		newState.status = action.type;
		newState.type = Constant.ALERT_TYPE_ERROR;
		newState.message = action.payload;

		return newState;
	}
	else if( action.type == Constant.SAVE_BUDGET_SUCCESS ) 
	{
		newState.status = action.type;
		newState.type = Constant.ALERT_TYPE_INFO;
		newState.message = action.payload;

		return newState;
	}


	

	return state;
	// else
	// {
	// 	return {
    //         ... state,
    //         status: action.type,
    //         type: "",
    //         message: ""
    //     }
	// }

};

export default StatusReducer;
