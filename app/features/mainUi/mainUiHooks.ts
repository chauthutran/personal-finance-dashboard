import { getMainPage, getSubPage } from './mainUiSelectors';
import { setMainPage, setSubPage } from './mainUiActions';
import { useSelector, useDispatch } from 'react-redux';
import { AppDispatch, RootState } from '../store';
import { useCallback } from 'react';


const useStatus = () => {
    
    const dispatch = useDispatch<AppDispatch>();

    const mainPage = useSelector((state: RootState) => getMainPage(state));
    const subPage = useSelector((state: RootState) => getSubPage(state));


    const handleSetMainPage = useCallback((uiName: string) => {
        dispatch(setMainPage(uiName));
    }, [dispatch]);

    
    const handleSetSubPage = useCallback((uiName: string | null) => {
        dispatch(setSubPage(uiName));
    }, [dispatch]);


    return { mainPage, subPage, setMainPage: handleSetMainPage, setSubPage: handleSetSubPage };
};

export default useStatus;
