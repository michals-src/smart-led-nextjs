import { useEffect, useMemo, useState } from "react";
import db from "@firebase";
import { get, child, ref } from "firebase/database";
import { useAppDispatch, useAppSelector } from "@hooks";
import { create } from "@store/slices/scenerySlice";

const useScenes = () => {
  const items = useAppSelector((state) => state.scenery.items);
  const dispatch = useAppDispatch();
  const [loading, setloading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    /**
     * Fetch data from db if there is not cached in state
     */
    if (Object.keys(items).indexOf(`${channelID}`) === -1) {
      let scenery = [];
      get(child(ref(db), `/scenery/${channelID}`))
        .then((snapshot) => {
          if (typeof snapshot.val() !== "object" || 0 === snapshot.val().length) {
            scenery[0] = {
              value: "#FFFFFF40",
              time: "24:00",
              brightness: null,
            };
            return;
          }
          scenery = snapshot.val();
        })
        .then(() => {
          setloading(false);
          dispatch(create({ channelID, scenery }));
        })
        .catch((err) => setError(err));
      return;
    }
    setloading(false);
  }, [channelID]);

  const arr = { data: items, loading, error };
  return useMemo(() => arr, [arr]);
};

export default useScenery;
