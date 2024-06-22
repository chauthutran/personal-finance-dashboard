import * as actions from './transactionAction';
import { useCallback, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getTransactionList } from './transactionSelectors';
import { AppDispatch, RootState } from '../store';
import { JSONObject } from '../../lib/definations';


const useTransaction = () => {
    const dispatch = useDispatch<AppDispatch>();

    const transactionList = useSelector((state: RootState) => getTransactionList(state));

    
    // --------- For 'Transaction' actions
    
    const fetchTransactionList = useCallback((userId: string) => {
        dispatch( actions.fetchTransactionList( userId) );
    }, [dispatch]);


    const saveTransaction = useCallback((transaction: JSONObject) => {
        dispatch( actions.saveTransaction(transaction) );
    }, [dispatch]);

    // END - For 'Transaction' actions ----------------


    return { 
        transactionList,
        saveTransaction,
        fetchTransactionList
     };
};

export default useTransaction;
