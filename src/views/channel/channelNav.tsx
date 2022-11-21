import React, { useContext, useEffect, useState } from "react";
import { v4 as uuidv4 } from "uuid";
import { ClockIcon, PaintBrushIcon } from "@heroicons/react/24/solid";
import classNames from "classnames";
import ChannelTabScenery from "./channelTabs/channelTabScenery";
import ChannelTabPalette from "./channelTabs/channelTabPalette";
import channelContext from "@context/channel/channelContext";

type Props = {};
type TNavItem = {
  Icon: (props: React.ComponentProps<"svg">) => JSX.Element;
  label: string;
  onClick: React.MouseEventHandler;
  isActive: boolean;
};

const getChannelType = (channelID: any) => {
  return [6, 7].indexOf(channelID) >= 0 ? "mono" : "rgb";
};

const NavItem = (props: TNavItem) => {
  const { Icon, label, onClick, isActive } = props;

  const wrapperCn = classNames("rounded-full w-12 h-12 p-3 mx-auto", {
    "bg-[#FFFFFF15]": !isActive,
    "bg-[#FFFFFF]": isActive,
  });
  const iconCn = classNames("m-0 w-auto text-zinc-900", {
    "text-white": !isActive,
    "text-zinc-900": isActive,
  });

  return (
    <div
      className='mx-auto w-auto table'
      onClick={onClick}>
      <div className={wrapperCn}>
        <Icon className={iconCn} />
      </div>
      <div className='mt-4 text-center'>
        <p className='text-xs text-zinc-100 text-wrap'>{label}</p>
      </div>
    </div>
  );
};

const ChannelNav = (props: Props) => {
  const channelCtx = useContext(channelContext);
  const [navigationItems, _] = useState([
    {
      id: "f7414a15-1dba-4283-8d0b-0ec27ebc9fe3",
      label: "Paleta kolorów",
      icon: PaintBrushIcon,
      link: <ChannelTabPalette />,
      enable: ["rgb"],
    },
    {
      id: "54389173-c1d5-40bd-89f7-75face344391",
      label: "Sceneria",
      icon: ClockIcon,
      link: <ChannelTabScenery />,
      enable: ["rgb", "mono"],
    },
  ]);

  const [activeTab, setActiveTab] = useState<string | null>(null);
  const [Component, setComponent] = useState<JSX.Element | null>(null);

  const handleClick = (id: string, component: JSX.Element) => {
    setActiveTab(id);
    setComponent(component);
  };

  useEffect(() => {
    if (Component == null) setComponent(navigationItems[1].link);
    if (activeTab == null) setActiveTab(navigationItems[1].id);
  }, [navigationItems]);

  return (
    <div>
      <div className='my-6 p-4 bg-[#FFFFFF15] rounded-lg shadow-xl'>
        <div className='flex flex-row flex-nowrap justify-center space-x-8'>
          {navigationItems.map((navigationItem) => {
            return (
              <>
                {navigationItem.enable.indexOf(getChannelType(channelCtx.channelID)) >= 0 && (
                  <div className='w-6/12 items-center cursor-pointer flex flex-col nowrap'>
                    <NavItem
                      key={uuidv4()}
                      Icon={navigationItem.icon}
                      label={navigationItem.label}
                      onClick={(e) => handleClick(navigationItem.id, navigationItem.link)}
                      isActive={navigationItem.id == activeTab}
                    />
                  </div>
                )}
              </>
            );
          })}
        </div>
      </div>
      {Component}
    </div>
  );
};

export default ChannelNav;
