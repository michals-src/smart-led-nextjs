import React, { useContext, useEffect, useRef, useState, FC, HTMLInputTypeAttribute, createContext, useCallback } from 'react';
import classNames from 'classnames';

import { PlusIcon } from '@heroicons/react/24/solid';

import { Carousel, Button, Slider, WithLoading, BottomSheet } from '@components';
import { SceneNew, SceneSettings } from '../scenes/sheets';

type Props = {}

const Item = function Item(props: any) {

    const { id, scene: { name, childrenID } } = props;

    return (
        <div className='select-none mr-1 w-auto table py-1 px-4 bg-zinc-800 rounded-3xl'>
            <div className=' text-xs text-zinc-300'>{name}</div>
        </div>
    )
}

function Items(props: any) {
    const { data } = props;

    const [selectedScene, setSelectedScene] = useState({});
    const [open, setOpen] = useState(false);


    return (
        <>
            <Carousel>
                {
                    Object.keys(data).map((id: any, idx: any) => {
                        return (
                            <Carousel.Item key={idx} onClick={() => {
                                setSelectedScene({ id, ...data[id] })
                                setOpen(true);
                            }}>
                                <Item id={idx} scene={data[id]} />
                            </Carousel.Item>
                        )
                    })
                }

                {/* <Carousel.Item onClick={() => alert('b')}>
                    <div className='select-none mr-1 w-auto table py-1 px-4 rounded-3xl'>
                        <div className=' text-xs text-zinc-400'>wiosna</div>
                    </div>
                </Carousel.Item>
                <Carousel.Item onClick={() => alert('c')}>
                    <div className='select-none mr-1 w-auto table py-1 px-4 rounded-3xl'>
                        <div className='text-xs text-zinc-400'>Lato</div>
                    </div>
                </Carousel.Item>
                <Carousel.Item onClick={() => alert('d')}>
                    <div className='select-none w-auto table py-1 px-4 rounded-3xl'>
                        <div className='text-xs text-zinc-400'>jesień</div>
                    </div>
                </Carousel.Item>
                <Carousel.Item onClick={() => alert('e')}>
                    <div className='select-none w-auto table py-1 px-4 rounded-3xl'>
                        <div className='text-xs text-zinc-400'>zima</div>
                    </div>
                </Carousel.Item> */}
            </Carousel>
            <BottomSheet open={open} onClose={() => setOpen(false)}>
                <BottomSheet.View root='true'>
                    {/* <SceneNew /> */}
                    <SceneSettings
                        {...selectedScene}
                    />
                </BottomSheet.View>
            </BottomSheet>
        </>
    )
}

export default Items