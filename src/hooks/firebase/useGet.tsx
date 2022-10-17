import React, { useEffect, useState } from "react";
import db from "@firebase";
import { get, child, ref } from "firebase/database";

const useGet = (path: string) => {
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<any>(null);

  useEffect(() => {
    get(child(ref(db), path))
      .then(snapshot => {
        try {
          setLoading(false);
          if (!snapshot.exists()) throw "Nie istnieje";
          if (!snapshot.val()) throw "Brak";

          setData(snapshot.val());
        } catch (e) {
          setError(e);
        }
      })
      .catch(err => setError(err));
  }, [path]);

  return { data, loading, error };
};

export default useGet;
