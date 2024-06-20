import * as Constant from "@/lib/constants";
import { JSONObject, ActionType } from '@/lib/definations';
import * as Utils from "@/lib/utils";

const initialState = {
    curUser: null as JSONObject | null
}

const AuthenticateReducer = (state = initialState, action: ActionType) => {
    
	let newState = Utils.cloneJSONObject(state);

    if( action.type == Constant.LOGIN_SUCCESS ) {
        newState.curUser = action.payload;

        return newState;
    }
    else if( action.type == Constant.LOGOUT ) {
        newState.curUser = null;
        
        return newState;
    }

    return state;
}

export default AuthenticateReducer;
