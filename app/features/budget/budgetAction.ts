import { JSONObject, ActionType, ResponseData } from "@/lib/definations";
import * as Constant from "@/lib/constants";

export const fetchBudgetList = (userId: string ) => {

    return async (dispatch: (arg0: ActionType) => void) => {
		dispatch({
            type: Constant.FETCH_BUDGET_lIST_REQUEST
        });
		
        try {
            const response = await fetch(`api/budget?userId=${userId}`);
            if (!response.ok) {
                dispatch({
                    type: Constant.FETCH_BUDGET_lIST_FAILURE,
                    payload: "Network response was not ok"
                })
            }
            else {
                const budgetList = await response.json();
                 dispatch({
                    type: Constant.FETCH_BUDGET_lIST_SUCCESS,
                    payload: budgetList
                })
            }
        }
        catch( ex ) {
            dispatch({
                type: Constant.FETCH_BUDGET_lIST_FAILURE,
                payload: `Fetching budget list failed. ${ex.message}`
            })
        }
    }
}


export const saveBudget = (budget: JSONObject) => {

    return async (dispatch: (arg0: ActionType) => void) => {
		dispatch({
            type: Constant.SAVE_BUDGET_REQUEST
        });
		
        try {
            const requestMethod = ( budget._id === undefined ) ? "POST" : "PUT";
            const response = await fetch("api/budget", {
                method: requestMethod,
                headers: {
                    "Content-type": "appliction/json"
                },
                body: JSON.stringify(budget)
            })
            var fasdfa = await response.json();
console.log("=============== after saving ");
console.log(fasdfa);
            if( !response.ok ){
                dispatch({
                    type: Constant.SAVE_BUDGET_FAILURE,
                    payload: "Network response was not ok"
                })
            }
            else {
                dispatch({
                    type: Constant.SAVE_BUDGET_SUCCESS,
                    payload: fasdfa
                })
            }
        }
        catch( ex ) {
            dispatch({
                type: Constant.SAVE_BUDGET_FAILURE,
                payload: `Fetching budget list failed. ${ex.message}`
            })
        }
    }
}

