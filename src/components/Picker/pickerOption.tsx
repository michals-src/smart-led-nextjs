import React, { forwardRef, Ref } from "react";

const PickerOption = forwardRef(function PickerOption(props: any, ref: Ref<HTMLDivElement>) {
  const { children, ...other } = props;

  return (
    <div
      className='text-sm text-zinc-600 height-[32px] leading-[32px] select-none'
      ref={ref}
      {...other}
      onClick={(e) => props.onClick(e)}>
      <div className='flex flex-row flex-nowrap justify-center'>{children}</div>
    </div>
  );
});

export default PickerOption;
