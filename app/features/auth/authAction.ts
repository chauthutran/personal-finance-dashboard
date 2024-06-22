import { ActionType, JSONObject } from "@/lib/definations";
import * as Constant from "@/lib/constants";


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
                    
                const userList = await response.json();
                console.log("==== Login result");
                console.log(userList);
                if (userList.length > 0 ) {
                    dispatch({
                        type: Constant.LOGIN_SUCCESS,
                        payload: userList[0]
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

export const register = (user: JSONObject) => {

    return async (dispatch: (arg0: ActionType) => void) => {
		dispatch({
            type: Constant.USER_REGISTRATION_REQUEST
        });
		
        try {
            const response = await fetch("api/auth", {
                method: "POST",
                headers: {
                    "Content-type": "appliction/json"
                },
                body: JSON.stringify(user)
            });

            if( !response.ok ){
                dispatch({
                    type: Constant.USER_REGISTRATION_FAILURET,
                    payload: "Network response was not ok"
                })
            }
            else {
                dispatch({
                    type: Constant.USER_REGISTRATION_SUCCESS,
                    payload: await response.json()
                })
            }
        }
        catch( ex ) {
            dispatch({
                type: Constant.USER_REGISTRATION_FAILURET,
                payload: `This user is registered failed. ${ex.message}`
            })
        }
    }
}


export const logout = () => {
    return {
        type: Constant.LOGOUT
    }
}