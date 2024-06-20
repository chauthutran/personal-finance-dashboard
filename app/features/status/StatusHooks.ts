import { useSelector, useDispatch } from 'react-redux';
import { getStatusData } from '@/features/status/statusSelectors';
import { AppDispatch, RootState } from '../store';
import { JSONObject } from '../../lib/definations';

interface UseStatusDataReturn {
    statusData: JSONObject;
}

const useStatus = (): UseStatusDataReturn => {
    
    const statusData = useSelector((state: RootState) => getStatusData(state));

    return { statusData };
};

export default useStatus;
