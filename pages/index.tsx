import type { NextPage } from 'next'
import { useEffect, useRef, useState } from 'react'


import { ColorsPalette, Intensity, Layout } from '../src/components'

const Home: NextPage = () => {

  const [canalShadow, setCanalShadow] = useState<string>('#9D020880');
  const ref = useRef(null);

  // const colorsLength = 40 * 3;

  // useEffect(() => {

  //   const rgb2hex = (r: number, g: number, b: number): string => '#' + [r, g, b].map(e => {
  //     const hex = e.toString(16);
  //     return hex.length === 1 ? '0' + hex : hex;
  //   }).join('')

  //   const mapa = [];

  //   for (let j = 0; j < colorsLength; j++) {
  //     let red = 0;
  //     let green = 0;
  //     let blue = 0;

  //     if (j <= colorsLength / 3) {
  //       let itor = j * 3 / colorsLength
  //       red = 255 - (255 * itor);
  //       green = 0 + (255 * itor);
  //       blue = 0;

  //     }
  //     else if (j > colorsLength / 3 && j <= (colorsLength / 3) * 2) {
  //       let diff = (colorsLength / 3)
  //       let itor = (j - diff) * 3 / colorsLength
  //       red = 0;
  //       green = 255 - (255 * itor);
  //       blue = 0 + (255 * itor);
  //     } else {
  //       let diff = (colorsLength / 3) * 2
  //       let itor = (j - diff) * 3 / colorsLength
  //       red = 0 + (255 * itor);;
  //       green = 0;
  //       blue = 255 - (255 * itor);
  //     }


  //     mapa.push(rgb2hex(Math.floor(red), Math.floor(green), Math.floor(blue)));
  //   }
  //   setColor(mapa)

  // }, [])

  const rgb2hex = (hex: string) => hex.replace('/^#?([a-f\d)([a-f\d])([a-f\d])$)/i', (m, r, g, b) => '#' + r + r + g + g + b + b).substring(1).match(/.{2}/g)?.map(x => parseInt(x, 16))

  useEffect(() => {
    ref.current?.style.setProperty('--app-canal-shadow', canalShadow);
  }, [canalShadow]);

  const onCanalShadowChange = (hex: string) => {
    setCanalShadow(hex + '80');
  }

  return (
    <Layout>
      <div className='relative'>
        <div ref={ref} className='absolute top-0 left-0 z-10 w-full h-screen canal-shadow'></div>
        <div className='relative z-30 p-8'>
          <h4 className='text-3xl font-bold'>Smart led</h4>
          <h6 className='text-zinc-300'>Witaj w aplikacji</h6>
          <div className="my-12"><Intensity /></div>
          <ColorsPalette onCanalShadowChange={onCanalShadowChange} />
        </div>
      </div>
    </Layout>
  )
}

export default Home
