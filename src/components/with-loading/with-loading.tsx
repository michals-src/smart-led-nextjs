import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux'
import db from "@firebase";
import { ref, get } from "firebase/database";

import Skeleton, { SkeletonTheme } from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css'

type Props = {};

const WithLoading = function withLoading(props: any) {

    const { path, children, onLoad } = props;

    const [loading, setLoading] = React.useState(false);
    const [error, setError] = React.useState(null);

    const deepSearch = function (obj) {

        let objC = obj;

        path.split('/').map((keyPath, id) => {
            if (objC === undefined) return;
            if (!Object.keys(objC).some(key => key === keyPath)) {
                objC = undefined;
                return;
            }
            objC = objC[keyPath]
        })
        return objC

    }
    const data = useSelector((state: any) => deepSearch(state.global));

    useEffect(() => {

        if (typeof data !== 'object' && typeof data !== 'undefined') return;
        if (typeof data === 'object' && Object.keys(data).length > 0) return;

        console.log(path, data)
        setLoading(true);

        get(ref(db, path)).then(snapshot => {
            setLoading(false);
            if (snapshot.exists()) onLoad(snapshot.val());
        }).catch(err => {
            setLoading(false);
            setError(err)
        });

    }, [path])


    if (loading) return (
        <SkeletonTheme
            baseColor="#27272a"
            highlightColor="#363636"
            borderRadius="0.3rem"
            duration={1.5}
        >
            <div className="w-full flex-1">
                <Skeleton height={50} />
            </div>
        </SkeletonTheme>
    )
    if (error) return <div>{error}</div>


    return React.cloneElement(children, {
        data,
        error
    })
}

export default WithLoading;