import React, { useEffect, useState } from "react";
import { v4 as uuidv4 } from "uuid";
import { ClockIcon, PaintBrushIcon } from "@heroicons/react/24/solid";
import classNames from "classnames";
import ChannelTabScenery from "./channelTabs/channelTabScenery";
import ChannelTabPalette from "./channelTabs/channelTabPalette";

type Props = {};
type TNavItem = {
  Icon: (props: React.ComponentProps<"svg">) => JSX.Element;
  label: string;
  onClick: React.MouseEventHandler;
  isActive: boolean;
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
    <div onClick={onClick}>
      <div className={wrapperCn}>
        <Icon className={iconCn} />
      </div>
      <div className='mt-4 text-center'>
        <p className='text-xs text-zinc-100 text-wrap'>{label}</p>
      </div>
    </div>
  );
};

const channelNav = (props: Props) => {
  const navigationItems = [
    {
      id: "f7414a15-1dba-4283-8d0b-0ec27ebc9fe3",
      label: "Paleta kolorów",
      icon: PaintBrushIcon,
      link: <ChannelTabPalette />,
    },
    {
      id: "54389173-c1d5-40bd-89f7-75face344391",
      label: "Sceneria",
      icon: ClockIcon,
      link: <ChannelTabScenery />,
    },
  ];

  const [activeTab, setActiveTab] = useState<string | null>(null);
  const [Component, setComponent] = useState<JSX.Element | null>(null);

  useEffect(() => {
    if (Component == null) setComponent(navigationItems[0].link);
    if (activeTab == null) setActiveTab(navigationItems[0].id);
  }, [navigationItems]);

  const handleClick = (id: string, component: JSX.Element) => {
    setActiveTab(id);
    setComponent(component);
  };

  return (
    <div>
      <div className='mt-12 mb-6 p-4 flex flex-row nowrap space-x-8'>
        {navigationItems.map(navigationItem => {
          return (
            <>
              <div
                key={navigationItem.id}
                className='w-auto table items-center cursor-pointer flex flex-col nowrap'>
                <NavItem
                  key={navigationItem.id}
                  Icon={navigationItem.icon}
                  label={navigationItem.label}
                  onClick={e =>
                    handleClick(navigationItem.id, navigationItem.link)
                  }
                  isActive={navigationItem.id == activeTab}
                />
              </div>
            </>
          );
        })}
      </div>
      {Component}
    </div>
  );
};

export default channelNav;
