import { getMainUi } from './mainUiSelectors';
import { setCurrentUi } from './mainUiActions';
import { useSelector, useDispatch } from 'react-redux';
import { AppDispatch, RootState } from '../store';
import { useCallback } from 'react';


const useStatus = () => {
    
    const dispatch = useDispatch<AppDispatch>();

    const mainUi = useSelector((state: RootState) => getMainUi(state));

    const handleSetMainUi = useCallback((uiName: string) => {
        dispatch(setCurrentUi(uiName));
    }, [dispatch]);


    return { mainUi, setMainUi: handleSetMainUi };
};

export default useStatus;
