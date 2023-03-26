import React, { useContext, useEffect, useRef, useState, FC, HTMLInputTypeAttribute, createContext, useCallback } from 'react';
import classNames from 'classnames';

import { PlusIcon } from '@heroicons/react/24/solid';
import { Carousel, Button, Slider, WithLoading } from '@components';
import Items from './items';

import { load_scenes } from '@store/slices/globalSlice';
import { useDispatch } from 'react-redux';

export default function HomeScenes(props: any) {
    const dispatch = useDispatch();

    return (
        <>
            <div className='mt-10 mb-3'>
                <div className='flex flex-row flex-nowrap items-end justify-between w-full'>
                    <div>
                        <div className='text-xs text-zinc-400'>Widok</div>
                        <div className='text-xs font-bold'>Scenariusze</div>
                    </div>
                    <div>
                        <Button rounded={true}>
                            <PlusIcon className='text-zinc-300 h-4' />
                        </Button>
                    </div>
                </div>
            </div>
            <WithLoading path="scenes" onLoad={(value: any) => dispatch(load_scenes(value))}>
                <Items />
            </WithLoading>
        </>
    );
}
