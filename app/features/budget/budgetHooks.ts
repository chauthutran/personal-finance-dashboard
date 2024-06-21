import * as actions from './budgetAction';
import { useCallback, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getBudgetList } from './budgetSelectors';
import { AppDispatch, RootState } from '../store';
import { JSONObject } from '../../lib/definations';


const useBudget = () => {
    const dispatch = useDispatch<AppDispatch>();

    const budgetList = useSelector((state: RootState) => getBudgetList(state));

    
    // --------- For 'Budget' actions
    
    const fetchBudgetList = useCallback((userId: string) => {
        dispatch( actions.fetchBudgetList( userId) );
    }, [dispatch]);


    const saveBudget = useCallback((budget: JSONObject) => {
        dispatch( actions.saveBudget(budget) );
    }, [dispatch]);

    // END - For 'Budget' actions ----------------


    return { 
        budgetList,
        saveBudget,
        fetchBudgetList
     };
};

export default useBudget;
