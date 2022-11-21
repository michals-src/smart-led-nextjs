import { FC, ReactElement, ReactNode, useCallback, useContext, useState } from "react";
import { Box, Slider, Palette } from "@components";
import { SunIcon, XMarkIcon } from "@heroicons/react/24/solid";

import { default as modalCtx } from "../../context/modal/modalContext";
import { colors, LightenColor } from "@utils";

type TWrapperModal = {
  title?: string;
  footer?: string;
  children?: ReactNode;
};

type TInnerModal = TWrapperModal & {
  viewModal: (node?: ReactNode | undefined) => void;
};

const InnerModal = (props: TInnerModal): ReactElement => {
  const { title, children, footer, viewModal } = props;

  const Header: FC = (): ReactElement => {
    return (
      <div
        // className='sticky top-0 left-0 p-8 z-10'
        className='absolute w-full h-auto z-10 py-6 px-8 h-30'>
        <div className='w-full'>
          <div
            className='table p-3 bg-zinc-600 ml-auto rounded-full shadow-lg cursor-pointer'
            onClick={() => viewModal()}>
            <XMarkIcon className='w-4 h-4 text-white' />
          </div>
        </div>
      </div>
    );
  };

  const Footer: FC = (): ReactElement => {
    const style = {
      background: "linear-gradient(to top, #18181b 50%, #00000000 100%)",
    };

    return (
      <div
        // className='sticky top-0 left-0 p-8 z-10'
        className='relative z-10 py-6 px-8 h-30'
        {...style}>
        <div className='flex flex-row flex-nowrap items-center'>
          <div>{title}</div>
          <div className='w-auto ml-auto'>
            <div className='table p-3 bg-[#555555] rounded-full shadow-lg cursor-pointer'>
              <XMarkIcon className='w-4 h-4 text-white' />
            </div>
          </div>
        </div>
      </div>
    );
  };

  return (
    <Box
      bgSolid='#18181b'
      className='w-full h-full'>
      <div className='relative w-full h-full flex flex-col flex-nowrap'>
        <Header />
        <div className='relative z-[9] pt-24 px-3 h-full overflow-auto'>{children}</div>
      </div>
    </Box>
  );
};

const WrapperModal: FC = ({ children, ...rest }: TWrapperModal): ReactElement => {
  const { component, viewModal, visible } = useContext(modalCtx);

  if (visible) {
    return (
      <div className='fixed bottom-0 top-0 left-0 right-0 z-[60]'>
        <div className='flex justify-center w-full h-full'>
          <div className='absolute w-full h-full top-0 left-0 bg-[#000000BF]'></div>
          <div className='relative max-w-md w-full h-auto p-1'>
            <InnerModal
              viewModal={viewModal}
              {...rest}>
              {component}
            </InnerModal>
          </div>
        </div>
      </div>
    );
  }

  return <div></div>;
};

export default WrapperModal;
