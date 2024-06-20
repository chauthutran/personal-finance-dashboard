
import * as Utils from "@/lib/utils";
import * as Constant from "@/lib/constants";

const initialState = {
	status: "",
	type: "",
	message: ""
}

const StatusReducer = (state = initialState, action) => {

	let newState = Utils.cloneJSONObject( state );

	if( action.type == Constant.LOGIN_FAILURE ) 
	{
		newState.status = action.type;
		newState.type = Constant.ALERT_TYPE_INFO;
		newState.message = action.payload;

		return newState;
	}
	

	else
	{
		return {
            ... state,
            status: action.type,
            type: "",
            message: ""
        }
	}

};

export default StatusReducer;
