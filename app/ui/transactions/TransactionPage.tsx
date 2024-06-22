/**  Lists all transactions with options to filter by date range, category, or amount. */

// "use client";

// import useAppHook from "@/features/hooks";
// import * as Constant from "@/lib/constants";
// import * as AppStore from "@/lib/appStore";

// export default function TransactionPage() {

//     const { currentUser, subPage, setSubPage } = useAppHook();
    
//     return (
//         <>
//             { subPage == null && <BudgetList user={currentUser} />}
//             { subPage == Constant.SUB_UI_ADD_FORM && <BudgetForm userId={currentUser._id}  />}
//             { subPage == Constant.SUB_UI_EDIT_FORM && <BudgetForm userId={currentUser._id} data={AppStore.getSelected()} />}
//         </>
//     )
// }