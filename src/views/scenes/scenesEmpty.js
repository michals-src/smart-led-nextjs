import { MegaphoneIcon } from "@heroicons/react/24/outline";
import { PlusIcon } from "@heroicons/react/24/solid";
import { Layout } from "../../components";

const ScenesEmpty = () => {
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
};

export default ScenesEmpty;
