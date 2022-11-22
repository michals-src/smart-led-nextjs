import React, { useState, useEffect } from "react";
import db, { auth } from "@firebase";
import { getDatabase, ref, child, get, update, set, onValue } from "firebase/database";
import { signInWithEmailAndPassword } from "firebase/auth";

import { BoltIcon, BoltSlashIcon } from "@heroicons/react/24/solid";
import { Box, Switch } from "@components";

import Image from "next/image";
import Lamp from "../../../images/pietro-piovesan-9UR3Zafm328-unsplash.png";
import { useCallback } from "react";
import { v4 as uuidv4 } from "uuid";
import { colors } from "@utils";
import { resolve } from "node:path/win32";

type Props = {};

const HourGlassSplit = () => {
  return (
    <svg
      xmlns='http://www.w3.org/2000/svg'
      width='16'
      height='16'
      fill='currentColor'
      className='w-6 h-6'
      viewBox='0 0 16 16'>
      <path d='M2.5 15a.5.5 0 1 1 0-1h1v-1a4.5 4.5 0 0 1 2.557-4.06c.29-.139.443-.377.443-.59v-.7c0-.213-.154-.451-.443-.59A4.5 4.5 0 0 1 3.5 3V2h-1a.5.5 0 0 1 0-1h11a.5.5 0 0 1 0 1h-1v1a4.5 4.5 0 0 1-2.557 4.06c-.29.139-.443.377-.443.59v.7c0 .213.154.451.443.59A4.5 4.5 0 0 1 12.5 13v1h1a.5.5 0 0 1 0 1h-11zm2-13v1c0 .537.12 1.045.337 1.5h6.326c.216-.455.337-.963.337-1.5V2h-7zm3 6.35c0 .701-.478 1.236-1.011 1.492A3.5 3.5 0 0 0 4.5 13s.866-1.299 3-1.48V8.35zm1 0v3.17c2.134.181 3 1.48 3 1.48a3.5 3.5 0 0 0-1.989-3.158C8.978 9.586 8.5 9.052 8.5 8.351z' />
    </svg>
  );
};

const HomeGeneral = (props: Props) => {
  const [loading, setLoadig] = useState<boolean>(true);
  const [powerValue, setPowerValue] = useState<boolean>(false);

  const powerHandleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPowerValue((state) => {
      update(ref(db), {
        "/power": !state,
      });
      return !state;
    });
  };

  const defaultChannels = useCallback(async () => {
    return new Promise((resolve) => {
      const channels: any = {};
      for (let i = 0; i < 8; i++) {
        channels[i] = {
          type: i < 6 ? "rgb" : "mono",
          value: i < 6 ? colors[0] : "#ffdf60A0",
          brightness: 100,
          power: false,
        };
      }

      if (Object.keys(channels).length === 8) resolve(channels);
    });
  }, []);

  useEffect(() => {
    signInWithEmailAndPassword(auth, "client@smart-lights.com", "<Frug0/>");

    const database = getDatabase();

    get(ref(database, "/power"))
      .then((snapshot) => {
        if (snapshot.exists()) {
          setPowerValue(snapshot.val());
          setLoadig(false);
        } else {
          console.log("[GET] /power -> No data available");
        }
      })
      .catch((e) => console.log(e));

    onValue(ref(db, "/channels"), (snapshot) => {
      if (!snapshot.exists()) {
        defaultChannels().then((channels) => {
          set(ref(db, `channels`), channels);
        });
      }
    });
    // .then(()
    // .catch((e) => console.log(e));
  }, []);

  return (
    <>
      <Box
        bgGradient={`${powerValue ? "#10F0FF4A" : "#10F0FF30"}`}
        className='mb-4 overflow-visible text-white'>
        <div>
          <div className='flex flex-row flex-nowrap justify-between relative'>
            {loading && (
              <div className='absolute top-0 left-0 w-full h-full'>
                <div className='flex flex-col w-full h-full items-center justify-center'>
                  <HourGlassSplit />
                </div>
              </div>
            )}
            {!loading && (
              <div className='w-8/12'>
                <div className='py-4 pl-6 h-full'>
                  <div className='flex flex-col flex-nowrap h-full w-full justify-between'>
                    <div>
                      <div className='mb-3'>
                        {!powerValue && <BoltSlashIcon className={`w-6 h-6 ${powerValue ? "text-yellow-100" : "text-white"}`} />}

                        {powerValue && <BoltIcon className={`w-6 h-6 text-white`} />}
                      </div>
                      <div className='mb-6'>
                        <p className='text-lg'>Zasilanie</p>
                        <p className='text-xs'>8 kanałów</p>
                      </div>
                    </div>
                    <div>
                      <Switch
                        value={powerValue}
                        onChange={powerHandleChange}
                      />
                    </div>
                  </div>
                </div>
              </div>
            )}
            <div className='w-4/12 relative ml-auto'>
              <Image
                alt='Obraz ozdobnej lampy'
                src={Lamp}
                className='w-full'
              />
            </div>
          </div>
        </div>
      </Box>
    </>
  );
};

export default HomeGeneral;
