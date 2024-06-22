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

    if( action.type == Constant.SAVE_BUDGET_SUCCESS ) {
        var newBudget = action.payload;
        
        console.log("============ newBudget");
        console.log(newBudget);
        let foundBudget = Utils.findItemFromList(newState.budgetList, newBudget._id, "_id");
        console.log(foundBudget);
        if( foundBudget == null ) { // Add case
            newState.budgetList.push( newBudget );
        }
        else { // Update case
            Utils.findAndReplaceItemFromList(newState.budgetList, newBudget._id, "_id", newBudget);
        }

        return newState;
    }
    
    return state;
}

export default BudgetReducer;
