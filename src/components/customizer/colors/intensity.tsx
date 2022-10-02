import React, { useState } from 'react'

export default function Intensity() {

    const [volume, setVolume] = useState<number>(0)

    const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setVolume(e.target.value)
    }

    return (
        <>
            <div><p className='text-lg font-bold mb-8'>{volume} %</p></div>
            <input onChange={onChange} value={volume} className='customizer-intensity_bar' type="range" min="0" max="100" />
            {/* <div className='flex flex-col items-center h-full'>
                <div><p className='text-lg font-bold mb-8'>{volume} %</p></div>
                <div className='relative h-80 flex flex-col flex-nowrap items-center pt-80'>
                    <div className='absolute top-0 h-full w-1 bg-zinc-500 rounded-lg'></div>
                    <div className="absolute top-0 h-auto flex flex-col items-center pt-80">
                        <div className='w-1 h-full bg-zinc-300 rounded-lg absolute bottom-0' style={{ height: `${volume}%` }}></div>
                        <div className='w-4 h-4 bg-zinc-100 rounded-lg absolute shadow shadow-zinc-800 cursor-pointer' style={{ bottom: `${volume}%` }}></div>
                    </div>
                </div>
            </div> */}
        </>
    )
}
