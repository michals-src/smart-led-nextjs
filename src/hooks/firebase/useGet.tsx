import { useEffect, useReducer, useMemo } from "react";
import db from "@firebase";
import { get, child, ref } from "firebase/database";

const initialState = {
  data: [],
  loading: true,
  error: null,
};

const useGetReducer = () =>
  useReducer((state, action) => {
    switch (action.type) {
      case "data":
        return { ...state, loading: false, data: action.data };
      case "error":
        return { ...state, loading: false, error: action.error };
      default:
        return state;
    }
  }, initialState);

const useGet = (path: string) => {
  const [state, dispatch] = useGetReducer();

  useEffect(() => {
    get(child(ref(db), path))
      .then(snapshot => {
        dispatch({ type: "data", data: snapshot.val() });
      })
      .catch(err => dispatch({ type: "error", error: err }));
  }, [dispatch, path]);

  const resArr = {
    data: state.data,
    loading: state.loading,
    error: state.error,
  };
  return useMemo(() => resArr, [resArr]);
};

export default useGet;
