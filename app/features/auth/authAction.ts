import * as api from '@/api';
import { JSONObject, ActionType, ResponseData } from "@/lib/definations";
import * as Constant from "@/lib/constants";
import * as Utils from "@/lib/utils";


export const login = (username: string, password: string) => {

    return async (dispatch: (arg0: ActionType) => void) => {
		dispatch({
            type: Constant.LOGIN_REQUEST
        });
		
        try {
            const response = await fetch(`api/auth?username=${username}&password=${password}`);
            if (!response.ok) {
                dispatch({
                    type: Constant.LOGIN_FAILURE,
                    payload: "Network response was not ok"
                })
            }
            else {
                    
                const userData = await response.json();
                if (!Utils.isEmptyJSON(userData) ) {
                    dispatch({
                        type: Constant.LOGIN_SUCCESS,
                        payload: userData
                    })
                }
                else {
                    dispatch({
                        type: Constant.LOGIN_FAILURE,
                        payload: "Username/password is wrong."
                    })
                }
            }
        }
        catch( ex ) {
            dispatch({
                type: Constant.LOGIN_FAILURE,
                payload: `Login failed. ${ex.message}`
            })
        }
    }
}


export const logout = () => {
    return {
        type: Constant.LOGOUT
    }
}