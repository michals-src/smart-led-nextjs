import React from "react";

type TPaletteColorant = {
  index?: number;
  x: number;
  y: number;
  value: string;
  onClick?: React.MouseEventHandler<HTMLInputElement>;
};

const PaletteColorant = ({ index, x, y, value, onClick }: TPaletteColorant) => {
  // const handleClick = (hex: string) => {
  //   state(hex);
  // };

  return (
    <>
      <div
        key={index}
        className='absolute flex flex-row items-center justify-center cursor-pointer'
        style={{
          top: `${50 + y / 2}%`,
          left: `${50 + x / 2}%`,
          transform: "translate(-50%, -50%)",
        }}>
        <input
          type='radio'
          onClick={onClick}
          value={value}
          className='absolute top-0 left-0 w-full h-full z-10 opacity-0 cursor-pointer'
        />
        {/* <div
          className=' w-12 h-12 rounded-full -z-1 absolute'
          style={{
            background: `${value}`,
            filter: "blur(35px)",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
          }}></div> */}
        <div
          className='w-6 h-6 rounded-full cursor-pointer'
          style={{
            background: `${value}`,
            boxShadow: `0 5px 5px rgba(0,0,0,.15)`,
          }}></div>
      </div>
    </>
  );
};

export default PaletteColorant;
