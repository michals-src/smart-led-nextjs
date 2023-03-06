import React, { ReactElement, useContext, useEffect, useState } from "react";
import Link from "next/link";
import db from "@firebase";
import { ref, child, get, update } from "firebase/database";
import { v4 as uuidv4 } from "uuid";

import {
  ArrowLongLeftIcon,
  ArrowLongRightIcon,
  ArrowRightIcon,
  BoltIcon,
  ClockIcon,
  Cog6ToothIcon,
  HandRaisedIcon,
  LightBulbIcon,
  SunIcon,
  XMarkIcon,
} from "@heroicons/react/24/solid";

import { default as popupContext } from "../../context/popup/popupContext";
import { Box, Palette, Slider, LoaderCircle, Switch, List, Accordion } from "@components";
import Coolors from "src/components/Colors/coolors";
import { colors } from "@utils";



const HomeChannels = (props: any) => {

  return (
    <>
      <div className="mt-8 mb-1">
        <p className="text-xs font-bold">Zarządzanie kanałami</p>
      </div>
      <List>
        <Accordion>
          <Accordion.Item>
            <Accordion.ItemHeader>
              <div className="mb-1">
                <List.Item>
                  <div className="flex flex-col flex-nowrap flex-1">
                    <p className="text-xs text-zinc-400">Kolory</p>
                    <p className="text-xs ">Odbiorniki rgb</p>
                  </div>
                </List.Item>
              </div>
            </Accordion.ItemHeader>
            <Accordion.ItemCollapse>
              <List>
                <List.Item>
                  <p className="text-sm flex-1">Kanał 1</p>
                  <Switch />
                </List.Item>

                <List.Item>
                  <p className="text-sm flex-1">Kanał 1</p>
                  <Switch />
                </List.Item>
                <List.Item>
                  <p className="text-sm flex-1">Kanał 1</p>
                  <Switch />
                </List.Item>
              </List>
            </Accordion.ItemCollapse>
          </Accordion.Item>
        </Accordion>
      </List>
      <div className="mt-3">
        <List>
          <Accordion>
            <Accordion.Item>
              <Accordion.ItemHeader>
                <div className="mb-1">
                  <List.Item>
                    <div className="flex flex-col flex-nowrap flex-1">
                      <p className="text-xs text-zinc-400">Jednolite</p>
                      <p className="text-xs ">Światło białe</p>
                    </div>
                  </List.Item>
                </div>
              </Accordion.ItemHeader>
              <Accordion.ItemCollapse>
                <List>
                  <List.Item>
                    <p className="text-sm flex-1">Kanał 1</p>
                    <Switch />
                  </List.Item>

                  <List.Item>
                    <p className="text-sm flex-1">Kanał 1</p>
                    <Switch />
                  </List.Item>
                  <List.Item>
                    <p className="text-sm flex-1">Kanał 1</p>
                    <Switch />
                  </List.Item>
                </List>
              </Accordion.ItemCollapse>
            </Accordion.Item>
          </Accordion>
        </List>
      </div>
    </>
  );
};

export default HomeChannels;
