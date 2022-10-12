import React from "react";

type Props = {};

const channelHeader = (props: Props) => {
  return (
    <div className='mb-6'>
      <h4 className='text-xs text-zinc-300'>Konfiguracja</h4>
      <h6>Zarządzanie ustawieniami kanału</h6>
    </div>
  );
};

export default channelHeader;
