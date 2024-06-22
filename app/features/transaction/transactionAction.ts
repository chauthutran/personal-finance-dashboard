import { JSONObject, ActionType, ResponseData } from "@/lib/definations";
import * as Constant from "@/lib/constants";

export const fetchTransactionList = (userId: string ) => {

    return async (dispatch: (arg0: ActionType) => void) => {
		dispatch({
            type: Constant.FETCH_TRANSATION_lIST_REQUEST
        });
		
        try {
            const response = await fetch(`api/transaction?userId=${userId}`);
            if (!response.ok) {
                dispatch({
                    type: Constant.FETCH_TRANSATION_lIST_FAILURE,
                    payload: "Network response was not ok"
                })
            }
            else {
                const transactionList = await response.json();
                 dispatch({
                    type: Constant.FETCH_TRANSATION_lIST_SUCCESS,
                    payload: transactionList
                })
            }
        }
        catch( ex ) {
            dispatch({
                type: Constant.FETCH_TRANSATION_lIST_FAILURE,
                payload: `Fetching transaction list failed. ${ex.message}`
            })
        }
    }
}


export const saveTransaction = (transaction: JSONObject) => {

    return async (dispatch: (arg0: ActionType) => void) => {
		dispatch({
            type: Constant.SAVE_TRANSACTION_REQUEST
        });
		
        try {
            const requestMethod = ( transaction._id === undefined ) ? "POST" : "PUT";
            const response = await fetch("api/transaction", {
                method: requestMethod,
                headers: {
                    "Content-type": "appliction/json"
                },
                body: JSON.stringify(transaction)
            })

            if( !response.ok ){
                dispatch({
                    type: Constant.SAVE_TRANSACTION_FAILURE,
                    payload: "Network response was not ok"
                });
            }
            else {
                var newTransaction = await response.json();
                dispatch({
                    type: Constant.SAVE_TRANSACTION_SUCCESS,
                    payload: newTransaction
                });
            }
        }
        catch( ex ) {
            dispatch({
                type: Constant.SAVE_TRANSACTION_FAILURE,
                payload: `Fetching transaction list failed. ${ex.message}`
            });
        }
    }
}

