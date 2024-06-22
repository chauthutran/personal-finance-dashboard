import useStatus from "../status/StatusHooks";
import useUi from "../mainUi/mainUiHooks";
import useAuth from "../auth/authHooks";
import useBudget from "../budget/budgetHooks";
import useTransaction from "../transaction/transactionHooks";



const useAppHook = () => {
    const authHook = useAuth();
    const statusHook = useStatus();
    const uiHook = useUi();
    const budgetHook = useBudget();
    const transactionHook = useTransaction();
  
    return {
      ...authHook,
      ...statusHook,
      ...uiHook,
      ...budgetHook,
      ...transactionHook
    };
  };
  
  export default useAppHook;