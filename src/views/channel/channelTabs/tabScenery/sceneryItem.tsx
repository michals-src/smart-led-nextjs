import React, {
    Children,
    FC,
    forwardRef,
    ReactElement,
    useCallback,
    useContext,
    useEffect,
    useRef,
    useState,
} from "react";
import db from "@firebase";
import { update, ref } from "firebase/database";
import { v4 as uuidv4 } from "uuid";

import {
    ClockIcon,
    Cog6ToothIcon,
    FlagIcon,
    PlayIcon,
    PlusIcon,
    TrashIcon,
} from "@heroicons/react/24/solid";

import modalContext from "@context/modal/modalContext";
import channelContext from "@context/channel/channelContext";
import useGet from "src/hooks/firebase/useGet";

import { colors } from "@utils";
import { Box, Slider } from "@components";

import SceneryModal from "./sceneryModal";
import SceneryEditor from "./sceneryEditor";
import classNames from "classnames";

type TSceneryItem = {
    index: number;
    variety?: 'normal' | 'end';
    time: string;
    brightness?: number;
    value: string;
}

const SceneryItem = (props: TSceneryItem) => {

    const { index, time, brightness = 100, value = "", variety = 'normal' } = props;

    const SceneryCreate = ({
        index,
        previous,
        current,
        brightness,
        color = "",
    }) => {

        const gradient = `linear-gradient(to bottom, rgba(0,0,0,0) 0%, ${"" === color ? "#FFFFFF40" : color} 150%)`;
        const styleShadow = {
            filter: "blur(40px)",
            background: gradient,
        };
        const styleTail = {
            background: gradient,
            transform: "translateX(-50%)",
            filter: "blur(1px)",
        }
        const styleIconWrapper = {
            transform: "translate(-50%, -50%)"
        }

        const handleClick = (): void => {
            viewModal(
                <SceneryModal
                    index={index}
                    onSave={handleCreate}
                    previous={previous}
                    current={current}
                    brightness={brightness}
                    color={"" === color ? colors[0] : color}
                />
            );
        }

        return (
            <div className='w-1/2 mx-auto px-2 relative'>
                <div className='w-full h-12 relative' style={styleShadow}></div>
                <div className='w-1 h-12 absolute top-0 bg-white opacity-[0.4] bottom-0 left-[50%]' style={styleTail}></div>
                <div className='absolute top-[50%] left-[50%] opacity-[0.85]' style={styleIconWrapper}>
                    <div className='w-auto table p-1 bg-white rounded-full cursor-pointer' onClick={handleClick}>
                        <PlusIcon className='w-3 h-3 text-black shadow-xl' />
                    </div>
                </div>
            </div>
        );
    };

    const ItemIcon = () => {
        if ("end" === variety) {
            return (
                <div className='mr-1'>
                    <FlagIcon className='w-5 h-5 text-white' />
                </div>
            )
        }
        return (
            <div className='mr-1'>
                <ClockIcon className='w-5 h-5 text-white' />
            </div>
        );
    }

    const ItemTime = () => {
        return (
            <p
                className={`text-xs text-white ${"end" == type ? "w-full text-center" : "ml-4"
                    }`}>
                {label}
            </p>
        );
    }

    const ItemActions = () => {

        const editCn = classNames('w-1/12', {
            'ml-6': "end" === variety
        });

        const handleRemove = () => {
            handleRemove(index);
        }

        const handleEdit = () => {
            viewModal(
                <SceneryEditor
                    index={index}
                    onSave={handleUpdate}
                    previous={"end" === type ? "00:00" : previous}
                    next={"end" === type ? "24:00" : next}
                    current={label}
                    brightness={brightness}
                    color={"" === color ? colors[0] : color}
                />
            );
        }

        return (
            <>
                {"normal" === variety && (
                    <div className='w-1/12 ml-auto'>
                        <div
                            className='bg-[#00000040] p-1 rounded-full cursor-pointer table'
                            onClick={handleRemove}>
                            <TrashIcon className='w-5 h-5 text-white' />
                        </div>
                    </div>
                )}
                <div className={editCn}>
                    <div
                        className='bg-[#00000040] p-1 rounded-full cursor-pointer table'
                        onClick={handleEdit}>
                        <Cog6ToothIcon className='w-5 h-5 text-white' />
                    </div>
                </div>
            </>
        );
    }

    /**
     * Component
     */
    return (
        <div>

            <SceneryCreate
                index={index}
                previous={previous}
                current={label}
                brightness={brightness}
                color={color}
            />

            <Box
                className={`px-4 pt-3 ${"end" === type ? "pb-3 " : "pb-1 "
                    } relative z-10`}
                bgGradient={"" === value ? "#FFFFFF15" : value}>
                <div className='flex flex-row flex-nowrap items-center justify-center'>
                    <ItemIcon />
                    <ItemTime />
                    <ItemActions />
                </div>

                {"normsl" === variety && (
                    <div className='pb-1 pt-3'>
                        <Slider size='sm' thumb={false} value={brightness} />
                    </div>
                )}
            </Box>

        </div>
    )
}

export default SceneryItem