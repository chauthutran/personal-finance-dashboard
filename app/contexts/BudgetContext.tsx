"use budget";

import React, { createContext, useContext, useState, ReactNode, useEffect } from 'react';
import * as Contanst from "../lib/constants";
import { JSONObject } from '@/lib/definations';
import * as Utils from '@/lib/utils';

interface BudgetContextProps {
    userId: string,
	budgetList: JSONObject[] | null;
    saveBudget: (budget: JSONObject) => Promise<void>;
	deleteBudget: (budget: JSONObject) => Promise<void>;
    error: string | null;
    loading: boolean;
}

const BudgetContext = createContext<BudgetContextProps>({
    userId: "",
	budgetList: null,
	saveBudget: async(budget: JSONObject) => {},
	deleteBudget: async(budget: JSONObject) => {},
    error: null,
    loading: false
});

export const useBudget = (): BudgetContextProps => {
	const context = useContext(BudgetContext);
	if (!context) {
	  throw new Error('useBudget must be used within an BudgetProvider');
	}
	return context;
};

export const BudgetProvider = ({ userId, children }: { userId: string, children: ReactNode }) => {
    const [budgetList, setBudgetList] = useState<JSONObject[] | null>(null);
	const [error, setError] = useState<string | null>(null);
	const [loading, setLoading] = useState(false);

	useEffect(() => {
		fetchBudgetList()
	}, []);


    const fetchBudgetList = async () => {
        setError(null);
		try {
			const response = await fetch(`api/budget?userId=${userId}`);
            if (!response.ok) {
                setError("Network response was not ok");
            }
            else {
                const list = await response.json();
				setBudgetList(list);
            }

		} catch (err) {
			setError(Utils.getErrMessage(err));
		}
	};

    const saveBudget = async(budget: JSONObject) => { 
        setLoading(true);
        setError(null);

        try {
            const requestMethod = ( budget._id === undefined ) ? "POST" : "PUT";
            const response = await fetch("api/budget", {
                method: requestMethod,
                headers: {
                    "Content-type": "appliction/json"
                },
                body: JSON.stringify(budget)
            })

            if( !response.ok ){
                setError("Network response was not ok");
            }
            else {
                var newBudget = await response.json();
                let tempList = Utils.cloneJSONObject(budgetList!);
               
                // Update list
                let foundBudget = Utils.findItemFromList(tempList!, newBudget._id, "_id");
                console.log(foundBudget);
                if( foundBudget == null ) { // Add case
                    tempList!.push( newBudget );
                }
                else { // Update case
                    Utils.findAndReplaceItemFromList(tempList!, newBudget._id, "_id", newBudget);
                }

                setBudgetList( tempList );
            }
        }
        catch( err ) {
            setError(Utils.getErrMessage(err));
        }
        finally {
            setLoading(false);
        }
    }
 
    const deleteBudget = async(budget: JSONObject) => { 
        setError(null);

        try {
            const response = await fetch(`api/budget?id=${budget._id}`, { method: "DELETE" });

            if( !response.ok ){
                setError("Network response was not ok");
            }
            else {
                // Remove this budget from the list
                let tempList = Utils.cloneJSONObject(budgetList!);
                Utils.removeFromArray( tempList!, budget._id, "_id");
                setBudgetList(tempList);
            }
        }
        catch( err ) {
            setError(Utils.getErrMessage(err));
        }
    }

	return (
		<BudgetContext.Provider value={{ userId, loading, error, budgetList, saveBudget, deleteBudget }}>
			{children}
		</BudgetContext.Provider>
	);
};
