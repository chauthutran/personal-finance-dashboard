import useStatus from "../status/StatusHooks";
import useUi from "../mainUi/mainUiHooks";
import useAuth from "../auth/authHooks";



const useAppHook = () => {
    const authHook = useAuth();
    const statusHook = useStatus();
    const uiHook = useUi();
  
    return {
      ...authHook,
      ...statusHook,
      ...uiHook
    };
  };
  
  export default useAppHook;