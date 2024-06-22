import * as actions from './authAction';
import { useCallback, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getCurrentUser } from './authSelectors';
import { AppDispatch, RootState } from '../store';
import { JSONObject } from '../../lib/definations';


const useAuth = () => {
    const dispatch = useDispatch<AppDispatch>();

    const currentUser = useSelector((state: RootState) => getCurrentUser(state));

    // --------- For 'Authenticate' actions
    
    const login = useCallback((username: string, password: string) => {
        dispatch(actions.login(username, password));
    }, [dispatch]);

    const logout = useCallback(() => {
        dispatch(actions.logout());
    }, [dispatch]);

    const register = useCallback((user: JSONObject) => {
        dispatch(actions.register(user));
    }, [dispatch]);


    // END - For 'ClientData' actions ----------------


    return { 
        currentUser,
        login,
        logout,
        register
     };
};

export default useAuth;
