import { useEffect, useMemo, useState } from 'react';
import { useAppDispatch, useAppSelector } from '@hooks'
import { update } from '@store/slices/scenerySlice'
import useGet from '../firebase/useGet';


const useScenery = (channelID: number) => {
    const items = useAppSelector(state => state.items);
    const dispatch = useAppDispatch();
    const [loading, setloading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        if ("undefined" === items[channelID]) {
            const { data, loading: loadingGet, error: errorGet } = useGet(`scenery/${channelID}`);
            setloading(loadingGet);
            setError((errorGet));
            const scenery = [];
            if (!loadingGet && null === errorGet) {
                if (0 === data.length) {
                    scenery.push({
                        value: "#FFFFFF40",
                        time: "24:00",
                        brightness: null,
                    });
                }
                scenery.push(data);
                dispatch(update({ channelID, scenery }));
            }
            return;
        }
    }, [items]);


    const arr = { data: items, loading, error }

    return useMemo(() => arr, [arr]);
}

export default useScenery