import React, { ReactNode } from "react";
import ChannelProvider from "@context/channel/channelProvider";

type Props = {
  children?: ReactNode;
};

const ChannelLayout = (props: Props) => {
  const { children } = props;
  return (
    <ChannelProvider>
      <div>{children}</div>
    </ChannelProvider>
  );
};

export default ChannelLayout;
