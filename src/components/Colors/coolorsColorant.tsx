import { CheckCircleIcon, CheckIcon } from "@heroicons/react/24/solid";
import React from "react";

type TColorsColorant = {
  index?: number;
  isActive: boolean;
  value: string;
  onClick?: React.MouseEventHandler<HTMLInputElement>;
};

const ActiveSymbol = () => {
  return (
    <div className='absolute top-0 left-0 w-full h-full'>
      <div className='w-full h-full flex flex-col items-center justify-center'>
        <CheckCircleIcon className='w-6 h-6 text-white' />
      </div>
    </div>
  );
};

const ColorsColorant = ({ index, isActive, value, onClick }: TColorsColorant) => {
  // const handleClick = (hex: string) => {
  //   state(hex);
  // };

  return (
    <>
      <div
        key={index}
        className='w-auto h-auto cursor-pointer relative my-2 mx-2'>
        <div
          className={`w-8 h-8 rounded-full text-transparent`}
          style={{ backgroundColor: value }}>
          <span className='absolute -top-[99999]'>{value}</span>
        </div>
        {isActive && <ActiveSymbol />}
        <input
          type='radio'
          onClick={onClick}
          value={value}
          className='absolute top-0 left-0 w-full h-full z-10 opacity-0 cursor-pointer'
        />
      </div>
    </>
  );
};

export default ColorsColorant;
