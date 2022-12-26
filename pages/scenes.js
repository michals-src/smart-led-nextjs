import { useState, useEffect, useCallback } from "react";
import { useSelector, useDispatch } from "react-redux";
import { child, get, ref } from "firebase/database";

import db from "@firebase";
import { SCENE_APPEND } from "../src/store/slices/scenesSlice";

import { ArrowLongRightIcon, Cog6ToothIcon, MegaphoneIcon, PlayIcon, XCircleIcon } from "@heroicons/react/24/outline";
import { PlusIcon, CheckCircleIcon } from "@heroicons/react/24/solid";
import { Layout, LoaderCircle } from "../src/components";
import { ScenesEmpty, ScenesList } from "../src/views/scenes";
import { PropagateLoader } from "react-spinners";

const override = {
  display: "block",
  margin: "0 auto",
  borderColor: "red",
};

const LoadingView = () => {
  return (
    <div className='w-full h-screen flex flex-col items-center justify-center'>
      <div>
        <div className='table mx-auto'>
          <LoaderCircle size='lg' />
        </div>
        <div className='mt-4'>
          <p className='text-xl'>Ładowanie</p>
        </div>
      </div>
    </div>
  );
};

const Scenes = () => {
  const disptach = useDispatch();
  const scenes = useSelector((state) => state.scenes.items);

  const [loading, setLoading] = useState(true);

  const scenesFetch = useCallback(() => {
    get(child(ref(db), "scenes"))
      .then((snapshot) => {
        if (snapshot.exists()) {
          // setScenes(snapshot.val());
          disptach(SCENE_APPEND(snapshot.val()));
        }
      })
      .then(() => {
        setLoading(false);
      })
      .catch((e) => console.log(e));
  }, []);

  useEffect(() => {
    scenesFetch();
  }, []);

  return (
    <Layout>
      {loading && <LoadingView />}
      {!!(!loading & (Object.keys(scenes).length <= 0)) && <ScenesEmpty />}
      {!!(!loading && Object.keys(scenes).length > 0) && <ScenesList />}
    </Layout>
  );

  return (
    <Layout>
      <div className='w-full'>
        <div
          className='flex flex-col w-full h-full items-center justify-center'
          style={{ height: "calc(100vh)" }}>
          <div className='w-full text-zinc-400'>
            <MegaphoneIcon className='text-inherit mx-auto w-40 h-40' />
            <div className='mt-8 mb-3 text-center'>
              <p className='text-xl text-inherit'>Brak scen</p>
            </div>
            <div>
              <button className='block mx-auto h-auto py-2 px-4 bg-zinc-800 rounded-3xl'>
                <div className='flex flex-row flex-nowrap justify-center text-zinc-500'>
                  <div className='w-1/12'>
                    <div className='ml-auto'>
                      <PlusIcon className='w-6 h-6 text-inherit ml-auto' />
                    </div>
                  </div>
                  <div className='w-11/12 text-center'>
                    <p className='text-sm text-inherit mx-3'>Dodaj nową scneę</p>
                  </div>
                </div>
              </button>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );

  return (
    <Layout>
      <div className='w-full pt-10 px-3'>
        <div className='flex flex row flex-nowrap items-top'>
          <div className='w-8/12'>
            <div className='mb-1 px-3'>
              <p className='text-4xl font-bold'>Sceny</p>
            </div>
          </div>
          <div className='w-4/12 pl-8'>
            <button className='w-full py-1 px-3 rounded-full bg-zinc-800'>
              <div className='flex flex-row flex-nowrap items-center'>
                <div className='w-3/12'>
                  <PlusIcon className='text-zinc-300 ml-auto w-3 h-3' />
                </div>
                <div className='w-9/12'>
                  <p className='ml-3 text-xs text-zinc-400'>Dodaj</p>
                </div>
              </div>
            </button>
          </div>
        </div>
        <div className='px-3 mb-4'>
          <p className='text-xs text-zinc-500'>Lista utworzonych scenariuszy pracy oświetlenia</p>
        </div>

        <div className='p-3 bg-zinc-800 rounded-3xl'>
          <div className='py-5 px-8 rounded-2xl mb-4 cursor-pointer'>
            <div className='flex flex row flex-nowrap items-center'>
              <div className='flex flex-col w-full'>
                <div>
                  <div className='flex flex-row flex-nowrap'>
                    <div className='w-9/12'>
                      <p className='text-lg text-zinc-300'>Zachód słońca</p>
                    </div>
                    <div className='w-3/12'>{/* <CheckCircleIcon className='text-zinc-400 ml-auto w-8 h-8' /> */}</div>
                  </div>
                </div>
                <div className='mt-1'>
                  <div className='flex flex-row flex-nowrap items-left'>
                    <div>
                      <PlayIcon className='w-4 h-4 text-orange-800' />
                    </div>
                    <div className='ml-4'>
                      <p className='text-xs text-orange-800'>8 przejść</p>
                    </div>
                  </div>
                </div>
              </div>
              <div className='pl-4'>
                <ArrowLongRightIcon className='w-6 h-6 text-zinc-600' />
              </div>
            </div>
          </div>
          <div>
            <div className='py-5 px-8 bg-[#FFFFFF10] shadow-xl rounded-2xl mb-4 cursor-pointer'>
              <div className='flex flex-col w-full'>
                <div>
                  <div className='flex flex-row flex-nowrap'>
                    <div className='w-9/12'>
                      <p className='text-lg text-zinc-300'>Niedzla wieczór</p>
                    </div>
                    <div className='w-3/12'>
                      <CheckCircleIcon className='text-orange-600 ml-auto w-8 h-8' />
                    </div>
                  </div>
                </div>
                <div className='mt-1'>
                  <div className='flex flex-row flex-nowrap items-left'>
                    <div>
                      <PlayIcon className='w-4 h-4 text-orange-800' />
                    </div>
                    <div className='ml-4'>
                      <p className='text-xs text-orange-800'>4 przejścia</p>
                    </div>
                  </div>
                </div>
                <div className='mt-6'>
                  <div className='flex flex-row flex-nowrap items-left'>
                    {/* <Cog6ToothIcon className='w-4 h-4 text-zinc-600' /> */}
                    <div className='mr-4'>
                      <p className='text-xs text-zinc-500'>Ustawienia</p>
                    </div>
                    <div>
                      <ArrowLongRightIcon className='w-4 h-4 text-zinc-500' />
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className='py-5 px-8 rounded-2xl mb-4 cursor-pointer'>
              <div className='flex flex row flex-nowrap items-center'>
                <div className='flex flex-col w-full'>
                  <div>
                    <div className='flex flex-row flex-nowrap'>
                      <div className='w-9/12'>
                        <p className='text-lg text-zinc-300'>Mooood</p>
                      </div>
                      <div className='w-3/12'>{/* <CheckCircleIcon className='text-zinc-400 ml-auto w-8 h-8' /> */}</div>
                    </div>
                  </div>
                  <div className='mt-1'>
                    <div className='flex flex-row flex-nowrap items-left'>
                      <div>
                        <PlayIcon className='w-4 h-4 text-orange-800' />
                      </div>
                      <div className='ml-4'>
                        <p className='text-xs text-orange-800'>1 przejście</p>
                      </div>
                    </div>
                  </div>
                </div>
                <div className='pl-4'>
                  <ArrowLongRightIcon className='w-6 h-6 text-zinc-600' />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Scenes;
