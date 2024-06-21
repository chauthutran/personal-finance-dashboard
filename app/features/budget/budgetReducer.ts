import * as Constant from "@/lib/constants";
import { JSONObject, ActionType } from '@/lib/definations';
import * as Utils from "@/lib/utils";

const initialState = {
    budgetList: null as JSONObject | null
}

const BudgetReducer = (state = initialState, action: ActionType) => {
    
	let newState = Utils.cloneJSONObject(state);

    if( action.type == Constant.FETCH_BUDGET_lIST_SUCCESS ) {
        newState.budgetList = action.payload;

        return newState;
    }
    
    return state;
}

export default BudgetReducer;
