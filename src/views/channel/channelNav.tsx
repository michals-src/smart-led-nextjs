import React, { useState } from "react";
import { v4 as uuidv4 } from "uuid";
import { ClockIcon, PaintBrushIcon } from "@heroicons/react/24/solid";

type Props = {};
type TNavItem = {
  Icon: (props: React.ComponentProps<"svg">) => JSX.Element;
  label: string;
  onClick: React.MouseEventHandler;
};

const NavItem = (props: TNavItem) => {
  const { Icon, label, onClick } = props;

  return (
    <div onClick={onClick}>
      <div
        className='rounded-full w-12 h-12 p-3 m-0'
        style={{ background: "rgba(255,255,255,1)" }}>
        <Icon className='m-0 w-auto text-zinc-900' />
      </div>
      <div className='mt-4 text-center'>
        <p className='text-xs text-zinc-100 text-wrap'>{label}</p>
      </div>
    </div>
  );
};

const linkPalette = (): JSX.Element => {
  return <div>Paleta</div>;
};

const linkScenery = () => {
  return <div>Sceneria</div>;
};

const channelNav = (props: Props) => {
  const navigationItems = [
    {
      label: "Paleta kolorów",
      icon: PaintBrushIcon,
      link: linkPalette,
    },
    {
      label: "Sceneria",
      icon: ClockIcon,
      link: linkScenery,
    },
  ];

  const [Component, setComponent] =
    useState<React.ComponentType<React.ComponentProps<"div">>>(linkPalette);

  const handleClick = (
    component: React.ComponentType<React.ComponentProps<"div">>
  ) => {
    setComponent(component);
  };

  return (
    <div className='mt-12 mb-6 p-4 flex flex-row nowrap space-x-12'>
      {navigationItems.map(navigationItem => {
        return (
          <>
            <div className='w-2/12 items-center cursor-pointer flex flex-col nowrap'>
              <NavItem
                key={uuidv4()}
                Icon={navigationItem.icon}
                label={navigationItem.label}
                onClick={() => handleClick(navigationItem.link)}
              />
            </div>
          </>
        );
      })}
      {Component}
    </div>
  );
};

export default channelNav;
