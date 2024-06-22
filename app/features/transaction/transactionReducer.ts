import * as Constant from "@/lib/constants";
import { JSONObject, ActionType } from '@/lib/definations';
import * as Utils from "@/lib/utils";

const initialState = {
    transactionList: null as JSONObject | null
}

const TransactionReducer = (state = initialState, action: ActionType) => {
    
	let newState = Utils.cloneJSONObject(state);

    if( action.type == Constant.FETCH_TRANSATION_lIST_REQUEST ) {
        newState.transactionList = action.payload;

        return newState;
    }
    else if( action.type == Constant.SAVE_TRANSACTION_SUCCESS ) {
        var newTransaction = action.payload;
        
        
        let foundTransaction = Utils.findItemFromList(newState.transactionList, newTransaction._id, "_id");
        console.log(foundTransaction);
        if( foundTransaction == null ) { // Add case
            newState.transactionList.push( newTransaction );
        }
        else { // Update case
            Utils.findAndReplaceItemFromList(newState.transactionList, newTransaction._id, "_id", newTransaction);
        }

        return newState;
    }
    
    return state;
}

export default TransactionReducer;
