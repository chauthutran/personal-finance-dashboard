import { UI_BUDGET_PAGE } from './constants';
import { Document } from "mongoose";
import { JSONObject, Message } from "@/lib/definations";
import * as Constant from "@/lib/constants";
/** 
 * Relate to JSONObject 
 * */ 
export const converDbObjectToJson = ( obj: Document | Document[]) => {
    return JSON.parse(JSON.stringify(obj));
}

export const cloneJSONObject = ( obj: JSONObject | JSONObject[]) => {
    return JSON.parse(JSON.stringify(obj));
}

export const isEmptyJSON = ( obj: JSONObject ): boolean => {
    return obj === null || Object.keys(obj).length === 0;
}

export const removeFromArray = function( list: JSONObject[], value: string, propertyName: string )
{
	let index: any;

	for( let i = 0; i < list.length; i++ )
	{
		var item = list[i];
		if ( item[ propertyName ] == value ) 
		{
			index = i;
			break;
		}
	}

	if ( index != undefined ) 
	{
		list.splice( index, 1 );
	}

	return list;
};

/** 
 * Relate to DATE 
 * */ 
export const formatDate = ( dateStr: string) => {
    // const month =  String(date.getMonth() + 1).padStart(2, '0');
    // const day = String(date.getDate()).padStart(2, '0');
    // return `${date.getFullYear()}-${month}-${day}`;

    return dateStr.substring(0, 10);
}

// export const formatDate = (dateStr: string): string => {
//     const dateObj = new Date(dateStr);
const options: Intl.DateTimeFormatOptions = { year: 'numeric', month: 'short', day: 'numeric' };
//     return dateObj.toLocaleDateString('en-US', options); // Example: "June 27, 2024"
//   };


export const formatMonth = (dateStr: string): string => {
    const dateObj = new Date(dateStr);
    const options: Intl.DateTimeFormatOptions = { year: 'numeric', month: 'short' };
    return dateObj.toLocaleDateString('en-US', options); // Example: "June 2024"
};

export const isValidDate = (dateStr: string) => {
    const date = new Date(dateStr);
    return date instanceof Date && !isNaN(date.getTime());
}


export const getMonthListFromDateRange = (startDate: Date, endDate: Date): JSONObject[] => {
  
    if (startDate > endDate) {
      throw new Error("Start date must be before end date");
    }
  
    const monthList: JSONObject[] = [];
    const options: Intl.DateTimeFormatOptions = { year: 'numeric', month: 'short' };
    
    const currentDate = new Date(startDate);
  
    while (currentDate <= endDate) {
      monthList.push({
        month: currentDate.getMonth() + 1,
        year: currentDate.getFullYear(),
        displayName: currentDate.toLocaleDateString('en-US', options)
      });
      currentDate.setMonth(currentDate.getMonth() + 1);
    }
    
    return monthList;
  };

  
/** 
 * Relate to Searching/Replace data in a list
 *  */ 

export const findItemFromList = ( list: JSONObject[], value: any, propertyName: string ) =>
{
    let item = null as JSONObject | null;

    if( list )
    {
        // If propertyName being compare to has not been passed, set it as 'id'.
        if ( propertyName === undefined )
        {
            propertyName = "id";
        }

        for( let i = 0; i < list.length; i++ )
        {
            let listItem = list[i];

            if ( listItem[propertyName] == value )
            {
                item = listItem;
                break;
            }
        }
    }

    return item;
}

export const findAndReplaceItemFromList = function( list: JSONObject[], searchValue: any, searchProperty: string, replacedData: JSONObject )
{
	var found = false;
	
	// Found item, replace a new one
	for( let i = 0; i < list.length; i++ )
	{
		var item = list[i];
		if ( item[ searchProperty ] == searchValue )
		{
			list[i] = cloneJSONObject( replacedData );
			found = true;
		}
	}

	// Not found item, add a new one
	if( !found )
	{
		list[list.length] = replacedData;
	}

}

/** Merge 2 list and remove the duplicate items */
// const incomePeriods = incomeData.map((item: JSONObject) => `${item.year}-${item.month}`);
// 			const exprensePeriods = expenseData.map((item: JSONObject) => `${item.year}-${item.month}`);
// 			let periods: string[] = Array.from(new Set([...incomePeriods, ...exprensePeriods]));
// 			periods.sort();


/** 
 * Relate to Alert
 *  */ 
export const createMessage = (type: string = "", msg: string = ""): Message => {
    return { type, msg };
}

/** 
 * Relate to URL ( getting parametter from URL, ...)
 *  */ 
export const convertUrlSearchParamToJson = (urlSearchParams: URLSearchParams): JSONObject => {
    const json = {} as JSONObject;
    for (const [key, value] of urlSearchParams) {
      json[key] = value;
    }
    
    return json;
}

  
/** 
 * Other Supportive methods
 * */
export const getAppHeaderSubTitle = ( subTitleKey: string ): string => {
   
    let title = "";

    switch( subTitleKey ) {
        case Constant.UI_BUDGET_PAGE:
            title = "Budget Management";
            break;
        case Constant.UI_INCOME_PAGE:
            title = "Income Management";
            break;
        case Constant.UI_EXPENSE_PAGE:
            title = "Income Management";
            break; 
        case Constant.UI_DASHBOARD_PAGE:
            title = "Dashbord";
            break;
        default:
            break;
    }
    return title;
  
}

export const getErrMessage = (ex: any) => {
    if (ex instanceof Error) {
        return `An error occurred: ${ex.message}`;
    } 
    
    return `An unexpected error occurred: ${ex}`;
  }