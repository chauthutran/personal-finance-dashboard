import useStatus from "../status/StatusHooks";
import useUi from "../mainUi/mainUiHooks";
import useAuth from "../auth/authHooks";
import useBudget from "../budget/budgetHooks";



const useAppHook = () => {
    const authHook = useAuth();
    const statusHook = useStatus();
    const uiHook = useUi();
    const budgetHook = useBudget();
  
    return {
      ...authHook,
      ...statusHook,
      ...uiHook,
      ...budgetHook
    };
  };
  
  export default useAppHook;