import type { NextPage } from "next";
import { useEffect, useRef, useState } from "react";
import Image from "next/image";

import { ColorsPalette, Intensity, Layout, Panel } from "../src/components";

import LampImage from "../images/pietro-piovesan-9UR3Zafm328-unsplash.png";

const Home: NextPage = () => {
  const [canalShadow, setCanalShadow] = useState<string>("#9D0208");
  const ShadowRef = useRef(null);
  const PanelRef = useRef(null);

  useEffect(() => {
    ShadowRef.current?.style.setProperty(
      "--app-canal-shadow",
      `${canalShadow}60`
    );
  }, [canalShadow]);

  const onCanalShadowChange = (hex: string) => {
    setCanalShadow(hex);
  };

  return (
    <Layout>
      <div className='relative'>
        <div
          ref={ShadowRef}
          className='absolute top-0 left-0 z-10 w-full h-full canal-shadow'></div>
        <div className='absolute z-20 top-0 right-0 w-6/12 h-80'>
          <Image
            src={LampImage}
            layout='fill'
            sizes='(max-width: 768px) 100vw,
              (max-width: 1200px) 50vw,
              33vw'
          />
        </div>
        <div className='relative z-30 p-8'>
          <div className='mb-6'>
            <h4 className='font-bold'>Smart led</h4>
            <h6 className='text-sm text-zinc-300'>Witaj w aplikacji</h6>
          </div>
          <Panel color={canalShadow} initialRange={30} />
          {/* <div className='my-12'>
            <Intensity />
          </div> */}
          <ColorsPalette onCanalShadowChange={onCanalShadowChange} />
        </div>
      </div>
    </Layout>
  );
};

export default Home;
